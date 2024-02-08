// src/routes/api/events/[id].ts
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { db } from "~/db.server";
import { auth } from "~/services/auth.server";

let user = <any>{}

export let loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  user = await auth.isAuthenticated(request)

  // Handle different HTTP methods (GET, PUT, DELETE)
  switch (request.method) {
    case "GET":
      try {
        // Fetch the specific event by ID
        const event = await db.event.findUnique({
          where: { id: String(id) },
        });

        if (!event) {
          return json({ error: "Event not found" }, 404);
        }

        return json(event);
      } catch (error) {
        console.error(`Error fetching event with ID ${id}:`, error);
        return json({ error: 'Internal Server Error' }, 500);
      }

    case "PUT":
      // Update an existing event
      if (user.isWebMaster){
        const updateData = await request.json();
        try {
          const updatedEvent = await db.event.update({
            where: { id: String(id) },
            data: updateData,
          });

          return json(updatedEvent);
        } catch (error) {
          console.error(`Error updating event with ID ${id}:`, error);
          return json({ error: 'Internal Server Error' }, 500);
        }
      }
      else {
        return json ({ error: 'Access denied'}, 403)
      }
      

    case "DELETE":
      if (user.isWebMaster){
        // Delete an existing event
        await db.event.delete({
          where: { id: String(id) },
        });
        return redirect("/dashboard");
      }
      else {
        return json ({ error: 'Access denied'}, 403)
      }

    default:
      return json({ error: "Method not supported" }, 405);
  }
};

export let action = async ({ request, params }: { request: Request; params: { id: string } }) => {
  const { id } = params;
  user = await auth.isAuthenticated(request)
  if (request.method === "PUT" && user.isWebMaster) {
    // Handle PUT requests for updating an event
    const updateData = await request.json();

    try {
      if (!id) {
        return json({ error: "Invalid ID" }, 400);
      }

      const updatedEvent = await db.event.update({
        where: { id: String(id) },
        data: updateData,
      });

      return json(updatedEvent);
    } catch (error) {
      console.error(`Error updating event with ID ${id}:`, error);
      return json({ error: 'Internal Server Error' }, 500);
    }
  } else if (request.method === "DELETE" && user.isWebMaster) {
    // Handle DELETE requests for deleting an event
    try {
      if (!id) {
        return json({ error: "Invalid ID" }, 400);
      }

      await db.event.delete({
        where: { id: String(id) },
      });

      return json({ message: `Event with ID ${id} deleted successfully` });
    } catch (error) {
      console.error(`Error deleting event with ID ${id}:`, error);
      return json({ error: 'Internal Server Error' }, 500);
    }
  }
  console.log("user is webmaster: ", user.isWebMaster)
  return json({ error: "Method not supported" }, 405);
};
