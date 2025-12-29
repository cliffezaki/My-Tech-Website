import { ArticleCard } from "@/components/article-card";
import { ArticleGrid } from "@/components/article-grid";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { MOCK_DATA } from "@/lib/mock-data";

async function getHowToArticles() {
    try {
        const query = `*[_type == "article" && section == "how-to"] | order(publishedAt desc) {
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
        console.warn("Sanity How-To fetch failed:", err);
        return null;
    }
}

export default async function HowToPage() {
    const articles = await getHowToArticles();

    let featuredGuide;
    let topStories;
    let gridGuides;

    if (articles && articles.length > 0) {
        const featuredArticleRaw = articles[0];

        featuredGuide = {
            id: featuredArticleRaw._id,
            category: featuredArticleRaw.category || "Guide",
            title: featuredArticleRaw.title,
            excerpt: featuredArticleRaw.excerpt,
            author: featuredArticleRaw.author || "TechAI Staff",
            readTime: featuredArticleRaw.readTime || "15 min read",
            href: `/how-to/${featuredArticleRaw.slug}`,
            imageUrl: featuredArticleRaw.mainImage ? urlForImage(featuredArticleRaw.mainImage).url() : undefined
        };

        topStories = articles.slice(1, 3).map((article: any) => ({
            id: article._id,
            category: article.category || "Guide",
            title: article.title,
            excerpt: article.excerpt,
            author: article.author || "TechAI Staff",
            readTime: article.readTime || "10 min read",
            href: `/how-to/${article.slug}`,
            imageUrl: article.mainImage ? urlForImage(article.mainImage).url() : undefined
        }));

        gridGuides = articles.slice(3).map((article: any) => ({
            id: article._id,
            category: article.category || "Guide",
            title: article.title,
            excerpt: article.excerpt,
            author: article.author || "TechAI Staff",
            readTime: article.readTime || "10 min read",
            href: `/how-to/${article.slug}`,
            imageUrl: article.mainImage ? urlForImage(article.mainImage).url() : undefined
        }));
    } else {
        featuredGuide = {
            ...MOCK_DATA.howTo[0],
            id: 881,
            href: `/how-to/${MOCK_DATA.howTo[0].slug}`
        };

        // Mock top stories
        topStories = [MOCK_DATA.howTo[1]].map(s => ({ ...s, href: `/how-to/${s.slug}` }));

        // Mock grid
        gridGuides = MOCK_DATA.howTo.map((s, i) => ({
            ...s,
            id: `guide-${i}`,
            href: `/how-to/${s.slug}`
        }));
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionHeading title="How To Guides" subtitle="Step-by-step tutorials for the modern web" />

            <HeroSection featuredArticle={featuredGuide} topStories={topStories} />

            <ArticleGrid>
                {gridGuides.map((item: any) => (
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
