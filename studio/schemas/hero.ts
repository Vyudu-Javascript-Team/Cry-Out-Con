import { defineField, defineType } from "sanity";

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The main descriptive text below the title',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'date',
          validation: Rule => Rule.required()
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'date',
          validation: Rule => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Venue Name',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'state',
          title: 'State',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'registrationButton',
      title: 'Registration Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'REGISTER NOW'
        },
        {
          name: 'url',
          title: 'Registration URL',
          type: 'url',
          validation: Rule => Rule.required()
        }
      ]
    }),
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
      title: 'description',
      media: 'backgroundImage'
    }
  }
});
