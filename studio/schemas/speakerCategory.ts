export default {
    name: 'speakerCategory',
    title: 'Speaker Categories',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Category Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'displayOrder',
        title: 'Display Order',
        type: 'number',
        description: 'Order in which this category appears (lower numbers first)',
        validation: Rule => Rule.required().min(0)
      },
      {
        name: 'isVisible',
        title: 'Visible on Website',
        type: 'boolean',
        description: 'Toggle to show/hide this category on the website',
        initialValue: true
      }
    ],
    preview: {
      select: {
        title: 'title',
        visible: 'isVisible'
      }
    }
  }
  