import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "lucide-react"; // Wait, I don't have Badge component, just icon. 
// I'll stick to text badge for now or create a Badge component if needed. 
// Actually I listed "Badge" in the task list but didn't create it. Simple span is fine.

export default function HowToPage() {
    const guides = [
        {
            id: 1,
            title: "How to run Llama 3 locally on your Mac",
            difficulty: "Medium",
            time: "15 min"
        },
        {
            id: 2,
            title: "Optimizing Next.js for maximum SEO",
            difficulty: "Hard",
            time: "30 min"
        },
        {
            id: 3,
            title: "Switching from Android to iOS: The complete guide",
            difficulty: "Easy",
            time: "10 min"
        },
        {
            id: 4,
            title: "Building a custom mechanical keyboard",
            difficulty: "Hard",
            time: "2 hours"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold tracking-tight mb-8">How To Guides</h1>
            <div className="grid gap-6">
                {guides.map((guide) => (
                    <Card key={guide.id} className="flex flex-col md:flex-row items-center p-6 gap-6 hover:bg-secondary/20 transition-colors">
                        <div className="flex-1 space-y-2">
                            <CardTitle>{guide.title}</CardTitle>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">⏱ {guide.time}</span>
                                <span className="flex items-center gap-1">📊 {guide.difficulty}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
