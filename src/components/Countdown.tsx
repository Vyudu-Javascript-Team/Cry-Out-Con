import { useState, useEffect } from 'react';
import { getCountdownData } from '../lib/sanity';

// Flag to control whether to use Sanity data or 2026 data
// Set to true to always use 2026 data, false to attempt to fetch from Sanity first
const use2026OfflineData = true;

type CountdownData = {
  eventName: string;
  eventDate: string;
  description?: string;
  isActive: boolean;
}

// Default 2026 event data
const default2026Data: CountdownData = {
  eventName: 'CryOut Con 2026',
  eventDate: '2026-04-23T00:00:00Z',
  description: 'Collaboration – "Help Is On the Way"',
  isActive: true
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [eventData, setEventData] = useState<CountdownData | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // If use2026OfflineData is true, skip Sanity fetch and use default data
        if (use2026OfflineData) {
          setEventData(default2026Data);
          return;
        }

        // Otherwise try to fetch from Sanity
        const data = await getCountdownData();
        if (data && data.isActive) {
          setEventData(data);
        } else {
          // Use default 2026 data if no data from Sanity or data is not active
          setEventData(default2026Data);
        }
      } catch (err) {
        console.error("Error loading countdown data:", err);
        // Use default 2026 data on error
        setEventData(default2026Data);
      }
    };

    fetchEventData();
  }, []);

  useEffect(() => {
    // Use default event date if eventData not available
    const eventDate = eventData?.eventDate || default2026Data.eventDate;
    
    const calculateTimeLeft = () => {
      const targetDate = new Date(eventDate);
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [eventData?.eventDate]);

  // Always render the countdown
  return (
    <div className="flex gap-3 text-pink-500">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col bg-white backdrop-blur-sm px-2 py-2 rounded-lg">
          <span className="text-3xl font-bold">{value.toString().padStart(2, '0')}</span>
          <span className="text-sm uppercase tracking-wider">{unit}</span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
