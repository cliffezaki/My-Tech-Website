import { ArticleCard } from "@/components/article-card";
import { ArticleGrid } from "@/components/article-grid";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { MOCK_DATA } from "@/lib/mock-data";

async function getExplainerArticles() {
    try {
        const query = `*[_type == "article" && section == "how-stuff-works"] | order(publishedAt desc) {
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

export default async function HowStuffWorksPage() {
    const articles = await getExplainerArticles();

    let featuredExplainer;
    let topStories;
    let gridExplainers;

    if (articles && articles.length > 0) {
        const featuredArticleRaw = articles[0];
        featuredExplainer = {
            id: featuredArticleRaw._id,
            category: featuredArticleRaw.category || "Explainer",
            title: featuredArticleRaw.title,
            excerpt: featuredArticleRaw.excerpt,
            author: featuredArticleRaw.author || "TechAI Staff",
            readTime: featuredArticleRaw.readTime || "12 min read",
            href: `/how-stuff-works/${featuredArticleRaw.slug}`,
            imageUrl: featuredArticleRaw.mainImage ? urlForImage(featuredArticleRaw.mainImage).url() : undefined
        };

        topStories = articles.slice(1, 3).map((article: any) => ({
            id: article._id,
            category: article.category || "Explainer",
            title: article.title,
            excerpt: article.excerpt,
            author: article.author || "TechAI Staff",
            readTime: article.readTime || "8 min read",
            href: `/how-stuff-works/${article.slug}`,
            imageUrl: article.mainImage ? urlForImage(article.mainImage).url() : undefined
        }));

        gridExplainers = articles.slice(3).map((article: any) => ({
            id: article._id,
            category: article.category || "Explainer",
            title: article.title,
            excerpt: article.excerpt,
            author: article.author || "TechAI Staff",
            readTime: article.readTime || "8 min read",
            href: `/how-stuff-works/${article.slug}`,
            imageUrl: article.mainImage ? urlForImage(article.mainImage).url() : undefined
        }));
    } else {
        featuredExplainer = {
            ...MOCK_DATA.howStuffWorks[0],
            id: 771,
            href: `/how-stuff-works/${MOCK_DATA.howStuffWorks[0].slug}`
        };

        topStories = [MOCK_DATA.howStuffWorks[1]].map(s => ({ ...s, href: `/how-stuff-works/${s.slug}` }));

        gridExplainers = MOCK_DATA.howStuffWorks.map((s, i) => ({
            ...s,
            id: `explainer-grid-${i}`,
            href: `/how-stuff-works/${s.slug}`
        }));
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionHeading title="How Stuff Works" subtitle="Deep dives into the technology shaping our world" />

            <HeroSection featuredArticle={featuredExplainer} topStories={topStories} />

            <ArticleGrid>
                {gridExplainers.map((item: any) => (
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
