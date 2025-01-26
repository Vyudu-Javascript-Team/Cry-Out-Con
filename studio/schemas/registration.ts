import { defineField } from "sanity";

const registration = {
    name: 'registration',
    title: 'Registration',
    type: 'document',
    fields: [
        defineField({
            name: 'sectionTitle',
            title: 'Section Title',
            type: 'string',
            validation: Rule => Rule.required().error('Section title is required'),
        }),
        defineField({
            name: 'sectionSubTitle',
            title: 'Section Subtitle',
            type: 'string',
            validation: Rule => Rule.required().error('Section subtitle is required'),
        }),
        defineField({
            name: 'plans',
            title: 'Registration Plans',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Plan Title',
                            type: 'string',
                            validation: Rule => Rule.required().error('Plan title is required'),
                        }),
                        defineField({
                            name: 'price',
                            title: 'Price',
                            type: 'number',
                            validation: Rule => Rule.required().min(0).error('Price must be a positive number'),
                        }),
                        defineField({
                            name: 'features',
                            title: 'Features',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'feature',
                                            title: 'Feature',
                                            type: 'string',
                                            validation: Rule => Rule.required(),
                                        }),
                                        defineField({
                                            name: 'included',
                                            title: 'Included',
                                            type: 'boolean',
                                            initialValue: true,
                                        })
                                    ]
                                }
                            ],
                            validation: Rule => Rule.required().min(1).error('At least one feature is required'),
                        }),

                        defineField({
                            name: 'order',
                            title: 'Display Order',
                            type: 'number',
                            validation: Rule => Rule.required().integer().min(1),
                            initialValue: 1,
                        }),
                        defineField({
                            name: 'backgroundColor',
                            title: 'Background Color',
                            type: 'string',
                            description: 'Tailwind CSS background color class',
                            initialValue: 'bg-gray-900',
                        }),
                    ]
                }
            ],
            validation: Rule => Rule.required().min(1).error('At least one registration plan is required'),
        }),
        defineField({
            name: 'regLink',
            title: 'Registration Link',
            type: 'url',
            validation: Rule => Rule.required().error('Registration link is required'),
        }),
    ],
};

export default registration;
