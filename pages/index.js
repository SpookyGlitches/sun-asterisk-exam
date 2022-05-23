import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Button from "../components/Button";
import styles from "../styles/Home.module.css";
import Article from "../components/Article";
export default function Home() {
	const { data: articles, error } = useSWR("/api/articles");
	if (!articles) return <div>Loading</div>;
	if (error) return <div>Something went wrong.</div>;
	return (
		<div className="p-5 h-full flex flex-col  items-center justify-center ">
			<div></div>
			<div>
				<div className="flex justify-between  mb-4">
					<h1 className="font-bold text-2xl ">Articles</h1>
					<Link href="/articles/create">
						<Button
							label="Create New Article"
							className="bg-blue-500 text-white p-2 rounded"
						/>
					</Link>
				</div>
				<div className="space-y-4">
					{articles.map((article) => (
						<Article key={article.id} id={article.id} withButtons={true} />
					))}
				</div>
			</div>
		</div>
	);
}
