// src/routes/api/events/_index.ts
import { json, LoaderFunction } from "@remix-run/node";
import { db } from "~/db.server";
import { auth } from "~/services/auth.server";

let user = <any>{}

export let loader: LoaderFunction = async ({request, params}) => {
  user = await auth.isAuthenticated(request)
    if (request.method === "GET") {
        try {
            const url = new URL(request.url)
            const shown = url.searchParams.get('shown')
            if (shown == "true"){
                const events = await db.event.findMany({
                    where: {shown: true},
                  });
                  return json(events);
            }
            else {
                const events = await db.event.findMany();
                return json(events);
            }
        } catch (error) {
          console.error("Error fetching events:", error);
          return json({ error: 'Internal Server Error' }, 500);
        }
      }

};

export let action = async ({ request }: { request: Request }) => {
  user = await auth.isAuthenticated(request)
    if (request.method === "GET") {
      // Handle GET requests for fetching all events
      try {
        const events = await db.event.findMany();
        return json(events);
      } catch (error) {
        console.error("Error fetching events:", error);
        return json({ error: 'Internal Server Error' }, 500);
      }
    } else if (request.method === "POST" && user.isWebMaster) {
      // Handle POST requests for creating a new event
      try {
        const newEventData = await request.json();
  
        const newEvent = await db.event.create({
          data: newEventData,
        });
  
        return json(newEvent);
      } catch (error) {
        console.error("Error creating event:", error);
        return json({ error: 'Internal Server Error' }, 500);
      }
    }
  
    return json({ error: "Method not supported" }, 405);
  };
  