import fs, { createReadStream, createWriteStream } from "node:fs";
import ck from "chalk";
import { env } from '#env';
import { BSON, MongoClient, ServerApiVersion } from "mongodb";
import path from "node:path";
import { readdir, stat } from "node:fs/promises";

const client = new MongoClient(env.MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function mongoToDiscloud() {
    await client.connect();

    try {
        await client.connect();
        console.log("✅ Conectado ao MongoDB Atlas");

        const db = client.db(env.DBNAME);
        const collections = await db.listCollections().toArray();

        for (const { name } of collections) {
            const filePath = `./${env.DBNAME}/${name}.bson`;
            const writeStream = createWriteStream(filePath);

            const cursor = db.collection(name).find().stream();

            for await (const doc of cursor) {
                const bsonData = BSON.serialize(doc);
                writeStream.write(bsonData);
            }

            writeStream.end();
            console.log(`✅ Collection ${name} saved at ${filePath}`);
        }
    } finally {
        await client.close();
    }
}

export async function discloudToMongo() {
    await client.connect();

    try {
        await client.connect();
        const db = client.db(env.DBNAME);

        const entries = await readdir("./");

        for (const entry of entries) {
            const fullPath = path.join("./", entry);

            // Filter .bson file
            const info = await stat(fullPath);
            if (!info.isFile() || !entry.endsWith(".bson")) continue;

            const collectionName = path.basename(entry, ".bson");
            //console.log(`📥 Importando ${entry} → coleção: ${collectionName}`);

            const collection = db.collection(collectionName);
            const readStream = createReadStream(fullPath);

            let buffer = Buffer.alloc(0);

            for await (const chunk of readStream) {
                buffer = Buffer.concat([buffer, chunk]);

                while (buffer.length > 4) {
                    const docLength = buffer.readInt32LE(0);
                    if (buffer.length < docLength) break;

                    const docBuffer = buffer.subarray(0, docLength);
                    buffer = buffer.subarray(docLength);

                    const doc = BSON.deserialize(docBuffer);
                    await collection.insertOne(doc);
                }
            }

            console.log(`✅ Importado ${entry} para coleção ${collectionName}`);
        }

        console.log("🎉 Import completo!");
    } finally {
        await client.close();
    }
}