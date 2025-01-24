export default {
    name: 'diveIn',
    title: 'Get Ready',
    type: 'document',
    fields: [
      {
        name: 'sectionTitle',
        title: 'Section Title',
        type: 'string',
        description: 'The main title of the section (e.g., "GET READY TO CRY OUT")',
        validation: Rule => Rule.required()
      },
      {
        name: 'paragraphs',
        title: 'Content Paragraphs',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'paragraph',
            fields: [
              {
                name: 'text',
                title: 'Paragraph Text',
                type: 'text',
                validation: Rule => Rule.required()
              },
              {
                name: 'order',
                title: 'Display Order',
                type: 'number',
                validation: Rule => Rule.required().min(1)
              }
            ]
          }
        ],
        validation: Rule => Rule.required()
      },
      {
        name: 'isVisible',
        title: 'Visible on Website',
        type: 'boolean',
        description: 'Toggle to show/hide this section on the website',
        initialValue: true
      }
    ],
    preview: {
      select: {
        title: 'sectionTitle',
        visible: 'isVisible'
      }
    }
  }
  