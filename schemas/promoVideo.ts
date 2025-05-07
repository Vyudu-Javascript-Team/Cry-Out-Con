export default {
  name: 'promoVideo',
  title: 'Promotional Videos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
        storeOriginalFilename: true,
        // Enable Sanity's built-in video transcoding
        sources: [
          { width: 1920, height: 1080, format: 'mp4', quality: 80 },
          { width: 1280, height: 720, format: 'mp4', quality: 70 },
          { width: 854, height: 480, format: 'mp4', quality: 60 }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      description: 'This image will be shown while the video is loading'
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true
    }
  ]
}
