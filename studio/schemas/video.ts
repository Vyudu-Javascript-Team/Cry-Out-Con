import { defineField, defineType } from "sanity";

const video = defineType({
    name: 'video',
    title: 'Video',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required().max(100)
        }),
        defineField({
            name: 'videoFile',
            title: 'Video File',
            type: 'file',
            options: {
                accept: 'video/*',
                storeOriginalFilename: true
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            description: 'Toggle to show/hide video on the site',
            initialValue: true
        })
    ],
    preview: {
        select: {
            title: 'title',
            media: 'videoFile'
        }
    }
});

export default video;
