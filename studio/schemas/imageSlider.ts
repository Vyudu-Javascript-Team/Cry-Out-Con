export default {
    name: 'imageSlider',
    title: 'Images Carousel',
    type: 'document',
    fields: [
      {
        name: 'slides',
        title: 'Carousel Slides',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'image',
                title: 'Slide Image',
                type: 'image',
                options: {
                  hotspot: true
                },
                fields: [
                  {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                    description: 'Important for SEO and accessibility'
                  }
                ]
              },
              {
                name: 'order',
                title: 'Display Order',
                type: 'number',
                validation: Rule => Rule.required()
              }
            ]
          }
        ]
      }
    ]
  }
  