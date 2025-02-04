import { useState, useEffect } from 'react';
import { getCountdownData } from '../lib/sanity';

type CountdownData = {
  eventName: string;
  eventDate: string;
  description?: string;
  isActive: boolean;
}

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
      const data = await getCountdownData();
      setEventData(data);
    };

    fetchEventData();
  }, []);

  useEffect(() => {
    if (!eventData?.eventDate) return;
    
    const calculateTimeLeft = () => {
      const eventDate = new Date(eventData.eventDate);
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

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

  if (!eventData || !eventData.isActive) {
    return null;
  }

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
