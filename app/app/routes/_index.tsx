import { useOptionalUser } from "~/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTiktok, faTwitch, faTwitter, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import RoundedButton from "~/components/RoundedButton";
import france_masters_logo from "../assets/france_masters_logo.png";
import data from "../assets/data.json";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import styled from 'styled-components';

const ResetTweetStyles = styled(TwitterTweetEmbed)`
/* Reset all styling to default */
all: initial;
* {
  all: unset;
}
`;

export default function Index() {
  const user = useOptionalUser();

  const { network, last_events, about, tweet_id } = data;

  return (
    <main className="bg-gradient-to-br from-blue-600 to-red-700 md:h-screen">
      <div className="p-2 flex gap-2 justify-center md:justify-end h-24 md:h-16 w-full items-center">
        <RoundedButton>
          <a href={network.mail}><FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 align-middle" /></a>
        </RoundedButton>
        <RoundedButton>
          <a href={network.discord}><FontAwesomeIcon icon={faDiscord} className="h-6 w-6 align-middle" /></a>
        </RoundedButton>
        <RoundedButton>
          <a href={network.twitter}><FontAwesomeIcon icon={faTwitter} className="h-6 w-6 align-middle" /></a>
        </RoundedButton>
        <RoundedButton>
          <a href={network.youtube}><FontAwesomeIcon icon={faYoutube} className="h-6 w-6 align-middle" /></a>
        </RoundedButton>
        <RoundedButton>
          <a href={network.tiktok}><FontAwesomeIcon icon={faTiktok} className="h-6 w-6 align-middle" /></a>
        </RoundedButton>
        <RoundedButton>
          <a href={network.twitch}><FontAwesomeIcon icon={faTwitch} className="h-6 w-6 align-middle" /></a>
        </RoundedButton>
      </div>

      <h1 className="font-futura text-5xl font-extrabold text-gray-100 flex justify-center h-32 w-full p-4">FRANCE MASTERS</h1>

      <div className="bg-black/30 text-gray-100 py-4 px-8 flex flex-wrap justify-center md:h-[calc(100vh-64px-128px-144px)]">      
        <div className="w-full md:w-1/3">
          <h2 className="font-futura text-2xl font-bold w-full my-4 border-solid border-b-2 border-gray-100">DERNIÈRE ANNONCE</h2>
          <div className="flex justify-center">
            <ResetTweetStyles tweetId={tweet_id}/>
          </div>
        </div>
        
        <div className="hidden md:flex justify-center w-1/3">
          <img src={france_masters_logo} alt="France Masters Logo" className="md:h-[calc(100vh-64px-128px-144px-64px)]" />
        </div>

        <div className="w-full md:w-1/3">
          <h2 className="font-futura text-2xl font-bold w-full my-4 border-solid border-b-2 border-gray-100">NOS DERNIERS ÉVENTS</h2>
          <div className="flex flex-col justify-center">
            {last_events.map((event, index) => (
              <RoundedButton key={index} className="flex-grow m-2">
                <a href={event.link}>{event.name}</a>
              </RoundedButton>
            ))}
          </div>
        </div>
      </div>

      <div className="flex h-36 items-center justify-center gap-2 md:gap-8">
        {about.map((el, index) => (
          <RoundedButton key={index} className="flex md:w-1/4">
            <a href={el.link}>{el.name}</a>
          </RoundedButton>
        ))}
      </div>

    </main>
  );
}
