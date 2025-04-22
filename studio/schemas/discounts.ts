export default {
  name: "discounts",
  title: "Discounts",
  type: "document",
  fields: [
    {
      name: "intro",
      title: "Intro",
      type: "string",
      initialValue:
        "Use these exclusive discount codes when booking your travel to Cry Out Con. Enter these codes during checkout on the respective airline or car rental websites to receive special attendee rates.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "discounts",
      title: "Discounts",
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
              name: "intro",
              title: "Intro",
              type: "string",
            },
            {
              name: "items",
              title: "Items",
              type: "array",
              validation: (Rule) => Rule.required(),
              of: [
                {
                  name: "item",
                  title: "Item",
                  type: "object",
                  fields: [
                    {
                      name: "name",
                      title: "Name",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "code",
                      title: "Code",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                  ],
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
