export default {
  name: "policyPage",
  title: "Policy Page",
  type: "document",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Refund Policy & Terms",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "content",
              title: "Content",
              type: "text",
              validation: (Rule) => Rule.required(),
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
