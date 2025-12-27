import { Card, CardContent } from "@/components/ui/card";

export default function HowStuffWorksPage() {
    const articles = [
        {
            title: "How Transformers work (in plain English)",
            excerpt: "The architecture behind the AI revolution explained without the math."
        },
        {
            title: "Understanding OLED vs MicroLED",
            excerpt: "Why the screen tech matters and what is coming next."
        },
        {
            title: "How 5G actually works",
            excerpt: "It's not just faster speed, it's about latency and beamforming."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold tracking-tight mb-8">How Stuff Works</h1>
            <div className="space-y-8">
                {articles.map((article, idx) => (
                    <div key={idx} className="group border-b pb-8 last:border-0">
                        <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors cursor-pointer">{article.title}</h2>
                        <p className="text-lg text-muted-foreground">{article.excerpt}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
