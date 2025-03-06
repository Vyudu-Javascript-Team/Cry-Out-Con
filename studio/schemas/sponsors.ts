import { defineField } from "sanity";

const sponsors = {
  name: "sponsors",
  title: "Sponsors",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "audienceImage",
      title: "Audience Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "isVisible",
      title: "Is Visible",
      type: "boolean",
      initialValue: true,
    }),
  ],
};

export default sponsors;
