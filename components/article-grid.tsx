import { ReactNode } from "react";

interface ArticleGridProps {
    children: ReactNode;
    className?: string; // Allow custom classes
}

export function ArticleGrid({ children, className = "" }: ArticleGridProps) {
    return (
        <div className={`grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
            {children}
        </div>
    );
}
