// app/routes/dashboard.tsx
import { auth } from "~/services/auth.server";
import { redirect, type LoaderFunction } from "@remix-run/node"; // or cloudflare/deno
import DashboardEvents from "./events";
import  DashboardNetwork from "./network";
import DashboardAbout from "./about";

export const loader: LoaderFunction = async ({request, params}) => {
  const user =  await auth.isAuthenticated(request)
  if (!user?.isWebMaster) return redirect("/", 403)
  return null
};

export default function DashboardPage() {

  return (
    <div className="flex flex-wrap h-full">
      <div className="h-full w-60 bg-slate-800 text-white p-4 flex flex-col">
        <a href="/"><h1 className="text-lg">France Master</h1></a>
        <hr className="mb-4"/>
        <a>Twitter</a>
        <a>Réseaux</a>
        <a>A propos</a>
        <a>Events</a>
        <a>Team</a>
      </div>
      <div className="h-full bg-slate-300 grow p-4">
        <DashboardNetwork/>
        <DashboardEvents/>
        <DashboardAbout/>
      </div>
      
    </div>
  );
}
