import { defineField, defineType } from "sanity";

export default defineType({
  name: 'conference',
  title: 'Conference',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'The main title of the section',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contentItem',
          fields: [
            {
              name: 'title',
              title: 'Image Title',
              type: 'string',
              description: 'Image title',
              validation: Rule => Rule.required()
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  description: 'Important for SEO and accessibility.',
                  validation: Rule => Rule.required()
                }
              ],
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: Rule => Rule.required()
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              validation: Rule => Rule.required().min(1)
            },
            {
              name: 'isVisible',
              title: 'Visible on Website',
              type: 'boolean',
              description: 'Toggle to show/hide this card on the website',
              initialValue: true
            }
          ]
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'isVisible',
      title: 'Visible on Website',
      type: 'boolean',
      description: 'Toggle to show/hide this section on the website',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      visible: 'isVisible',
      media: 'content.0.image'
    }
  }
});

  