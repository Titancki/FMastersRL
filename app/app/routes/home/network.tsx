import { faDiscord, faTiktok, faTwitch, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGlobe, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "@remix-run/react";
import { FC, useState, useEffect } from "react";
import RoundedButton from "~/components/RoundedButton";
import { Network } from "~/utils/network";
import logo from "~/assets/logo.png";


export const HomeNetwork : FC<{selectedLanguage:string, changeLanguage:any, toogleProfil:any, user:any}> = ({selectedLanguage, changeLanguage, toogleProfil, user}) => {
  const [network, setNetwork] = useState<Network>({} as Network);

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
  }, []);

  return (
    <div className="p-2 flex md:justify-between gap-2 h-20 md:h-16 w-screen items-center border-solid border-b-2 border-gray-100 md:border-0">
      <div className="justify-start flex wrap items-center">
        <img src={logo} className="hide md:block h-16 p-2 w-16"/>
        <h1 className="hide md:block font-futura text-3xl font-extrabold text-gray-100">FRANCE MASTERS</h1>
      </div>
          
        <div className="flex gap-2 justify-center md:justify-end items-center">
          <RoundedButton
            enabled={true}
            className="h-9"
            onClick={changeLanguage}
          >
            <FontAwesomeIcon icon={faGlobe} className="h-4 w-4 mr-1" />{selectedLanguage === 'fr' ? 'EN' : 'FR'}
          </RoundedButton>
          {network.mail && (<RoundedButton enabled={true} className="h-9">
            <a href={network.mail} className="align-middle"><FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" /></a>
          </RoundedButton>)}
          {network.discord_url && (<RoundedButton enabled={true} className="h-9">
            <a href={network.discord_url} className="align-middle"><FontAwesomeIcon icon={faDiscord} className="h-4 w-4" /></a>
          </RoundedButton>)}
          {network.twitter_url && (<RoundedButton enabled={true} className="h-9">
            <a href={network.twitter_url} className="align-middle"><FontAwesomeIcon icon={faXTwitter} className="h-4 w-4" /></a>
          </RoundedButton>)}
          {network.youtube_url && (<RoundedButton enabled={true} className="h-9">
            <a href={network.youtube_url} className="align-middle"><FontAwesomeIcon icon={faYoutube} className="h-4 w-4" /></a>
          </RoundedButton>)}
          {network.tiktok_url && (<RoundedButton enabled={true} className="h-9">
            <a href={network.tiktok_url} className="align-middle"><FontAwesomeIcon icon={faTiktok} className="h-4 w-4" /></a>
          </RoundedButton>)}
          {network.twitch_url && (<RoundedButton enabled={true} className="h-9">
            <a href={network.twitch_url} className="align-middle"><FontAwesomeIcon icon={faTwitch} className="h-4 w-4" /></a>
          </RoundedButton>)}
          {user ? 
            <button onClick={toogleProfil}><img src={user.avatarUrl} className="h-9 w-9 rounded-full border-2 border-white" /></button> : 
            <Form action="/auth/discord" method="post">
              <button className="h-9 w-9 rounded-full border-2 border-white"><FontAwesomeIcon icon={faRightToBracket} className="h-4 w-4 align-middle" /></button>
            </Form>
          }
        </div>
      </div>

  )}

  export default HomeNetwork