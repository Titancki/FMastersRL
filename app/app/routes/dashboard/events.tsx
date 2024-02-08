// routes/events.tsx
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import Switch from '@mui/material/Switch';
import { Event } from "~/utils/event";
  
export const DashboardEvents: FC<{}> = ({}) => {
    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/events');
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, eventId: string, fieldName: string) => {
    const updatedEvents = events.map((eventItem:Event) => {
        if (eventItem.id === eventId) {
        return {
            ...eventItem,
            [fieldName]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
        };
        }
        return eventItem;
    });
    setEvents(updatedEvents);
    };

    const refreshEvents = async() => {
        try {
            const response = await fetch('/api/events');
            const eventsResponse = await response.json();
            const events: Event[] = eventsResponse.map((event: Event) => ({
              ...event
            }));
            setEvents(events);
          } catch (error) {
            console.error("Error fetching events:", error);
            throw new Error('Internal Server Error');
        }
    };
    const handleSave = async (event: Event) => {
        try {
            const updateData = {
                name_fr: event.name_fr,
                name_en: event.name_en,
                url: event.url,
                enabled: event.enabled,
                shown: event.shown,
            };
            const response = await fetch(`/api/events/${event.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
            });

            if (response.ok) {
                    await refreshEvents()
                    console.log("Data saved successfully!");
                } else {
                    console.error("Failed to save data");
                }
        } catch (error) {
            console.error("Error while saving data", error);
        }
    };
    const handleDelete = async (event:Event) => {
        try {
            const response = await fetch(`/api/events/${event.id}`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
            });
        
            if (response.ok) {
                console.log(`Event with ID ${event.id} deleted successfully!`);
                await refreshEvents();
            } else {
                console.error(`Failed to delete event with ID ${event.id}`);
            }
        } catch (error) {
            console.error(`Error while deleting event with ID ${event.id}`, error);
        }
    };

  const handleCreate = async () => {
    try {
      // Assuming you have default values for a new event
      const newEvent = {
        name_fr: "",
        name_en: "",
        url: "",
        enabled: false,
        shown: false,
      };
  
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
  
      if (response.ok) {
        console.log("Event created successfully!");
        await refreshEvents();
      } else {
        console.error("Failed to create event");
      }
    } catch (error) {
      console.error("Error while creating event", error);
    }
  };
  
  return (
    <section>
        <div className="border-l-2 border-slate-600 p-2 mb-2">
          <h1 className="text-xl text-slate-900 font-bold mb-4">Evenements</h1>
          <div className="w-full grid grid-cols-6 gap-2 bg-slate-700 text-white h-10 rounded-t-lg">
            <h2 className="m-auto">Nom (FR)</h2>
            <h2 className="m-auto">Nom (EN)</h2>
            <h2 className=" m-auto">URL (avec https://)</h2>
            <h2 className="m-auto">Actif</h2>
            <h2 className="m-auto">Visible</h2>
            <h2 className="m-auto">Action</h2>
          </div>
          {events.map((event: Event) => (
            <div key={event.id} className="w-full grid grid-cols-6 place-items-center gap-2 border-x-2 border-slate-700">
                <input
                    id={`event_frName_${event.id}`}
                    name={`event_frName_${event.id}`}
                    type="text"
                    value={event.name_fr}
                    onChange={(e) => handleInputChange(e, event.id, "name_fr")}
                    className="w-full ml-2 bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
                />
                <input
                    id={`event_enName_${event.id}`}
                    name={`event_enName_${event.id}`}
                    type="text"
                    value={event.name_en}
                    onChange={(e) => handleInputChange(e, event.id, "name_en")}
                    className="w-full ml-2 bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
                />
                <input
                    id={`event_url_${event.id}`}
                    name={`event_url_${event.id}`}
                    type="text"
                    value={event.url}
                    onChange={(e) => handleInputChange(e, event.id, "url")}
                    className="w-full ml-2 bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
                />
                <Switch id={`event_enabled_${event.id}`} checked={event.enabled} onChange={(e) => handleInputChange(e, event.id, "enabled")} />
                <Switch id={`event_shown_${event.id}`} checked={event.shown} onChange={(e) => handleInputChange(e, event.id, "shown")}/>
                <div className="flex justify-center">
                    <button type="button" onClick={() => handleSave(event)}>
                        <FontAwesomeIcon icon={faFloppyDisk} className="mx-2 text-xl text-slate-800"/>
                    </button>
                    <button type="button" onClick={() => handleDelete(event)}>
                        <FontAwesomeIcon className="text-red-600 text-xl mx-2" icon={faTrash}  />
                    </button>
                </div>
            </div>))}
          <button type="button" onClick={handleCreate} className="w-full m-auto border-2 border-slate-800 rounded-b-md bg-slate-700 text-white">
            Ajouter un évenement
          </button>
          </div>
        </section>
  );
}

export default DashboardEvents

