import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TweetEmbed from 'react-tweet-embed';
import { useEffect, useState } from "react";
import { auth, type DiscordUser } from "~/services/auth.server";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import PlayerYT from "~/components/PlayerYT";
import HomeEvents from "~/routes/home/events";
import HomeAbout from "./about";
import HomeNetwork from "./network";
import { Network } from "~/utils/network";
import HomeTwitter from "./twitter";
import winner from "~/assets/Homyno_Tsun.png"
import vs from "~/assets/S.svg"

export let loader: LoaderFunction = async ({ request }) => {
  return await auth.isAuthenticated(request);
};

export default function Index() {
  const user = useLoaderData<DiscordUser>();

  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const toogleLanguage = () => {
    const newLanguage = selectedLanguage === 'fr' ? 'en' : 'fr';
    setSelectedLanguage(newLanguage);
  };

  const [isProfilDisabled, setProfilDisabled] = useState(true);
  const toogleProfil = () => {
    setProfilDisabled(!isProfilDisabled);
  };

  const [network, setnetwork] = useState<Network>({} as Network);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/network');
        const networkResponse = await response.json();
        setnetwork(networkResponse);
      } catch (error) {
        console.error("Error fetching network data:", error);
        throw new Error('Internal Server Error');
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <HomeNetwork selectedLanguage={selectedLanguage} changeLanguage={toogleLanguage} toogleProfil={toogleProfil} user={user} />
      <div className={`fixed right-0 md:right-5 bg-black/50 w-full h-full md:h-auto md:w-60 z-50 p-2 text-white ${isProfilDisabled ? 'hidden' : 'block'}`}>
        <div className="flex w-full justify-between">
          {user ? <span className="text-lg capitalize">{user.displayName}</span> : <></>}
          <a onClick={toogleProfil}><FontAwesomeIcon icon={faXmark} className="h-6 w-6" /></a>
        </div>
        <hr/>
        {user ? 
          <div className="my-2 flex flex-col">
            { user.isWebMaster ? <a href="/dashboard">Editer le site</a> : <></> }
            <a href="/logout">Se déconnecter</a>
          </div> : <></>
        }
      </div>
    </main>
  );
}