import { defineField, defineType } from "sanity";

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Website Sections',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'sectionId',
            title: 'Section',
            type: 'string',
            options: {
              list: [
                { title: 'Hero Section', value: 'hero' },
                { title: 'Video Section', value: 'video' },
                { title: 'Countdown', value: 'countdown' },
                { title: 'Dive In', value: 'dive' },
                { title: 'Conference', value: 'conference' },
                { title: 'Keynotes', value: 'keynotes' },
                { title: 'Registration', value: 'registration' },
                { title: 'Agenda', value: 'agenda' },
                { title: 'News', value: 'news' },
                { title: 'Newsletter', value: 'newsletter' }
              ]
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'isVisible',
            title: 'Visible',
            type: 'boolean',
            initialValue: true
          },
          {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            validation: Rule => Rule.required()
          }
        ],
        preview: {
          select: {
            title: 'sectionId',
            subtitle: 'isVisible',
            order: 'order'
          },
          prepare({ title, subtitle, order }) {
            return {
              title: title.charAt(0).toUpperCase() + title.slice(1),
              subtitle: `Order: ${order} | Visible: ${subtitle ? 'Yes' : 'No'}`
            }
          }
        }
      }]
    }),
    defineField({
      name: 'maintenanceMode',
      title: 'Maintenance Mode',
      type: 'boolean',
      description: 'Toggle to put the entire website in maintenance mode',
      initialValue: false
    })
  ]
});
