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
      name: "button",
      title: "Button",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
          title: "Title",
          initialValue: "Contact Us",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "email",
          type: "string",
          title: "Email",
          initialValue: "contact@cryoutcon.com",
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
  ],
};
