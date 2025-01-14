export default {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string'
    },
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image'
    },
    {
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string'
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'footer',
      title: 'Footer Settings',
      type: 'object',
      fields: [
        {
          name: 'copyright',
          title: 'Copyright Text',
          type: 'string'
        },
        {
          name: 'socialLinks',
          title: 'Social Links',
          type: 'object',
          fields: [
            {
              name: 'twitter',
              title: 'Twitter URL',
              type: 'url'
            },
            {
              name: 'facebook',
              title: 'Facebook URL',
              type: 'url'
            },
            {
              name: 'instagram',
              title: 'Instagram URL',
              type: 'url'
            }
          ]
        }
      ]
    }
  ]
}
