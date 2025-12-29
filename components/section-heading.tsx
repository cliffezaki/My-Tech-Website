interface SectionHeadingProps {
    title: string;
    subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
    return (
        <div className="mb-10 border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight font-[family-name:var(--font-playfair)]">
                {title}
            </h1>
            {subtitle && (
                <p className="text-gray-500 mt-2 text-lg">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
