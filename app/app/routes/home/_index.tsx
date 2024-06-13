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
      <div className="min-h-screen text-white">
        <div className="container mx-auto px-4 py-8 flex flex-wrap md:flex-nowrap space-y-8 md:space-y-0 md:space-x-8">
          
          {/* Gagnant Saison */}
          <div className="relative w-full md:w-1/4 bg-slate-900 bg-opacity-50 p4 rounded-t-[20px]">
            <div className="bg-slate-900 flex justify-center rounded-t-[20px]">
                <h2 className="text-2xl font-bold mb-4">GAGNANT SAISON 1</h2>
            </div>
              <div className="flex flex-col items-center">
                <h3 className="text-4xl font-bold mb-8 text-center">HOMYNO TSUN</h3>
                <img src={winner} alt="Logo" className="h-48 w-48" />
                <p className="text-2xl font-bold text-center">Reeyko</p>
                <p className="text-2xl font-bold text-center">xannax</p>
                <p className="text-2xl font-bold text-center mb-8">badnezz</p>
                <p className="text-center">Thornirhim</p>
                <p className="text-center">Thony</p>
              </div>
            <div className="absolute bottom-0 bg-slate-900 rounded-b-[20px] h-6"></div>
          </div>
          
          {/* Semaine 2 */}
          <div className="w-full md:w-2/4 bg-blue-700 p4 rounded-t-[20px]">
            <div className="bg-slate-900 flex justify-between items-center rounded-t-[20px] p-2">
              <FontAwesomeIcon icon={faAngleLeft} className="h-6 w-6 cursor-pointer" />
              <h2 className="text-2xl font-bold ">Semaine 2</h2>
              <FontAwesomeIcon icon={faAngleRight} className="h-6 w-6 cursor-pointer" />
            </div>
            {/* Groupes */}
            <div className="space-y-6">
              {/* Groupe A */}
              <div>
                <h3 className="text-xl font-semibold mb-1 text-center">Groupe A</h3>
                <div className="space-y-4">
                  {Array(4).fill(null).map((_, idx) => (
                    <div key={idx} className="bg-blue-950 bg-opacity-75 p-4 rounded-lg flex justify-between items-center mx-2">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-700 rounded-full"></div>
                        <div>Dignity Esports</div>
                      </div>
                      <div className="text-lg font-bold">3 - 3</div>
                      <div className="flex items-center space-x-4">
                        <div>Oserv eSport</div>
                        <div className="w-10 h-10 bg-blue-700 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Groupe B */}
              <div>
                <h3 className="text-xl font-semibold mb-1 text-center">Groupe B</h3>
                <div className="space-y-4">
                  {Array(4).fill(null).map((_, idx) => (
                    <div key={idx} className="bg-blue-950 bg-opacity-75 p-4 rounded-lg flex justify-between items-center mx-2">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-700 rounded-full"></div>
                        <div>Dignity Esports</div>
                      </div>
                      <div className="text-lg font-bold">3 - 3</div>
                      <div className="flex items-center space-x-4">
                        <div>Oserv eSport</div>
                        <div className="w-10 h-10 bg-blue-700 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <button className="mt-6 bg-blue-700 text-white py-2 px-4 rounded-lg text-center">Voir les scores</button>
          </div>

          {/* Twitter Sidebar */}
          <div className="w-full md:w-1/4 bg-slate-900 bg-opacity-50 p4 rounded-t-[20px]">
            <div className="bg-slate-900 flex justify-center rounded-t-[20px]">
              <h2 className="text-2xl font-bold mb-4">TWITTER</h2>
            </div>
            <div className="w-full flex justify-center">
              {network.show_twitter_id && (<TweetEmbed tweetId={network.show_twitter_id} className="w-full"/>)}
            </div>
          </div>
        </div>

        <HomeEvents selectedLanguage={selectedLanguage} all_event_url={network.all_events_url}/>
        <HomeAbout selectedLanguage={selectedLanguage}/>
      </div>
    </main>
  );
}