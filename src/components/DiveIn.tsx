import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import { getDiveInContent } from "../lib/sanity";

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

const DiveIn = () => {
  const [content, setContent] = useState<DiveInContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDiveInContent = async () => {
      try {
        const data = await getDiveInContent();
        setContent(data);
      } catch (error) {
        console.error("Error fetching dive in content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiveInContent();
  }, []);

  if (!content) return null;

  if (isLoading) {
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
      </div>
  }

  const sortedParagraphs = [...content.paragraphs].sort((a, b) => a.order - b.order);


  return (
    <section className="py-8 relative overflow-hidden">
      <div className="container md:max-w-5xl mx-auto px-8 space-y-6">
        <SectionTitle
          title={content.sectionTitle}
          gradient="from-pink-500 via-purple-500 to-blue-500"
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
