import { FC, useState, useEffect } from "react";
import TweetEmbed from 'react-tweet-embed';
import { Network } from "~/utils/network";

export const HomeTwitter: FC<{ selectedLanguage: string, twitter_url: string }> = ({ selectedLanguage, twitter_url }) => {
    const [network, setNetwork] = useState<Network>({} as Network);
  return (
    <div className="w-full md:w-1/4 bg-slate-900 bg-opacity-50 p4">
      <div className="bg-slate-900 flex justify-center rounded-lg">
        <h2 className="text-2xl font-bold mb-4">TWITTER</h2>
      </div>
        <div className="w-full flex justify-center">
          {network.show_twitter_id && (<TweetEmbed tweetId={network.show_twitter_id} className="w-full"/>)}
        </div>
    </div>
  );
}

export default HomeTwitter