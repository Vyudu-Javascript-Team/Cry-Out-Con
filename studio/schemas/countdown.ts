import { defineField, defineType } from "sanity";

export default defineType({
    name: 'countdown',
    title: 'Event Countdown',
    type: 'document',
    fields: [
        defineField({
            name: 'eventName',
            title: 'Event Name',
            type: 'string',
            validation: Rule => Rule.required(),
            description: 'Enter the name of the event'
        }),
        defineField({
            name: 'eventDate',
            title: 'Event Date and Time (Eastern Time)',
            type: 'datetime',
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
                timeStep: 15,
            },
            validation: Rule => Rule.required(),
            description: 'Set the date and time for the event in Eastern Time (EST/EDT)'
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            description: 'Toggle to enable/disable the countdown',
            initialValue: true
        })
    ],
    preview: {
        select: {
            title: 'eventName',
            date: 'eventDate',
            isActive: 'isActive'
        },
        prepare({ title, date, isActive }) {
            const formattedDate = new Date(date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/New_York',
                timeZoneName: 'short'
            });
            return {
                title: title || 'Untitled Event',
                subtitle: `${formattedDate} | ${isActive ? 'Active' : 'Inactive'}`
            }
        }
    }
});
