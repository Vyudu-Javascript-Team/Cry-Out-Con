import { defineField } from "sanity";

const headerNavigation = {
  name: "header-navigation",
  title: "Header Navigation",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required().error("Logo is required"),
    }),
    defineField({
      name: "navigationLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Link title is required"),
            }),
            defineField({
              name: "path",
              title: "Path",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Link URL is required"),
              description: "Enter just the path avoiding the domain. E.g in https://cryoutcon.com/speakers just enter 'speakers'"
            }),
            defineField({
              name: "toSection",
              title: "To Section?",
              type: "boolean",
              description: "Choose whether to point to a section in a page."
            }),
            defineField({
              name: "order",
              title: "Display Order",
              type: "number",
              validation: (Rule) =>
                Rule.required()
                  .integer()
                  .min(1)
                  .error("Display order must be a positive number"),
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("At least one navigation link is required"),
    }),
    defineField({
      name: "navigationButtons",
      title: "Navigation Buttons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Button title is required"),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().error("Button URL is required"),
            }),
            defineField({
              name: "order",
              title: "Display Order",
              type: "number",
              validation: (Rule) =>
                Rule.required()
                  .integer()
                  .min(1)
                  .error("Display order must be a positive number"),
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("At least one navigation button is required"),
    }),
  ],
};

export default headerNavigation;
