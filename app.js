import express from "express";
import dotenv from "dotenv";
import RouterProduct from "./routes/product";
import RouterCategory from "./routes/category";
import HomePage from "./routes/HomePage";
import mongoose from "mongoose";
import auth from "./routes/auth";
import expressValidator from "express-validator";
dotenv.config();

const app = express();
app.use(expressValidator());
app.use(express.json());
app.use(express.urlencoded());
const port = process.env.PORT || 8080;
// app.use(morgan("combined"));

// Route
app.use("/api", RouterProduct);
app.use("/api", RouterCategory);
app.get("/", HomePage);
app.use("/api", auth);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    createIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// App listen
app.listen(port, () => {
  console.log("Server run at: http://localhost:" + port);
});
