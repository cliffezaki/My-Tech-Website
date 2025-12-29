import { ArticleCard } from "@/components/article-card";
import { ArticleGrid } from "@/components/article-grid";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { MOCK_DATA } from "@/lib/mock-data";

async function getReviewArticles() {
    try {
        const query = `*[_type == "article" && section == "reviews"] | order(publishedAt desc) {
        _id,
        title,
        excerpt,
        category,
        publishedAt,
        mainImage,
        readTime,
        author,
        "slug": slug.current
      }`;
        const data = await client.fetch(query);
        return data.length > 0 ? data : null;
    } catch (err) {
        console.warn("Sanity reviews fetch failed:", err);
        return null;
    }
}

export default async function ReviewsPage() {
    const articles = await getReviewArticles();

    let featuredReview;
    let topStories;
    let gridReviews;

    if (articles && articles.length > 0) {
        // CMS PATH
        const featuredRaw = articles[0];
        featuredReview = {
            id: featuredRaw._id,
            category: featuredRaw.category || "Review",
            title: featuredRaw.title,
            excerpt: featuredRaw.excerpt,
            author: featuredRaw.author || "Staff",
            readTime: featuredRaw.readTime || "5 min read",
            href: `/reviews/${featuredRaw.slug}`,
            imageUrl: featuredRaw.mainImage ? urlForImage(featuredRaw.mainImage).url() : undefined
        };

        topStories = articles.slice(1, 3).map((article: any) => ({
            id: article._id,
            category: article.category || "Review",
            title: article.title,
            excerpt: article.excerpt,
            author: article.author || "Staff",
            readTime: article.readTime || "5 min read",
            href: `/reviews/${article.slug}`,
            imageUrl: article.mainImage ? urlForImage(article.mainImage).url() : undefined
        }));

        gridReviews = articles.slice(3).map((article: any) => ({
            id: article._id,
            category: article.category || "Review",
            title: article.title,
            excerpt: article.excerpt,
            author: article.author || "Staff",
            readTime: article.readTime || "5 min read",
            href: `/reviews/${article.slug}`,
            imageUrl: article.mainImage ? urlForImage(article.mainImage).url() : undefined
        }));

    } else {
        // FALLBACK PATH
        featuredReview = {
            ...MOCK_DATA.reviews[0],
            id: 991,
            href: `/reviews/${MOCK_DATA.reviews[0].slug}`
        };

        topStories = MOCK_DATA.reviews.slice(1, 3).map(r => ({
            ...r,
            href: `/reviews/${r.slug}`
        }));

        // Reuse some reviews for grid to fill space
        gridReviews = [
            ...MOCK_DATA.reviews,
            ...MOCK_DATA.reviews
        ].map((r, i) => ({
            ...r,
            id: `grid-${i}`,
            href: `/reviews/${r.slug}`
        }));
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionHeading title="Smartphone Reviews" subtitle="In-depth analysis of the latest hardware" />

            <HeroSection featuredArticle={featuredReview} topStories={topStories} />

            <ArticleGrid>
                {gridReviews.map((item: any) => (
                    <ArticleCard
                        key={item.id}
                        title={item.title}
                        excerpt={item.excerpt}
                        category={item.category}
                        author={item.author}
                        readTime={item.readTime}
                        href={item.href}
                        imageUrl={item.imageUrl}
                    />
                ))}
            </ArticleGrid>
        </div>
    );
}
