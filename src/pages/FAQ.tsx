import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionTitle from "../components/SectionTitle";

import { getFAQs } from "../lib/sanity";

interface FAQItemProps {
  question: string;
  children: React.ReactNode;
}

const FAQItem = ({ question, children }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-fuchsia-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-300">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type FAQsData = {
  heading: string;
  subHeading?: string;
  questions: [
    {
      question: string;
      answer?: string;
      answerWithLink?: { text: string; link: string };
      answerWithList?: { text: string; list: [] };
      answerWithListButton?: {
        text: string;
        list: [];
        buttonText: string;
        buttonLink: string;
      };
    },
  ];
};

export default function FAQ() {
  const [faqs, setFAQs] = useState<FAQsData | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await getFAQs();

        if (data) {
          setFAQs(data);
        }
      } catch (error) {
        console.error("Error fetching policy page: ", error);
      }
    };

    fetchFAQs();
  }, []);

  return (
    faqs && (
      <div className="relative min-h-screen bg-primary text-white">
        <div className="relative pt-24 pb-16 px-4 md:px-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title={faqs.heading}
              subtitle={faqs.subHeading}
              gradient="from-fuchsia-400 via-purple-400 to-blue-400"
            />

            <div className="mt-10 space-y-1 bg-primary/70 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              {faqs.questions.slice(1).map((question) => {
                let answerWithLinkOutput = <></>;

                if (question.answerWithLink) {
                  let splitText =
                    question.answerWithLink.text.split("click here");
                  if (splitText.length > 1) {
                    answerWithLinkOutput = (
                      <>
                        {splitText[0]}
                        <a
                          href={question.answerWithLink.link}
                          className="text-fuchsia-400 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          click here
                        </a>
                        {splitText[1]}
                      </>
                    );
                  } else {
                    splitText = question.answerWithLink.text.split("here");
                    answerWithLinkOutput = (
                      <>
                        {splitText[0]}
                        <a
                          href={question.answerWithLink.link}
                          className="text-fuchsia-400 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          here
                        </a>
                        {splitText[1]}
                      </>
                    );
                  }
                }

                return (
                  <FAQItem question={question.question} key={question.question}>
                    {question.answer && <p>{question.answer}</p>}
                    {question.answerWithLink && <p>{answerWithLinkOutput}</p>}
                    {question.answerWithList && (
                      <>
                        <p className="mb-2">{question.answerWithList.text}</p>
                        <ul className="list-disc pl-6 space-y-1">
                          {question.answerWithList.list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    {question.answerWithListButton && (
                      <>
                        <p className="mb-2">
                          {question.answerWithListButton.text}
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mb-3">
                          {question.answerWithListButton.list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <a
                          href={question.answerWithListButton.buttonLink}
                          className="inline-block bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {question.answerWithListButton.buttonText}
                        </a>
                      </>
                    )}
                  </FAQItem>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    )
  );
}
