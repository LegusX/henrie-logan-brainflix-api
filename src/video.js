class Video {
	constructor(title, description, image, id, channel) {
		this.title = title;
		this.description = description;
		this.id = id;
		this.image = `http://localhost:${process.env.PORT}/images/${image}`;
		this.channel = channel;
		this.views = 0;
		this.likes = 0;
		this.duration = "00:00";
		this.video = "https://project-2-api.herokuapp.com/stream";
		this.timestamp = Date.now();
		this.comments = [];
	}
}

export default Video;
