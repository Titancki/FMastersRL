// src/routes/api/about/_index.ts
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
                const abouts = await db.about.findMany({
                    where: {shown: true},
                  });
                  return json(abouts);
            }
            else {
                const abouts = await db.about.findMany();
                return json(abouts);
            }
        } catch (error) {
          console.error("Error fetching abouts:", error);
          return json({ error: 'Internal Server Error' }, 500);
        }
      }

};

export let action = async ({ request }: { request: Request }) => {
  user = await auth.isAuthenticated(request)
    if (request.method === "GET") {
      // Handle GET requests for fetching all abouts
      try {
        const abouts = await db.about.findMany();
        return json(abouts);
      } catch (error) {
        console.error("Error fetching abouts:", error);
        return json({ error: 'Internal Server Error' }, 500);
      }
    } else if (request.method === "POST" && user.isWebMaster) {
      // Handle POST requests for creating a new about
      try {
        const newaboutData = await request.json();
  
        const newabout = await db.about.create({
          data: newaboutData,
        });
  
        return json(newabout);
      } catch (error) {
        console.error("Error creating about:", error);
        return json({ error: 'Internal Server Error' }, 500);
      }
    }
  
    return json({ error: "Method not supported" }, 405);
  };
  