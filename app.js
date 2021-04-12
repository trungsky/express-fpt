import express from "express";
import dotenv from "dotenv";
import RouterProduct from "./routes/product";
import RouterCategory from "./routes/category";
import HomePage from "./routes/HomePage";
import mongoose from "mongoose";
import auth from "./routes/auth";
import expressValidator from "express-validator";
import cors from "cors";
import RouterUser from "./routes/user";
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(expressValidator());
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ credentials: "same-origin" }));
const port = process.env.PORT || 8080;
// app.use(morgan("combined"));

// Routes
app.use("/api", RouterProduct);
app.use("/api", RouterCategory);
app.get("/", HomePage);
app.use("/api", auth);
app.use("/api", RouterUser);

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
  console.log("Server running at: http://localhost:" + port);
});
