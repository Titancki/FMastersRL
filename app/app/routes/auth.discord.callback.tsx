// app/routes/auth.discord.callback.tsx
import type { LoaderFunction } from "@remix-run/node";
import { auth } from "~/services/auth.server";

export let loader: LoaderFunction = ({ request }) => {
  return auth.authenticate("discord", request, {
    successRedirect: "/",
    failureRedirect: "/",
  });
};