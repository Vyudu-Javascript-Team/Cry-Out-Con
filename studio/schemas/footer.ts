import { defineField } from "sanity";

const footer = {
    name: 'footer',
    title: "Footer",
    type: 'document',
    fields: [
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt',
                    type: 'string',
                })
            ],
            validation: Rule => Rule.required().error('Footer logo is required'),
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            validation: Rule => Rule.required().error('Platform is required'),
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            validation: Rule => Rule.required().error('Social media URL is required'),
                        }),
                        defineField({
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                            description: 'Icon identifier for the social platform',
                            validation: Rule => Rule.required().error('Icon identifier is required'),
                        })
                    ]
                }
            ],
            validation: Rule => Rule.required().min(1).error('At least one social link is required'),
        }),
        defineField({
            name: 'navigationLinks',
            title: 'Navigation Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                            validation: Rule => Rule.required().error('Link title is required'),
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            validation: Rule => Rule.required().error('Link URL is required'),
                        }),
                        defineField({
                            name: 'order',
                            title: 'Display Order',
                            type: 'number',
                            validation: Rule => Rule.required().integer().min(1).error('Display order must be a positive number'),
                        })
                    ]
                }
            ],
            validation: Rule => Rule.required().min(1).error('At least one navigation link is required'),
        }),
        defineField({
            name: 'copyright',
            title: 'Copyright Text',
            type: 'string',
            validation: Rule => Rule.required().error('Copyright text is required'),
        })
    ],
};

export default footer;
