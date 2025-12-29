import { ArticleCard } from "@/components/article-card";
import { ArticleGrid } from "@/components/article-grid";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { MOCK_DATA } from "@/lib/mock-data";

async function getKenyaTechArticles() {
    try {
        const query = `*[_type == "article" && section == "tech-kenya"] | order(publishedAt desc) {
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
        console.warn("Sanity fetch failed:", err);
        return null;
    }
}

export default async function TechKenyaPage() {
    const articles = await getKenyaTechArticles();

    let featuredArticle;
    let topStories;
    let gridNews;

    if (articles && articles.length > 0) {
        const featuredArticleRaw = articles[0];
        featuredArticle = {
            id: featuredArticleRaw._id,
            category: featuredArticleRaw.category || "Tech Kenya",
            title: featuredArticleRaw.title,
            excerpt: featuredArticleRaw.excerpt,
            author: featuredArticleRaw.author || "Local Correspondent",
            readTime: featuredArticleRaw.readTime || "7 min read",
            href: `/tech-kenya/${featuredArticleRaw.slug}`,
            imageUrl: featuredArticleRaw.mainImage ? urlForImage(featuredArticleRaw.mainImage).url() : undefined
        };

        topStories = articles.slice(1, 3).map((article: any) => ({
            id: article._id,
            category: article.category || "Tech Kenya",
            title: article.title,
            excerpt: article.excerpt,
            author: article.author || "Local Correspondent",
            readTime: article.readTime || "5 min read",
            href: `/tech-kenya/${article.slug}`,
            imageUrl: article.mainImage ? urlForImage(article.mainImage).url() : undefined
        }));

        gridNews = articles.slice(3).map((article: any) => ({
            id: article._id,
            category: article.category || "Tech Kenya",
            title: article.title,
            excerpt: article.excerpt,
            author: article.author || "Local Correspondent",
            readTime: article.readTime || "5 min read",
            href: `/tech-kenya/${article.slug}`,
            imageUrl: article.mainImage ? urlForImage(article.mainImage).url() : undefined
        }));
    } else {
        featuredArticle = {
            ...MOCK_DATA.techKenya[0],
            id: 661,
            href: `/tech-kenya/${MOCK_DATA.techKenya[0].slug}`
        };

        topStories = [MOCK_DATA.techKenya[1]].map(s => ({ ...s, href: `/tech-kenya/${s.slug}` }));

        gridNews = MOCK_DATA.techKenya.map((s, i) => ({
            ...s,
            id: `kenya-grid-${i}`,
            href: `/tech-kenya/${s.slug}`
        }));
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionHeading title="Tech Kenya" subtitle="Innovation and startups from the Silicon Savannah" />

            <HeroSection featuredArticle={featuredArticle} topStories={topStories} />

            <ArticleGrid>
                {gridNews.map((item: any) => (
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
