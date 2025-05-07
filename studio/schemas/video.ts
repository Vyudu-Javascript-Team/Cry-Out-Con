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
                storeOriginalFilename: true,
                // Enable Sanity's built-in video transcoding
                sources: [
                    { width: 1920, height: 1080, format: 'mp4', quality: 80 },
                    { width: 1280, height: 720, format: 'mp4', quality: 70 },
                    { width: 854, height: 480, format: 'mp4', quality: 60 }
                ]
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
        }
    }
});

export default video;
