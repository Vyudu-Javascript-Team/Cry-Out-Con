export default {
  name: 'speaker',
  title: 'Speaker',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Job Title',
      type: 'string'
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string'
    },
    {
      name: 'category',
      title: 'Speaker Category',
      type: 'reference',
      to: [{ type: 'speakerCategory' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Profile Image',
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
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url'
        },
        {
          name: 'website',
          title: 'Personal Website',
          type: 'url'
        }
      ]
    },
    {
      name: 'orderInCategory',
      title: 'Display Order (within category)',
      type: 'number',
      description: 'Lower numbers will be displayed first',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'isVisible',
      title: 'Visible on Website',
      type: 'boolean',
      description: 'Toggle to show/hide this speaker on the website',
      initialValue: true
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
      visible: 'isVisible'
    }
  }
}
