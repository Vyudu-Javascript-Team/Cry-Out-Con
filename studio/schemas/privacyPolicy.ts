export default {
  name: "privacyPolicy",
  title: "Privacy Policy",
  type: "document",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Privacy Policy",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          name: "content",
          title: "Content",
          type: "object",
          fields: [
            {
                name: "title",
                title: "Title",
                type: "string",
                validation: (Rule) => Rule.required(),
            },
            {
              name: "groupByTitle",
              title: "Group by Title",
              type: "string"
            },
            {
              name: "paragraphsBeforeList",
              title: "Paragraphs before List",
              type: "array",
              of: [
                {
                  name: "paragraph",
                  title: "Paragraph",
                  type: "string",
                },
              ],
            },
            {
              name: "list",
              title: "List",
              type: "array",
              of: [
                {
                  name: "item",
                  title: "Item",
                  type: "string",
                },
              ],
            },
            {
                name: "paragraphsAfterList",
                title: "Paragraphs after List",
                type: "array",
                of: [
                  {
                    name: "paragraph",
                    title: "Paragraph",
                    type: "string",
                  },
                ],
              },
            {
              name: "order",
              title: "Display Order",
              type: "number",
              validation: (Rule) =>
                Rule.required()
                  .integer()
                  .min(1)
                  .error("Display order must be a positive number"),
            },
          ],
        },
      ],
    },
    {
      name: "isVisible",
      title: "Page Visible",
      type: "boolean",
      initialValue: true,
    },
  ],
};
