interface AgendaDay {
  day: string;
  sessions: { time: string; title: string }[];
}

const agenda: { announcement: string; days: AgendaDay[] } = {
  announcement: "Full Schedule To Be Announced on February 28, 2025",
  days: [
    {
      day: "Thursday May 01",
      sessions: [
        { time: "7:30 PM - 10:00 PM", title: "Opening Night Session" },
      ],
    },
    {
      day: "Friday May 02",
      sessions: [
        {
          time: "10:00 AM - 5:00 PM",
          title: "Praise & Worship, Breakouts, Keynote Addresses, Conversations",
        },
        { time: "7:00 PM - 10:00 PM", title: "Evening Keynote Session with Musical Guest" },
      ],
    },
    {
      day: "Saturday May 03",
      sessions: [
        { time: "8:00 AM", title: "Wellness Session" },
        {
          time: "10:00 AM - 5:00 PM",
          title: "Praise & Worship, Breakouts, Keynote Addresses",
        },
        { time: "7:00 PM - 10:00 PM", title: "Evening Musical Performances" },
      ],
    },
    {
      day: "Sunday May 04",
      sessions: [{ time: "10:00 AM", title: "Closing Session" }],
    },
  ],
};

const Agenda = () => {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{
        backgroundImage: "url(src/assets/backgroundimages/IMG_6543.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Conference Schedule
        </h2>

        <p className="text-center text-gray-300 mb-8">{agenda.announcement}</p>

        <div className="bg-white max-w-3xl mx-auto rounded-2xl border border-gray-200 shadow-lg p-6">
          {agenda.days.map((day, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold text-purple-600 mb-2">
                {day.day} 
              </h3>
              <hr className="border-t border-gray-300 mb-4" />
              {day.sessions.map((session, idx) => (
                <div key={idx} className="flex space-x-7 mb-2">
                  <span className="text-md font-semibold text-gray-700 w-[30%]">
                    {session.time}
                  </span>
                  <p className="text-gray-700 text-md">{session.title}</p>
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
