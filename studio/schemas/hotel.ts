import { defineField } from "sanity";

const hotel = {
    name: 'hotel',
    title: "Hotel",
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule =>
                Rule.required().max(50).error('Maximum 50 characters'),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required().min(100).error('Minimum 100 characters'),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            validation: Rule => Rule.required().error('Image is required'),
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required().min(100).error('Minimum 100 characters'),
        }),
        defineField({
            name: 'website',
            title: 'Website',
            type: 'string',
            validation: Rule => Rule.required().error('Website is required'),
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: Rule => Rule.required().error('Rating is required'),
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'string',
            validation: Rule => Rule.required().error('Address is required'),
        }),
        defineField({
            name: 'amenities',
            title: 'Amenities',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'icon', title: 'Icon', type: 'string' },
                        { name: 'amenity', title: 'Amenity', type: 'string' },
                    ],
                },
            ],
            validation: (Rule) => Rule.required().error('Amenities are required'),
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
            validation: (Rule) => Rule.required().error('Features are required'),
            description: 'Add hotel features as bullet points'
        })
        
    ],
};

export default hotel;