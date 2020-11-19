import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async (): Promise<any> => {
  try {
    const DB_URL: any = process.env.DATABASE_URL;
    //const DB_URL: any = process.env.ATLAS_URI;
    await mongoose.connect(DB_URL, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("Successfully conected to the database!!! wohooo!!");
  } catch {
    (error: string) => {
      console.log("Error while trying to connect to the database", error);
      process.exit();
    };
  }
};

const connectToPort = (app: any) => {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server is running! on port: ${port}`);
  });
};

export default {
  connectToDatabase,
  connectToPort,
};
