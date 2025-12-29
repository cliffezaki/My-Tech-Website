import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
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

export default async function ReviewArticlePage({ params }: PageProps) {
    const { slug } = await params;
    let article = await getArticle(slug);

    if (!article) {
        // Fallback to mock data
        const mockReview = [
            ...MOCK_DATA.smartphoneReviews,
            ...MOCK_DATA.reviews
        ].find((item: any) => item.slug === slug || (item.title && item.title.toLowerCase().replace(/ /g, '-') === slug));

        if (mockReview) {
            article = {
                title: mockReview.title,
                category: mockReview.category || "Review",
                author: mockReview.author || "Reviewer",
                publishedAt: new Date().toISOString(),
                readTime: mockReview.readTime || "10 min read",
                mainImage: null,
                body: [
                    {
                        _type: 'block',
                        children: [
                            {
                                _type: 'span',
                                text: mockReview.excerpt || "Full review content coming soon."
                            }
                        ]
                    },
                    {
                        _type: 'block',
                        children: [
                            {
                                _type: 'span',
                                text: "This is a fallback view. Configure Sanity to see real content."
                            }
                        ]
                    }
                ]
            };
        }
    }

    if (!article) {
        return notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Back Button */}
            <Link
                href="/reviews"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Reviews
            </Link>

            {/* Article Header */}
            <article className="space-y-8">
                <header className="space-y-4 border-b pb-8">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest">
                        <span className="text-brand-red">{article.category || "Review"}</span>
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-500">{article.readTime || "10 min read"}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black leading-tight font-[family-name:var(--font-playfair)]">
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>By {article.author || "Reviewer"}</span>
                        <span>·</span>
                        <time>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Just now"}</time>
                    </div>

                    {/* Rating Placeholder */}
                    <div className="flex items-center gap-2">
                        <div className="flex">
                            {[1, 2, 3, 4].map((star) => (
                                <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="h-5 w-5 text-gray-300" />
                        </div>
                        <span className="text-sm font-semibold">4.0 / 5.0</span>
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
                            href="/reviews"
                            className="inline-flex items-center gap-2 text-sm font-medium hover:text-brand-red"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            More Smartphone Reviews
                        </Link>
                    </div>
                </footer>
            </article>
        </div>
    );
}
