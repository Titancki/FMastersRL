import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <main
      className="bg-gradient-to-br from-blue-600 to-red-700 md:h-screen"
      style={{ backgroundImage: `url(${require("~/assets/bg_img.png")})`, backgroundSize: "cover" }}
    >
      <HomeNetwork selectedLanguage={selectedLanguage} changeLanguage={toogleLanguage} toogleProfil={toogleProfil} user={user} />
      <div className={`fixed right-0 md:right-5 bg-black/50 w-full h-full md:h-auto md:w-60 z-50 p-2 text-white ${isProfilDisabled ? 'hidden' : 'block'}`}>
        <div className="flex w-full justify-between">
          {user ? <span className="text-lg capitalize">{user.displayName}</span> : <></>}
          <a onClick={toogleProfil}><FontAwesomeIcon icon={faXmark} className="h-6 w-6" /></a>
        </div>
        <hr/>
        {
          user ? 
          <div className="my-2 flex flex-col">
          { user.isWebMaster ? <a href="/dashboard">Editer le site</a> : <></> }
          <a href="/logout">Se déconnecter</a>
        </div> : <></>
        }
      </div>
      <div>
        <div className="bg-black/30 text-gray-100 flex flex-wrap justify-center md:h-[calc(100vh-64px-144px)]">
          
          <div className="w-full h-full p-4 md:w-1/3 overflow-auto scrollbar-rounded">
          <h2 className="font-futura text-2xl font-bold m-4 border-solid border-b-2 border-gray-100 h-8">
          {selectedLanguage === 'fr' ? (
            <span>ANNONCE RECENTE</span>
          ) : (
            <span>RECENT ANNOUCEMENT</span>
          )}
          </h2>
            {network.show_twitter_id && (<TweetEmbed  tweetId={network.show_twitter_id} className="w-3/4 flex justify-center"/>)}
          </div>
          <div className="w-full md:w-1/3 p-4 flex items-center">
          {network.show_youtube_id && (<PlayerYT id={network.show_youtube_id} />)}
          </div>
          <HomeEvents selectedLanguage={selectedLanguage} all_event_url={network.all_events_url}/>
        </div>

        <HomeAbout selectedLanguage={selectedLanguage}/>
      </div>
    </main>
  );
}
