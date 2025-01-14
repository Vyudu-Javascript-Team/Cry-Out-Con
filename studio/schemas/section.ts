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
          { title: 'Keynotes', value: 'keynotes' },
          { title: 'Thought Leaders', value: 'thought-leaders' },
          { title: 'Workshop Leaders', value: 'workshop-leaders' },
          { title: 'Artists', value: 'artists' },
          { title: 'Registration', value: 'registration' },
          { title: 'Hotels', value: 'hotels' },
          { title: 'About', value: 'about' },
          { title: 'Schedule', value: 'schedule' }
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
