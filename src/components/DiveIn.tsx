import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import { getDiveInContent } from "../lib/sanity";

// Flag to control whether to use Sanity data or 2026 data
// Set to true to always use 2026 data, false to attempt to fetch from Sanity first
const use2026OfflineData = true;

type Paragraph = {
  text: string;
  order: number;
};

type DiveInContent = {
  _id: string;
  sectionTitle: string;
  titleGradient: string;
  paragraphs: Paragraph[];
  isVisible: boolean;
};

// Default 2026 content
const default2026Content: DiveInContent = {
  _id: 'default-2026-dive-in',
  sectionTitle: 'CryOut Con 2026: Collaboration',
  titleGradient: 'from-pink-500 via-purple-500 to-blue-500',
  paragraphs: [
    {
      text: 'Join us for CryOut Con 2026 as we explore our theme of Collaboration – "Help Is On the Way". In a world that often feels divided, we are coming together to discover how we can be the hands and feet of Jesus in our communities.',
      order: 1
    },
    {
      text: 'At Mississippi Coliseum in Jackson, Mississippi, from April 23-25, 2026, believers from across the nation will gather to worship, learn, and connect. Together, we will explore how collaborative efforts can bring transformative change and spread the message of hope.',
      order: 2
    },
    {
      text: 'Registration details will be announced soon. Mark your calendars and prepare for a life-changing experience as we demonstrate that when God\'s people work together, help is truly on the way!',
      order: 3
    }
  ],
  isVisible: true
};

const DiveIn = () => {
  const [content, setContent] = useState<DiveInContent | null>(null);

  useEffect(() => {
    const fetchDiveInContent = async () => {
      try {
        // If use2026OfflineData is true, skip Sanity fetch and use default data
        if (use2026OfflineData) {
          setContent(default2026Content);
          return;
        }

        // Otherwise try to fetch from Sanity
        const data = await getDiveInContent();
        if (data && data.isVisible) {
          setContent(data);
        } else {
          // Use default 2026 content if no data from Sanity or data is not visible
          setContent(default2026Content);
        }
      } catch (error) {
        console.error("Error fetching dive in content:", error);
        // Use default 2026 content on error
        setContent(default2026Content);
      }
    };

    fetchDiveInContent();
  }, []);

  // If no content, use the default 2026 content
  const displayContent = content || default2026Content;
  const sortedParagraphs = [...displayContent.paragraphs].sort((a, b) => a.order - b.order);

  return (
    <section className="py-8 relative overflow-hidden">
      <div className="container md:max-w-5xl mx-auto px-8 space-y-6">
        <SectionTitle
          title={displayContent.sectionTitle}
          gradient={displayContent.titleGradient || "from-pink-500 via-purple-500 to-blue-500"}
        />
        {sortedParagraphs.map((paragraph, index) => (
          <p key={`paragraph-${index}`} className="text-xl">
            {paragraph.text}
          </p>
        ))}
      </div>
    </section>
  );
};

export default DiveIn;
