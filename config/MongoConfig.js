import { MongoClient } from 'mongodb'

export const dbClient = new MongoClient(process.env.MONGO_CLIENT);

export async function MongoConnect() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await dbClient.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

