import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TechKenyaPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold tracking-tight mb-8">Tech Kenya</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to Tech Kenya</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Your source for technology news and updates from Kenya and across Africa.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
