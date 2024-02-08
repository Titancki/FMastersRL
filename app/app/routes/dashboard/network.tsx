// routes/network.tsx
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Network } from "~/utils/network";

export const DashboardNetwork = () => {
  const [network, setnetwork] = useState<Network>();

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (network) {
      const updatednetwork = {
        ...network,
        [fieldName]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
      };
      setnetwork(updatednetwork);
    }
  };

  const handleSave = async () => {
    try {
      if (network) {
        const updateData = {
          twitter_url: network.twitter_url,
          discord_url: network.discord_url,
          youtube_url: network.youtube_url,
          tiktok_url: network.tiktok_url,
          twitch_url: network.twitch_url,
          mail: network.mail,
          show_youtube_id: network.show_youtube_id,
          show_twitter_id: network.show_twitter_id,
          all_events_url: network.all_events_url,
        };
        
        const response = await fetch('/api/network', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (response.ok) {
          console.log("Data saved successfully!");
        } else {
          console.error("Failed to save data");
        }
      }
    } catch (error) {
      console.error("Error while saving data", error);
    }
  };

  return (
    <section>
      <div className="border-l-2 border-slate-600 p-2 mb-2 w-full">
        <h1 className="text-xl text-slate-900 font-bold mb-4">Informations</h1>
        <div className="flex w-full">
        {network && (
          <div className="grow">

            <div className="flex w-full m-auto border-slate-600">
              <div className="bg-slate-700 text-white h-10 w-48 pl-2 rounded-tl-lg">
                <h2 className="my-2">Twitter URL</h2>
              </div>
              <input
                id="twitter_url"
                name="twitter_url"
                type="text"
                value={network.twitter_url}
                onChange={(e) => handleInputChange(e, "twitter_url")}
                className="w-full ml-2 grow bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
              />
            </div>
  
            <div className="flex w-full m-auto border-slate-600">
              <div className="bg-slate-700 text-white h-10 w-48 pl-2">
                <h2 className="my-2">Discord URL</h2>
              </div>
              <input
                id="discord_url"
                name="discord_url"
                type="text"
                value={network.discord_url}
                onChange={(e) => handleInputChange(e, "discord_url")}
                className="w-full ml-2 grow bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
              />
            </div>
  
            <div className="flex w-full m-auto border-slate-600">
              <div className="bg-slate-700 text-white h-10 w-48 pl-2">
                <h2 className="my-2">YouTube URL</h2>
              </div>
              <input
                id="youtube_url"
                name="youtube_url"
                type="text"
                value={network.youtube_url}
                onChange={(e) => handleInputChange(e, "youtube_url")}
                className="w-full ml-2 grow bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
              />
            </div>
  
            <div className="flex w-full m-auto border-slate-600">
              <div className="bg-slate-700 text-white h-10 w-48 pl-2">
                <h2 className="my-2">TikTok URL</h2>
              </div>
              <input
                id="tiktok_url"
                name="tiktok_url"
                type="text"
                value={network.tiktok_url}
                onChange={(e) => handleInputChange(e, "tiktok_url")}
                className="w-full ml-2 grow bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
              />
            </div>
  
            <div className="flex w-full  m-auto border-slate-600">
              <div className="bg-slate-700 text-white h-10 w-48 pl-2">
                <h2 className="my-2">Twitch URL</h2>
              </div>
              <input
                id="twitch_url"
                name="twitch_url"
                type="text"
                value={network.twitch_url}
                onChange={(e) => handleInputChange(e, "twitch_url")}
                className="w-full ml-2 grow bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
              />
            </div>
  
            <div className="flex w-full m-auto border-slate-600">
              <div className="bg-slate-700 text-white h-10 w-48 pl-2">
                <h2 className="my-2">Mail</h2>
              </div>
              <input
                id="mail"
                name="mail"
                type="text"
                value={network.mail}
                onChange={(e) => handleInputChange(e, "mail")}
                className="w-full ml-2 grow bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
              />
            </div>
  
            <div className="flex w-full m-auto border-slate-600">
              <div className="bg-slate-700 text-white h-10 w-48 pl-2">
                <h2 className="my-2">Show YouTube ID</h2>
              </div>
              <input
                id="show_youtube_id"
                name="show_youtube_id"
                type="text"
                value={network.show_youtube_id}
                onChange={(e) => handleInputChange(e, "show_youtube_id")}
                className="w-full ml-2 grow bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
              />
            </div>
  
            <div className="flex w-full m-auto border-slate-600">
              <div className="bg-slate-700 text-white h-10 w-48 pl-2">
                <h2 className="my-2">Show Twitter ID</h2>
              </div>
              <input
                id="show_twitter_id"
                name="show_twitter_id"
                type="text"
                value={network.show_twitter_id}
                onChange={(e) => handleInputChange(e, "show_twitter_id")}
                className="w-full ml-2 grow bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
              />
            </div>
  
            <div className="flex w-full m-auto border-slate-600">
              <div className="bg-slate-700 text-white h-10 w-48 pl-2 rounded-bl-lg">
                <h2 className="my-2">All Events URL</h2>
              </div>
              <input
                id="all_events_url"
                name="all_events_url"
                type="text"
                value={network.all_events_url}
                onChange={(e) => handleInputChange(e, "all_events_url")}
                className="w-full ml-2 grow bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
              />
            </div>
          </div>)}
  
          <button type="button" onClick={handleSave} className="max-w-24 bg-slate-700 w-24 rounded-r-lg">
            <FontAwesomeIcon icon={faFloppyDisk} className="mx-2 text-xl text-white" />
          </button>
        </div>
      </div>
    </section>
  );
  
}

export default DashboardNetwork;
