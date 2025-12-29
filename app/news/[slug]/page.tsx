import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { MOCK_DATA } from "@/lib/mock-data";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

async function getArticle(slug: string) {
    try {
        const query = `*[_type == "article" && slug.current == "${slug}"][0]`;
        return await client.fetch(query);
    } catch (err) {
        console.warn("Sanity fetch failed:", err);
        return null;
    }
}

export default async function NewsArticlePage({ params }: PageProps) {
    const { slug } = await params;
    let article = await getArticle(slug);

    if (!article) {
        // Logic to find mock article by slug
        // We search in all mock arrays just in case, or specific ones.
        const mockNews = [
            MOCK_DATA.featuredNews,
            ...MOCK_DATA.gridNews,
            ...MOCK_DATA.aiNews,
            // Add some dummy slugs for top stories
            ...MOCK_DATA.topStories.map((s, i) => ({ ...s, slug: `top-story-${i}` }))
        ].find((item: any) => item.slug === slug || (item.title && item.title.toLowerCase().replace(/ /g, '-') === slug));

        if (mockNews) {
            article = {
                title: mockNews.title,
                category: mockNews.category || "News",
                author: mockNews.author || "Staff Writer",
                publishedAt: new Date().toISOString(),
                readTime: mockNews.readTime || "5 min read",
                mainImage: null, // Mock data often doesn't have compatible image objects
                body: [
                    {
                        _type: 'block',
                        children: [
                            {
                                _type: 'span',
                                text: mockNews.excerpt || "Full article content coming soon."
                            }
                        ]
                    },
                    {
                        _type: 'block',
                        children: [
                            {
                                _type: 'span',
                                text: "This is a fallback view because the CMS is not yet configured. Once you setup Sanity, your real content will appear here."
                            }
                        ]
                    }
                ]
            }
        }
    }

    if (!article) {
        return notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Back Button */}
            <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to News
            </Link>

            {/* Article Header */}
            <article className="space-y-8">
                <header className="space-y-4 border-b pb-8">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest">
                        <span className="text-brand-red">{article.category || "News"}</span>
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-500">{article.readTime || "5 min read"}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black leading-tight font-[family-name:var(--font-playfair)]">
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>By {article.author || "Staff Writer"}</span>
                        <span>·</span>
                        <time>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Just now"}</time>
                    </div>
                </header>

                {/* Featured Image */}
                {article.mainImage && (
                    <div className="aspect-video w-full rounded-lg bg-muted overflow-hidden relative">
                        <img
                            src={urlForImage(article.mainImage).url()}
                            alt={article.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}

                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none font-[family-name:var(--font-playfair)] [&>p]:font-[family-name:var(--font-inter)]">
                    {article.body ? (
                        <PortableText value={article.body} />
                    ) : (
                        <p className="text-muted-foreground italic">No content available.</p>
                    )}
                </div>

                {/* Article Footer */}
                <footer className="border-t pt-8">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-sm font-medium hover:text-brand-red"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            More News Articles
                        </Link>
                    </div>
                </footer>
            </article>
        </div>
    );
}
