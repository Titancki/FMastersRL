import { useLoaderData } from "@remix-run/react";
import { FC, useState, useEffect } from "react";
import RoundedButton from "~/components/RoundedButton";
import { Event } from "~/utils/event";

export const HomeEvents: FC<{ selectedLanguage: string, all_event_url: string }> = ({ selectedLanguage, all_event_url }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/events?shown=true');
        const eventsResponse = await response.json();
        const events: Event[] = eventsResponse.map((event: Event) => ({
          ...event,
        }));
        setEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error('Internal Server Error');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full md:w-1/3">
      <h2 className="font-futura text-2xl font-bold m-4 border-solid border-b-2 border-gray-100 h-8">
        {selectedLanguage === 'fr' ? (
          <span>DERNIERS ÉVENEMENTS</span>
        ) : (
          <span>LAST EVENTS</span>
        )}
      </h2>
      <div className="flex flex-col justify-center">
        <div className="grid grid-col md:grid-cols-2 ">
          {events.map((event: Event) => (
            <RoundedButton key={event.id} enabled={event.enabled} className="flex-grow m-2">
              {event.enabled ? (
                <a href={event.url}>
                  {selectedLanguage === 'fr' ? event.name_fr : event.name_en}
                </a>
              ) : (
                selectedLanguage === 'fr' ? event.name_fr : event.name_en
              )}
            </RoundedButton>
          ))}
        </div>
        {all_event_url && (<RoundedButton enabled={true} className="m-2">
          <a href={all_event_url}>
            {selectedLanguage === 'fr' ? (
              <span>Voir tout nos évenements</span>
            ) : (
              <span>See all events</span>
            )}
          </a>
        </RoundedButton>)}
      </div>
    </div>
  );
};

export default HomeEvents;
