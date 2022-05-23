import Button from "../../components/Button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
export default function CreateArticlePage() {
	const { unregister, handleSubmit, register } = useForm();
	const router = useRouter();

	const createPost = async ({ title, content }) => {
		try {
			await axios.post("/api/articles", { title, content });
			unregister();
			router.push("/");
		} catch (error) {
			console.error(error);
			alert("Something went wrong");
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<form
				className="flex flex-col space-y-3 w-96"
				onSubmit={handleSubmit(createPost)}
			>
				<h1>Create a new article</h1>
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
