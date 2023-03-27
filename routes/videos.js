import express from "express";
import fileUpload from "express-fileupload";
import { readFile, writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";

import Video from "../src/video.js";

const router = express.Router();

router.use(fileUpload());

router.get("/", async (req, res) => {
	let videos = await readVideos();

	//sort videos by recency, so newest videos appear at the top
	videos.sort((a, b) => {
		return b.timestamp - a.timestamp;
	});

	//only return necessary information
	videos = videos.map((video) => {
		return {
			id: video.id,
			title: video.title,
			channel: video.channel,
			image: video.image,
		};
	});

	res.json(videos);
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const video = await getVideo(id);

	if (video === null) {
		res.status(404).end();
	} else res.send(JSON.stringify(video));
});

router.post("/", async (req, res) => {
	if (req.files.length === 0) return res.status(400).end();
	const id = await createVideo(req.files.image, req.body);

	res.send(id);
});

export default router;

async function readVideos() {
	const file = await readFile("./data/videos.json");
	const videos = JSON.parse(file);
	return videos;
}

async function writeVideos(videos) {
	await writeFile("./data/videos.json", JSON.stringify(videos));
}

async function getVideo(id) {
	const videos = await readVideos();
	for (let i = 0; i < videos.length; i++) {
		if (videos[i].id === id) return videos[i];
	}
	return null;
}

async function createVideo(file, body) {
	const videos = await readVideos();

	const id = uuid();
	const fileEnding = file.name.split(".").pop();
	const fileName = id + "." + fileEnding;

	await writeFile("./public/images/" + fileName, file.data);

	const video = new Video(
		body.title,
		body.description,
		fileName,
		id,
		body.channel
	);

	videos.push(video);
	await writeVideos(videos);
}
