import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function NewsPage() {
    const allNews = [
        {
            id: 1,
            category: "AI",
            title: "DeepMind's AlphaFold 3 release delayed?",
            excerpt: "Sources say the release is pushed back due to safety testing.",
            date: "Today"
        },
        {
            id: 2,
            category: "Mobile",
            title: "iOS 18.2 Beta features leaked",
            excerpt: "New intense AI integration found in the latest developer beta.",
            date: "Yesterday"
        },
        {
            id: 3,
            category: "Hardware",
            title: "Nvidia RTX 5090 specs rumors",
            excerpt: "Power draw might be lower than expected, performance doubled.",
            date: "2 days ago"
        },
        {
            id: 4,
            category: "Policy",
            title: "EU AI Act enters final stages",
            excerpt: "What this means for open source models in Europe.",
            date: "3 days ago"
        },
        {
            id: 5,
            category: "Startups",
            title: "Groq raises another $500M",
            excerpt: "The LPU chip maker is scaling up production.",
            date: "1 week ago"
        },
        {
            id: 6,
            category: "Gadgets",
            title: "Rabbit R1 software update coming",
            excerpt: "Can software fix the hardware limitations? We discuss.",
            date: "1 week ago"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold tracking-tight mb-8">Latest News</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {allNews.map((item) => (
                    <Card key={item.id} className="hover:border-brand-red/50 transition-colors group">
                        <CardHeader>
                            <div className="flex justify-between items-center text-xs text-muted-foreground uppercase font-bold tracking-wider mb-2">
                                <span className="text-brand-red">{item.category}</span>
                                <span>{item.date}</span>
                            </div>
                            <CardTitle className="leading-tight text-brand-red transition-colors hover:underline">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{item.excerpt}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
