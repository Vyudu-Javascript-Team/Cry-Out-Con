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
      note?: any;
    }[];
  }[];
}

interface AgendaData {
  announcement: string;
  days: AgendaDay[];
}

interface ProcessedSession {
  time: string;
  activities: {
    title: string;
    note?: any;
  }[];
  isLongRunning: boolean;
  startTimeMinutes: number;
}

const Agenda = () => {
  const [agendaData, setAgendaData] = useState<AgendaData | null>(null);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const data = await getAgenda();
        console.log('Agenda Data:', JSON.stringify(data, null, 2));
        if(data){
          setAgendaData(data);
        }
      } catch (error) {
        console.error("Error fetching agenda:", error);
      }
    };

    fetchAgenda();
  }, []);

  // Sort days chronologically
  const getSortedDays = (days: AgendaDay[]) => {
    return [...days].sort((a, b) => {
      // Extract dates from day titles
      const getDayNumber = (dayString: string) => {
        const match = dayString.match(/(\w+) May (\d+)/);
        if (match && match[2]) {
          return parseInt(match[2]);
        }
        return 0;
      };
      
      return getDayNumber(a.day) - getDayNumber(b.day);
    });
  };

  // Process and analyze session times
  const processSessionTimes = (sessions: AgendaDay['sessions'], dayTitle: string): ProcessedSession[] => {
    return sessions.map(session => {
      // Handle null or undefined time strings
      const timeString = session.time || '';
      
      // Extract start and end times
      const timeParts = timeString.split('-').map(t => t.trim());
      const startTimeStr = timeParts[0] || '';
      const endTimeStr = timeParts.length > 1 ? timeParts[1] : '';
      
      // Parse start time
      const startMatch = startTimeStr.match(/(\d+):?(\d+)?\s*(AM|PM)?/i);
      let startHours = 0;
      let startMinutes = 0;
      
      if (startMatch) {
        startHours = parseInt(startMatch[1]) || 0;
        startMinutes = parseInt(startMatch[2] || '0') || 0;
        const ampm = startMatch[3]?.toUpperCase();
        
        // Convert to 24-hour format
        if (ampm === 'PM' && startHours < 12) {
          startHours += 12;
        } else if (ampm === 'AM' && startHours === 12) {
          startHours = 0;
        }
      }
      
      const startTimeMinutes = startHours * 60 + startMinutes;
      
      // Parse end time if it exists
      let endTimeMinutes = 0;
      if (endTimeStr) {
        const endMatch = endTimeStr.match(/(\d+):?(\d+)?\s*(AM|PM)?/i);
        if (endMatch) {
          let endHours = parseInt(endMatch[1]) || 0;
          const endMinutes = parseInt(endMatch[2] || '0') || 0;
          const ampm = endMatch[3]?.toUpperCase();
          
          // Convert to 24-hour format
          if (ampm === 'PM' && endHours < 12) {
            endHours += 12;
          } else if (ampm === 'AM' && endHours === 12) {
            endHours = 0;
          }
          
          endTimeMinutes = endHours * 60 + endMinutes;
        }
      }
      
      // Calculate duration in minutes (if end time exists)
      let durationMinutes = 0;
      if (endTimeMinutes > 0) {
        durationMinutes = endTimeMinutes - startTimeMinutes;
        // Handle crossing midnight
        if (durationMinutes < 0) {
          durationMinutes += 24 * 60;
        }
      }
      
      // Check if the activities include a Morning Keynote on Saturday
      const isSaturdayMorningKeynote = dayTitle.includes("Saturday") && 
        session.activities.some(activity => 
          activity.title.includes("Morning Keynote")
        );
      
      // Determine if this is a long-running event (more than 3 hours)
      // Exclude the Morning Keynote on Saturday
      const isLongRunning = durationMinutes > 180 && !isSaturdayMorningKeynote;
      
      // Check if the title indicates a long-running event like registration
      // Exclude the Morning Keynote on Saturday
      const isRegistration = !isSaturdayMorningKeynote && session.activities.some(activity => 
        activity.title.toUpperCase().includes("REGISTRATION")
      );
      
      return {
        ...session,
        isLongRunning: isLongRunning || isRegistration,
        startTimeMinutes
      };
    });
  };

  // Get processed agenda data with all sorting applied
  const getProcessedAgendaData = (data: AgendaData | null) => {
    if (!data) return null;
    
    // Create a deep copy and process everything
    const processedData = {
      ...data,
      days: getSortedDays(data.days).map(day => {
        // Process sessions to analyze timing
        const processedSessions = processSessionTimes(day.sessions, day.day);
        
        // Sort by start time
        const sortedSessions = [...processedSessions].sort((a, b) => 
          a.startTimeMinutes - b.startTimeMinutes
        );
        
        // Separate into long-running and regular events
        const longRunningSessions = sortedSessions.filter(s => s.isLongRunning);
        const regularSessions = sortedSessions.filter(s => !s.isLongRunning);
        
        return {
          ...day,
          longRunningSessions,
          regularSessions
        };
      })
    };
    
    return processedData;
  };

  const renderActivityNote = (activity: any) => {
    console.log('Activity Note:', activity.note);
    let noteText = typeof activity.note === 'string' ? activity.note : 
                 Array.isArray(activity.note) ? activity.note[0]?.children?.map((child: any) => child.text).join('') : '';
    
    // For the specific workshop session, force the note text
    if (activity.title === 'WORKSHOP: Money Management & Debt Reduction In Turbulent Times') {
      return (
        <p className="mt-1 text-pink-400 text-sm font-medium">
          <a 
            href="https://bit.ly/3YSELo4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-pink-500"
          >
            RSVP here
          </a>
          {' '}
          <a 
            href="https://bit.ly/3YSELo4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-pink-500"
          >
            https://bit.ly/3YSELo4
          </a>
          , or in the App
        </p>
      );
    }
    
    // For other notes that contain RSVP
    if (noteText?.includes('RSVP here')) {
      return (
        <p className="mt-1 text-pink-400 text-sm font-medium">
          <a 
            href="https://bit.ly/3YSELo4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-pink-500"
          >
            RSVP here
          </a>
          {' '}
          <a 
            href="https://bit.ly/3YSELo4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-pink-500"
          >
            https://bit.ly/3YSELo4
          </a>
          , or in the App
        </p>
      );
    }
    
    // For all other notes
    return (
      <p className="mt-1 text-pink-400 text-sm font-medium">
        {noteText}
      </p>
    );
  };

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

       
          <div className="bg-white w-full max-w-3xl mx-auto rounded-2xl border border-gray-200 shadow-lg p-4 md:p-6">
            {agendaData && getProcessedAgendaData(agendaData)?.days.map((day: any) => (
              <div key={day.day} className="mb-8">
                <h3 className="text-xl font-semibold text-purple-600 mb-2">
                  {day.day}
                </h3>
                <hr className="border-t border-gray-300 mb-4" />
                
                {/* Long-running events section */}
                {day.longRunningSessions.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Day-Long Events</h4>
                    <div className="bg-gray-50 rounded-lg p-3 mb-4 border-l-4 border-purple-400">
                      {day.longRunningSessions.map((session: ProcessedSession) => (
                        <div key={session.time} className="mb-2">
                          <div className="flex items-start">
                            <span className="text-sm font-semibold text-purple-600 min-w-[150px]">
                              {session.time}
                            </span>
                            <div>
                              {session.activities.map((activity, index) => (
                                <div key={index} className="mb-1">
                                  <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                                  {activity.note && renderActivityNote(activity)}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Regular scheduled events */}
                <h4 className="text-lg font-medium text-gray-800 mb-3">Scheduled Events</h4>
                {day.regularSessions.map((session: ProcessedSession) => (
                  <div key={session.time} className="flex space-x-7 mb-3">
                    <span className="md:text-md text-sm font-semibold text-gray-700 min-w-[150px]">
                      {session.time}
                    </span>

                    <div className="">
                      {session.activities.map((activity, index) => (
                        <div key={index} className="text-gray-700 mb-2">
                          <p className="text-sm md:text-md font-medium">{activity.title}</p>
                          {activity.note && renderActivityNote(activity)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default Agenda;
