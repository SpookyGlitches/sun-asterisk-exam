import { useRouter } from "next/router";
import useSWR from "swr";
import Article from "../../../components/Article";
export default function ArticlePage() {
	const router = useRouter();
	const id = router.query.id;

	return (
		<div className="flex h-full w-full ">
			<Article id={id} withButtons={false} />
		</div>
	);
}
