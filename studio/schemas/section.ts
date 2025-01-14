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
          { title: 'About', value: 'about' },
          { title: 'Schedule', value: 'schedule' }
        ]
      }
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
      type: 'number'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string'
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
          }
        }
      ]
    }
  ]
}
