import { Suspense, useEffect, useState } from "react";
import bgImage from "/assets/backgroundimages/IMG_6543.jpg";
import LazyImage from "./LazyImage";
import SectionTitle from "./SectionTitle";
import { getAgenda } from "../lib/sanity";
interface AgendaDay {
  day: string;
  sessions: {
    time: string;
    activities: {
      title: string;
      note?: string;
    }[];
  }[];
}

interface AgendaData {
  announcement: string;
  days: AgendaDay[];
}

const Agenda = () => {
  const [agendaData, setAgendaData] = useState<AgendaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const data = await getAgenda();
        setAgendaData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching agenda:", error);
        setIsLoading(false);
      }
    };

    fetchAgenda();
  }, []);

  return (
    <section id="agenda" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="absolute inset-0 w-full h-full bg-gray-900 animate-pulse" />
          }
        >
          <LazyImage
            src={bgImage}
            alt="Background"
            className="w-full h-full object-cover"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </Suspense>
      </div>
      <div className="container mx-auto px-4 relative">
        <SectionTitle
          title="CONFERENCE SCHEDULE"
          subtitle={agendaData?.announcement || "Loading schedule..."}
          gradient="from-blue-400 via-purple-400 to-pink-400"
        />

        {isLoading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          </div>
        ) : !agendaData ? (
          <div className="text-center text-white">No agenda data available</div>
        ) : (
          <div className="bg-white w-full max-w-3xl mx-auto rounded-2xl border border-gray-200 shadow-lg p-4 md:p-6">
            {agendaData.days.map((day) => (
              <div key={day.day} className="mb-4">
                <h3 className="text-xl font-semibold text-purple-600 mb-2">
                  {day.day}
                </h3>
                <hr className="border-t border-gray-300 mb-4" />
                {day.sessions.map((session) => (
                  <div key={session.time} className="flex space-x-7 mb-2">
                    <span className="md:text-md text-sm font-semibold text-gray-700 min-w-[150px]">
                      {session.time}
                    </span>

                    <div className="">
                      {session.activities.map((activity, index) => (
                        <div key={index} className="text-gray-700">
                          <p className="text-sm md:text-md">{activity.title}</p>
                          {activity.note && (
                            <p className="mt-1 text-pink-400 text-sm font-medium">
                              {activity.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Agenda;
