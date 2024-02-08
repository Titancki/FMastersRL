// src/routes/api/about/[id].ts
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
        // Fetch the specific about by ID
        const about = await db.about.findUnique({
          where: { id: String(id) },
        });

        if (!about) {
          return json({ error: "about not found" }, 404);
        }

        return json(about);
      } catch (error) {
        console.error(`Error fetching about with ID ${id}:`, error);
        return json({ error: 'Internal Server Error' }, 500);
      }

    case "PUT":
      // Update an existing about
      if (user.isWebMaster){
        const updateData = await request.json();
        try {
          const updatedabout = await db.about.update({
            where: { id: String(id) },
            data: updateData,
          });

          return json(updatedabout);
        } catch (error) {
          console.error(`Error updating about with ID ${id}:`, error);
          return json({ error: 'Internal Server Error' }, 500);
        }
      }
      else {
        return json ({ error: 'Access denied'}, 403)
      }
      

    case "DELETE":
      if (user.isWebMaster){
        // Delete an existing about
        await db.about.delete({
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
    // Handle PUT requests for updating an about
    const updateData = await request.json();

    try {
      if (!id) {
        return json({ error: "Invalid ID" }, 400);
      }

      const updatedabout = await db.about.update({
        where: { id: String(id) },
        data: updateData,
      });

      return json(updatedabout);
    } catch (error) {
      console.error(`Error updating about with ID ${id}:`, error);
      return json({ error: 'Internal Server Error' }, 500);
    }
  } else if (request.method === "DELETE" && user.isWebMaster) {
    // Handle DELETE requests for deleting an about
    try {
      if (!id) {
        return json({ error: "Invalid ID" }, 400);
      }

      await db.about.delete({
        where: { id: String(id) },
      });

      return json({ message: `about with ID ${id} deleted successfully` });
    } catch (error) {
      console.error(`Error deleting about with ID ${id}:`, error);
      return json({ error: 'Internal Server Error' }, 500);
    }
  }
  console.log("user is webmaster: ", user.isWebMaster)
  return json({ error: "Method not supported" }, 405);
};
