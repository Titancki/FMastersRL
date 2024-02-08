// src/routes/api/network/_index.ts
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { db } from "~/db.server";
import { auth } from "~/services/auth.server";

let user: any = {};

export let loader: LoaderFunction = async ({ request }) => {
  const id:string = "65b2493a62a56942208f86de";
  user = await auth.isAuthenticated(request);

  // Handle different HTTP methods (GET, PUT)
  switch (request.method) {
    case "GET":
      try {
        // Fetch the specific network data by ID
        const networkData = await db.network.findUnique({
          where: { id: String(id) },
        });

        if (!networkData) {
          return json({ error: "network data not found" }, 404);
        }

        return json(networkData);
      } catch (error) {
        console.error(`Error fetching network data with ID ${id}:`, error);
        return json({ error: 'Internal Server Error' }, 500);
      }

    case "PUT":
      // Update existing network data
      if (user.isWebMaster) {
        const updateData = await request.json();
        try {
          const updatedNetworkData = await db.network.update({
            where: { id: String(id) },
            data: updateData,
          });

          return json(updatedNetworkData);
        } catch (error) {
          console.error(`Error updating network data with ID ${id}:`, error);
          return json({ error: 'Internal Server Error' }, 500);
        }
      } else {
        return json({ error: 'Access denied' }, 403);
      }

    default:
      return json({ error: "Method not supported" }, 405);
  }
};

export let action = async ({ request }: { request: Request }) => {
  const id = "65b2493a62a56942208f86de";
  user = await auth.isAuthenticated(request);

  if (request.method === "PUT" && user.isWebMaster) {
    // Handle PUT requests for updating network data
    const updateData = await request.json();

    try {
      if (!id) {
        return json({ error: "Invalid ID" }, 400);
      }

      const updatedNetworkData = await db.network.update({
        where: { id: String(id) },
        data: updateData,
      });

      return json(updatedNetworkData);
    } catch (error) {
      console.error(`Error updating network data with ID ${id}:`, error);
      return json({ error: 'Internal Server Error' }, 500);
    }
  }

  return json({ error: "Method not supported" }, 405);
};
