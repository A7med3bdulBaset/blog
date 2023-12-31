import { Suspense } from "react"
import { Metadata } from "next"

import { getImage } from "@/lib/getImage"
import { getPost } from "@/lib/getPost"
import AboutMe from "@/components/AboutMe"
import { MDX } from "@/components/MDX"
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
	params: {
		slug: string
	}
}

export function generateMetadata({ params: { slug } }: Props): Metadata {
	const { title, description, url } = getPost(slug)

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
		},
		twitter: {
			card: "summary_large_image",
			creator: "@A7med3bdulBaset",
			title,
			description,
		},
	}
}

const formatter = new Intl.DateTimeFormat(undefined, {
	year: "numeric",
	month: "long",
	day: "numeric",
})

function page({ params: { slug } }: Props) {
	const post = getPost(slug)

	return (
		<main className="container mb-4">
			<header className="sticky top-0 -z-10 max-w-4xl space-y-4 py-12">
				<h1 className="text-5xl font-bold">{post.title}</h1>
				<p className="text-opacity-70">{post.description}</p>
				<p className="text-sm">{formatter.format(new Date(post.date))}</p>
				{/* eslint-disable @next/next/no-img-element */}
				<img
					width={800}
					height={200}
					src={getImage(post)}
					alt={post.title}
					className="rounded-lg"
				/>
				<Suspense
					fallback={<Skeleton className="aspect-video max-w-[800px]" />}
				>
					<img
						width={800}
						height={200}
						src={getImage(post)}
						alt={post.title}
						className="rounded-lg"
					/>
				</Suspense>
			</header>
			<div className="grid items-start gap-8 bg-white py-12 dark:bg-slate-950 md:grid-cols-7">
				<article className="prose col-span-5 dark:prose-invert">
					<MDX code={post.body.code} />
				</article>
				<AboutMe className="sticky top-8 col-span-2" />
			</div>
		</main>
	)
}

export default page
