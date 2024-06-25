import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { auth, type DiscordUser } from "~/services/auth.server";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import HomeNetwork from "./network";
import { Network } from "~/utils/network";
import eventimage from "~/assets/events.jpg"; // Updated image path

export let loader: LoaderFunction = async ({ request }) => {
  return await auth.isAuthenticated(request);
};

const events = [
  {
    image: eventimage,
    title: "UN SUPER ÉVÉNEMENT",
    date: "18/04/2024 19:30 - 21:30",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida, odio eu commodo volutpat, eros tortor maximus lectus, ac lobortis nisi diam sit amet ante.",
    link: "https://google.com",
    linkText: "google.com",
  },
  {
    image: eventimage,
    title: "UN SUPER ÉVÉNEMENT",
    date: "18/04/2024 19:30 - 21:30",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida, odio eu commodo volutpat, eros tortor maximus lectus, ac lobortis nisi diam sit amet ante.",
    link: "https://google.com",
    linkText: "google.com",
  },
  {
    image: eventimage,
    title: "UN SUPER ÉVÉNEMENT",
    date: "18/04/2024 19:30 - 21:30",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida, odio eu commodo volutpat, eros tortor maximus lectus, ac lobortis nisi diam sit amet ante.",
    link: "https://google.com",
    linkText: "google.com",
  },
];

export default function Evenement() {
  const user = useLoaderData<DiscordUser | null>();

  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const toggleLanguage = () => {
    const newLanguage = selectedLanguage === 'fr' ? 'en' : 'fr';
    setSelectedLanguage(newLanguage);
  };

  const [isProfilDisabled, setProfilDisabled] = useState(true);
  const toggleProfil = () => {
    setProfilDisabled(!isProfilDisabled);
  };

  const [network, setNetwork] = useState<Network | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/network');
        const networkResponse = await response.json();
        setNetwork(networkResponse);
      } catch (error) {
        console.error("Error fetching network data:", error);
        throw new Error('Internal Server Error');
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <HomeNetwork selectedLanguage={selectedLanguage} changeLanguage={toggleLanguage} toogleProfil={toggleProfil} user={user} />
      <div className={`fixed right-0 md:right-5 bg-black/50 w-full h-full md:h-auto md:w-60 z-50 p-2 text-white ${isProfilDisabled ? 'hidden' : 'block'}`}>
        <div className="flex w-full justify-between">
          {user ? <span className="text-lg capitalize">{user.displayName}</span> : <></>}
          <a onClick={toggleProfil}><FontAwesomeIcon icon={faXmark} className="h-6 w-6" /></a>
        </div>
        <hr/>
        {user ? 
          <div className="my-2 flex flex-col">
            { user.isWebMaster ? <a href="/dashboard">Editer le site</a> : <></> }
            <a href="/logout">Se déconnecter</a>
          </div> : <></>
        }
      </div>
      <div>
        <div className="container mx-auto text-white">
          <h1 className="text-4xl font-semibold text-center my-8">Événements à venir</h1>
          <div className="w-full m:w-1/3 flex justify-center gap-4">
            {events.map((event, index) => (
              <div key={index} className="relative max-w-sm rounded overflow-hidden shadow-lg bg-slate-900 bg-opacity-75 rounded-t-[20px] rounded-b-[20px] text-white m-4">
                <div className="relative"> 
                <img className="w-full" src={event.image} alt={event.title} />
                 <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-1 text-white bg-red-800 bg-opacity-90 rounded-t-[20px]">
                    {event.date}
                  </div>
                  <div className="bg-red-800 h-0.5"></div>
                </div>
                <div className="px-6 py-4 ">
                  <div className="font-bold text-xl mb-2">{event.title}</div>
                  <p className="text-white text-base mt-4">
                    {event.description}
                  </p>
                  <a href={event.link} className="text-white underline mt-2 block">{event.linkText}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
