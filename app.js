import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import RouterProduct from "./routes/product";
import HomePage from "./routes/HomePage";
import morgan from "morgan";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;
// app.use(morgan("combined"));

// Route
app.use("/api", RouterProduct);
app.get("/", HomePage);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    createIndex: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// App listen
app.listen(port, () => {
  console.log("Server run at: http://localhost:" + port);
});
