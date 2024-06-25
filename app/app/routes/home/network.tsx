import { faDiscord, faTwitch, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faRightToBracket, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "@remix-run/react";
import { FC, useState, useEffect } from "react";
import { Network } from "~/utils/network";
import { Link } from "react-router-dom";
import logo from "~/assets/logo.png";

export const HomeNetwork: FC<{ selectedLanguage: string, changeLanguage: any, toogleProfil: any, user: any }> = ({ selectedLanguage, changeLanguage, toogleProfil, user }) => {
  const [network, setNetwork] = useState<Network>({} as Network);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/network');
        const networkDataResponse = await response.json();
        setNetwork(networkDataResponse);
      } catch (error) {
        console.error("Error fetching network data:", error);
        throw new Error('Internal Server Error');
      }
    };

    fetchData();

    const handleScroll = () => {
      if (window.scrollY > 3) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-50 shadow-lg flex flex-col items-center mb-6 text-white transition-all ${scrolled ? 'bg-slate-900 w-full' : 'w-auto mx-5'}`}>
      <div className={`relative container mx-auto flex justify-between items-center pt-1 px-1 max-w-9xl ${scrolled ? 'mt-0 py-2' : 'mt-6'}`}>
        <div className={`bg-slate-900 container mx-auto flex justify-between items-center rounded-lg py-1 px-1 max-w-9xl ${scrolled ? 'mt-0' : 'mt-1 h-12'}`}>
          <div className={`absolute ${scrolled ? 'hidden' : '-left-14 -top-27 mt-1'}`}>
            <img src={logo} alt="Logo" className={`transition-all ${scrolled ? 'hidden' : 'h-28'}`} />
          </div>
          <div className="flex items-center space-x-2 pl-10">
            <Link to="/" className="text-lg font-semibold hover:underline">Accueil</Link>
            <div className="flex items-center space-x-4">
              <div className="w-px h-4 bg-white mx-2"></div>
            </div>
            <Link to="/events" className="ml-6 hover:underline">Événement</Link>
            <div className="flex items-center space-x-4">
              <div className="w-px h-4 bg-white mx-2"></div>
            </div>
            <Link to="/equipes" className="ml-6 hover:underline">Équipes</Link>
            <div className="flex items-center space-x-4">
              <div className="w-px h-4 bg-white mx-2"></div>
            </div>
            <Link to="/reglement" className="ml-6 hover:underline">Règlement</Link>
            <div className="flex items-center space-x-4">
              <div className="w-px h-4 bg-white mx-2"></div>
            </div>
            <Link to="/propos" className="ml-6 hover:underline">À Propos</Link>
          </div>
          <div className="flex items-center space-x-4">
            <a href={network.twitch_url} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitch} className="h-6 w-4" />
            </a>
            <a href={network.youtube_url} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} className="h-6 w-4" />
            </a>
            <a href={network.twitter_url} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faXTwitter} className="h-6 w-4" />
            </a>
            <a href={network.discord_url} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faDiscord} className="h-6 w-4" />
            </a>
            <div className="md:justify-end h-6">
              <button
                className="h-6 flex items-center space-x-1"
                onClick={changeLanguage}
              >
                <FontAwesomeIcon icon={faLanguage} className="h-6 w-4" />
                <span>{selectedLanguage === 'fr' ? 'EN' : 'FR'}</span>
              </button>
            </div>
            {
              user ?
                <button onClick={toogleProfil}>
                  <img src={user.avatarUrl} className="h-6 w-4 rounded-full border-2 border-white mr-1" />
                </button> :
                <Form action="/auth/discord" method="post">
                  <button className="h-6 w-4 flex items-center space-x-1">
                    <FontAwesomeIcon icon={faRightToBracket} className="h-6 w-4" />
                  </button>
                </Form>
            }
          </div>
        </div>
      </div>
      <div className={` mx-auto flex h-2 overflow-hidden ${scrolled ? 'w-full' : 'container max-w-9xl rounded-b-full'}`}>
        <div className="w-1/3 bg-blue-600"></div>
        <div className="w-1/3 bg-white"></div>
        <div className="w-1/3 bg-red-600"></div>
      </div>
    </div>
  );
};

export default HomeNetwork;