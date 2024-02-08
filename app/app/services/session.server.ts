import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["X5Zrut47mFFtFL6B3rxb2LZ1RexVoucX"],
    secure: false
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;