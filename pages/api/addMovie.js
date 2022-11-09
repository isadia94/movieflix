import { connectToDatabase } from "../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  try {
    const { title, type, image } = JSON.parse(req.body);
    console.log(title);
    const response = await db.collection("movies").insertOne({
      title: title,
      type: type,
      image: image,
      createdAt: new Date(),
    });
    // Send a response
    res.status(200).json({
      data: await db.collection("movies").findOne({ _id: response.insertedId }),
      message: "Movie added successfully",
    });
  } catch (error) {
    console.log("error", error);
  }
};
