import Button from "../../../components/Button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
export default function EditArticlePage() {
	const { unregister, handleSubmit, register, setValue } = useForm();
	const router = useRouter();
	const id = router.query.id;

	const editPost = async ({ title, content }) => {
		try {
			await axios.put(`/api/articles/${router.query.id}`, { title, content });
			router.push("/");
		} catch (error) {
			console.error(error);
			alert("Something went wrong");
		}
	};
	const { data: article, error } = useSWR(`/api/articles/${id}`);

	useEffect(() => {
		if (!article) return;
		setValue("title", article.title);
		setValue("content", article.content);
	}, [article]);

	return (
		<div className="flex items-center justify-center h-screen">
			<form
				className="flex flex-col space-y-3 w-96"
				onSubmit={handleSubmit(editPost)}
			>
				<h1>Update an article</h1>
				<input
					type="text"
					className="border p-2"
					placeholder="title"
					{...register("title")}
				/>
				<textarea
					id="w3review"
					className="border p-2"
					placeholder="content"
					rows="4"
					{...register("content")}
				/>
				<Button label="Post" type="button" />
			</form>
		</div>
	);
}
