import db from "../../../lib/db";
async function createPost(req, res) {
	const { title, content } = req.body;
	try {
		const article = await db.article.create({
			data: {
				title,
				content,
			},
		});
		res.status(200).send(article);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
}

async function getPosts(req, res) {
	try {
		const articles = await db.article.findMany({});
		res.status(200).send(articles);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
}

export default function handler(req, res) {
	if (req.method === "POST") {
		return createPost(req, res);
	} else if (req.method === "GET") {
		return getPosts(req, res);
	} else {
		return res.status(405).send();
	}
}
