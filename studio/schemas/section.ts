export default {
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'ARE YOU READY TO GO ALL IN', value: 'video' },
          { title: 'GET READY TO CRY OUT', value: 'dive' },
          { title: 'EXPLORE CRY OUT CON', value: 'conference' },
          { title: 'KEYNOTE SPEAKERS', value: 'keynotes' },
          { title: 'REGISTRATION', value: 'registration' },
          { title: 'CONFERENCE SCHEDULE', value: 'agenda' },
          { title: 'News', value: 'news' },
          { title: 'GET UPDATES', value: 'newsletter' },
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'isEnabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text'
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility.'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'content.title',
      subtitle: 'type',
      enabled: 'isEnabled'
    },
    prepare({ title, subtitle, enabled }) {
      return {
        title: title || 'Untitled Section',
        subtitle: `${subtitle} ${enabled ? '(Enabled)' : '(Disabled)'}`,
      }
    }
  }
}
