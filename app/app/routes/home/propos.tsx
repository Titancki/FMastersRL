import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { auth, type DiscordUser } from "~/services/auth.server";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
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

      <div className="flex flex-col items-center">
        <a className="text-4xl font-semibold text-white mt-8">Bienvenue sur le site des FranceMaster</a>
        <p className="text-white text-center mt-4">Nous somme une association qui à étais créé en janvier 2023. Nous avons créé ce projet à fain de développer la scène esports sur le jeu Rocket League.</p>
      </div>
      <div className="flex flex-col items-center">
        <a className="text-4xl font-semibold text-white mt-8">Sponsor</a>
        <p className="text-white text-center mt-4">/</p>
      </div>
        <div className="flex flex-col items-center">
            <a className="text-4xl font-semibold text-white mt-8">Staff</a>
            <p className="text-white text-center mt-4">/</p>
        </div>
    </main>
  );
}