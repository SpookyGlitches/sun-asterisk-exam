import db from "../../../lib/db";

async function getPost(req, res) {
	try {
		const article = await db.article.findUnique({
			where: {
				id: Number(req.query.id) || -1,
			},
			rejectOnNotFound: true,
		});
		res.status(200).send(article);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
}

async function deletePost(req, res) {
	try {
		await db.article.delete({
			where: {
				id: Number(req.query.id) || -1,
			},
		});
		res.status(200).send();
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
}

async function editPost(req, res) {
	const { title, content } = req.body;
	try {
		await db.article.update({
			where: {
				id: Number(req.query.id) || -1,
			},
			data: {
				title,
				content,
			},
		});
		res.status(200).send();
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
}

export default function handler(req, res) {
	if (req.method === "GET") {
		return getPost(req, res);
	} else if (req.method === "DELETE") {
		return deletePost(req, res);
	} else if (req.method === "PUT") {
		return editPost(req, res);
	} else {
		return res.status(405).send();
	}
}
