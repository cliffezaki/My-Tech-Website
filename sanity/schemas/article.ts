import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'article',
    title: 'Article',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            description: 'Short summary for card display',
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'AI', value: 'AI' },
                    { title: 'Smartphone', value: 'Smartphone' },
                    { title: 'Startups', value: 'Startups' },
                    { title: 'Reviews', value: 'Reviews' },
                    { title: 'Tech Kenya', value: 'Tech Kenya' },
                    { title: 'How To', value: 'How To' },
                    { title: 'Explainer', value: 'Explainer' }
                ]
            }
        }),
        defineField({
            name: 'section',
            title: 'Section',
            type: 'string',
            description: 'Which section should this appear in?',
            options: {
                list: [
                    { title: 'News', value: 'news' },
                    { title: 'Reviews', value: 'reviews' },
                    { title: 'How To', value: 'how-to' },
                    { title: 'How Stuff Works', value: 'how-stuff-works' },
                    { title: 'Tech Kenya', value: 'tech-kenya' },
                ]
            }
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'readTime',
            title: 'Read Time',
            type: 'string',
            description: 'e.g., "5 min read"',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        }),
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})
