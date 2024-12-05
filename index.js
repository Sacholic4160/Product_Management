import dotenv from "dotenv";
import connectDB from "./src/db.js";
import { app } from "./src/app.js";

dotenv.config({
  path: "./.env",
});

//const app = express();

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log(
        "MONGODB Connection Successfull ,but Express is not listening",
        err
      );
      throw err;
    });
    app.listen(process.env.PORT ,() => {
      console.log(
        `Hii, my server is listening on this port number: ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(`MONGODB connection failed ${error}`);
  });
