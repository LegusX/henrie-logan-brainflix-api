import cors from "cors";
import express from "express";
const app = express();

import * as dotenv from "dotenv";
dotenv.config();

import videoRouter from "./routes/videos.js";

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.send("hello world");
});

app.use("/videos", videoRouter);

app.listen(process.env.PORT);

console.log("Server started on port " + process.env.PORT);
