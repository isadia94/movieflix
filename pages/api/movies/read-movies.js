import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const movies = await db.collection("movies").find({}).limit(20).toArray();

  res.json(movies);
};
