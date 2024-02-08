import { redirect } from "@remix-run/node";
import type { LoaderFunction, Request } from "@remix-run/node";
import { auth } from "~/services/auth.server";

export let loader: LoaderFunction = async ({ request }) => {
  return await auth.logout(request, { redirectTo: "/" });
};