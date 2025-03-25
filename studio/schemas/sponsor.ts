export default {
  name: "sponsorPage",
  title: "Sponsor Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Become a Sponsor",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      initialValue:
        "If interested in reaching our Cry Out Con audience through sponsorship, please email contact@cryoutcon.com. Please allow us 48 hours to respond.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "object",
      fields: [
        {
          name: "buttonTitle",
          type: "string",
          title: "Button Title",
          initialValue: "Contact Us",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "to",
          type: "string",
          title: "To",
          initialValue: "partnership@brandstoryarchitech.com",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "cc",
          type: "string",
          title: "CC",
          initialValue: "contact@cryoutcon.com",
        },
        {
          name: "subject",
          type: "string",
          title: "Subject",
          initialValue: "Cry Out Con Sponsorship Inquiry",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          initialValue: "Cry Out Con Audience",
          description: "Important for SEO and accessibility",
        },
      ],
    },
    {
      name: "bottom",
      title: "Bottom",
      type: "string",
      initialValue: "See you at Cry Out Con.",
    },
    {
      name: "isVisible",
      title: "Page Visible",
      type: "boolean",
      initialValue: true,
    },
  ],
};
