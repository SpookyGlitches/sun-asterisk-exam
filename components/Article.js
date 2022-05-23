import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import Button from "./Button";
import axios from "axios";

export default function Article({ id, withButtons }) {
	const { data: article, error } = useSWR(`/api/articles/${id}`);
	const { mutate } = useSWRConfig();
	const router = useRouter();
	const deleteArticle = (event) => {
		event.stopPropagation();
		mutate("/api/articles", async (articles) => {
			console.log(articles);
			await axios.delete(`/api/articles/${id}`);
			const newArticles = articles.filter((item) => item.id !== id);
			return newArticles;
		});
	};

	const navigateToArticle = (event) => {
		event.stopPropagation();
		router.push(`/articles/${id}`);
	};

	const editArticle = (event) => {
		event.stopPropagation();
		router.push(`/articles/${id}/edit`);
	};

	if (!article) return <div>Loading</div>;
	if (error) return <div>Something went wrong.</div>;

	return (
		<div
			className="border w-96 p-5 cursor-pointer"
			onClick={(e) => navigateToArticle(e)}
		>
			<h1 className="font-bold text-2xl">{article.title}</h1>
			<h6>
				Published at{" "}
				{new Date(article.createdAt).toLocaleDateString(undefined, {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			</h6>
			<p className="">{article.content}</p>
			<div className="flex justify-end space-x-2 my-2">
				{withButtons && (
					<>
						<Button
							label="Edit"
							onClick={(e) => editArticle(e)}
							className="bg-yellow-500 text-white p-2 rounded"
						/>
						<Button
							label="Delete"
							onClick={(e) => deleteArticle(e)}
							className="bg-blue-500 text-white p-2 rounded"
						/>
					</>
				)}
			</div>
		</div>
	);
}
