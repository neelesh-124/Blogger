import "dotenv/config";
import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";

import { checkForAuthenticationCookie } from "./middlewares/authentication.js";

import Blog from "./models/blog.model.js";

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB connected!!"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  console.log("Req.user", req.user);
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
