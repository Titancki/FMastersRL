// app/auth.server.ts
import { Authenticator } from "remix-auth";
import type { DiscordProfile, PartialDiscordGuild } from "remix-auth-discord";
import { DiscordStrategy } from "remix-auth-discord";
import { destroySession, sessionStorage } from "./session.server";

export interface DiscordUser {
  id: DiscordProfile["id"];
  displayName: DiscordProfile["displayName"];
  avatarUrl: string;
  email: DiscordProfile["__json"]["email"];
  accessToken: string;
  refreshToken: string | undefined;
  isWebMaster: boolean;
}

export const auth = new Authenticator<DiscordUser>(sessionStorage);

const discordStrategy = new DiscordStrategy(
  {
    clientID: "1067664592093847573",
    clientSecret: "xuWpdERlGWFOTK_SLcVzY_9VqM5Nz79I",
    callbackURL: "http://25.48.25.85:3000/auth/discord/callback",
    // Provide all the scopes you want as an array
    scope: ["identify", "guilds", "guilds.members.read", "email", "guilds"],
  },
  async ({
    accessToken,
    refreshToken,
    extraParams,
    profile,
  }): Promise<DiscordUser> => {
    /**
     * Get the user data from your DB or API using the tokens and profile
     * For example query all the user guilds
     * IMPORTANT: This can quickly fill the session storage to be too big.
     * So make sure you only return the values from the guilds (and the guilds) you actually need
     * (eg. omit the features)
     * and if that's still to big, you need to store the guilds some other way. (Your own DB)
     *
     * Either way, this is how you could retrieve the user guilds.
     */
    const guildMember = await (
      await fetch(`https://discord.com/api/v10/users/@me/guilds/1053360849118564352/member`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }) 
    )?.json();

    function checkWebMaster(){
      if(guildMember.roles.includes('1054500804112961576')){
        return true
      }
      return false
    }
    return {
      id: profile.id,
      displayName: profile.displayName,
      avatarUrl: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.__json.avatar}.png`,
      email: profile.__json.email,
      isWebMaster: checkWebMaster(),
      accessToken,
      refreshToken,
    };
  },
);

auth.use(discordStrategy);

// Logout function
export async function logout(request: Request) {
  // Use the logout function provided by the Authenticator
  await auth.logout(request, { redirectTo: "/" });
}