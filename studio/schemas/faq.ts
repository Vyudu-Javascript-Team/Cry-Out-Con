export default {
  name: "faqs",
  title: "FAQs",
  type: "document",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "FAQ",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subHeading",
      title: "Sub heading",
      type: "string",
      initialValue: "Frequently Asked Questions"
    },
    {
      name: "questions",
      title: "Questions",
      type: "array",
      of: [
        {
          name: "content",
          title: "Content",
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "answer",
              title: "Answer",
              type: "string",
            },
            {
              name: "answerWithLink",
              title: "Answer with Link",
              type: "object",
              fields: [
                {
                  name: "text",
                  title: "Text",
                  type: "string",
                },
                {
                  name: "link",
                  title: "Link",
                  type: "url",
                },
              ],
            },
            {
              name: "answerWithList",
              title: "Answer with List",
              type: "object",
              fields: [
                {
                  name: "text",
                  title: "Text",
                  type: "string",
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
              ],
            },
            {
              name: "answerWithListButton",
              title: "Answer with List & Button",
              type: "object",
              fields: [
                {
                  name: "text",
                  title: "Text",
                  type: "string",
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
                  name: "buttonText",
                  title: "Button Text",
                  type: "string",
                },
                {
                  name: "buttonLink",
                  title: "Button Link",
                  type: "url",
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
