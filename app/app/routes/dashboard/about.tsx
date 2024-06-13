// routes/about.tsx
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import Switch from '@mui/material/Switch';
import { About } from "~/utils/about";  

export const DashboardAbout: FC<{}> = ({}) => {
    const [abouts, setabouts] = useState<About[]>([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/about');
          const aboutsResponse = await response.json();
          const abouts: About[] = aboutsResponse.map((About: About) => ({
            ...About,
          }));
          setabouts(abouts);
        } catch (error) {
          console.error("Error fetching abouts:", error);
          throw new Error('Internal Server Error');
        }
      };
  
      fetchData();
    }, []);

    const handleInputChange = (About: React.ChangeEvent<HTMLInputElement>, AboutId: string, fieldName: string) => {
    const updatedabouts = abouts.map((AboutItem:About) => {
        if (AboutItem.id === AboutId) {
        return {
            ...AboutItem,
            [fieldName]: About.target.type === "checkbox" ? About.target.checked : About.target.value,
        };
        }
        return AboutItem;
    });
    setabouts(updatedabouts);
    };

    const refreshabouts = async() => {
        try {
            const response = await fetch('/api/about');
            const aboutsResponse = await response.json();
            const abouts: About[] = aboutsResponse.map((About: About) => ({ 
              ...About
            }));
            setabouts(abouts);
          } catch (error) {
            console.error("Error fetching abouts:", error);
            throw new Error('Internal Server Error');
        }
    };
    const handleSave = async (About: About) => {
        try {
            const updateData = {
                name_fr: About.name_fr,
                name_en: About.name_en,
                url: About.url,
                enabled: About.enabled,
                shown: About.shown,
            };
            const response = await fetch(`/api/about/${About.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
            });

            if (response.ok) {
                    await refreshabouts()
                    console.log("Data saved successfully!");
                } else {
                    console.error("Failed to save data");
                }
        } catch (error) {
            console.error("Error while saving data", error);
        }
    };
    const handleDelete = async (About:About) => {
        try {
            const response = await fetch(`/api/about/${About.id}`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
            });
        
            if (response.ok) {
                console.log(`About with ID ${About.id} deleted successfully!`);
                await refreshabouts();
            } else {
                console.error(`Failed to delete About with ID ${About.id}`);
            }
        } catch (error) {
            console.error(`Error while deleting About with ID ${About.id}`, error);
        }
    };

  const handleCreate = async () => {
    try {
      // Assuming you have default values for a new About
      const newAbout = {
        name_fr: "",
        name_en: "",
        url: "",
        enabled: false,
        shown: false,
      };
  
      const response = await fetch("/api/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAbout),
      });
  
      if (response.ok) {
        console.log("About created successfully!");
        await refreshabouts();
      } else {
        console.error("Failed to create About");
      }
    } catch (error) {
      console.error("Error while creating About", error);
    }
  };
  
  return (
    <section>
        <div className="border-l-2 border-slate-600 p-2 mb-2">
          <h1 className="text-xl text-slate-900 font-bold mb-4">A propos</h1>
          <div className="w-full grid grid-cols-6 gap-2 bg-slate-700 text-white h-10 rounded-t-lg">
            <h2 className="m-auto">Nom (FR)</h2>
            <h2 className="m-auto">Nom (EN)</h2>
            <h2 className=" m-auto">URL (avec https://)</h2>
            <h2 className="m-auto">Actif</h2>
            <h2 className="m-auto">Visible</h2>
            <h2 className="m-auto">Action</h2>
          </div>
          {abouts.map((About: About) => (
            <div key={About.id} className="w-full grid grid-cols-6 place-items-center gap-2 border-x-2 border-slate-700">
                <input
                    id={`About_frName_${About.id}`}
                    name={`About_frName_${About.id}`}
                    type="text"
                    value={About.name_fr}
                    onChange={(e) => handleInputChange(e, About.id, "name_fr")}
                    className="w-full ml-2 bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
                />
                <input
                    id={`About_enName_${About.id}`}
                    name={`About_enName_${About.id}`}
                    type="text"
                    value={About.name_en}
                    onChange={(e) => handleInputChange(e, About.id, "name_en")}
                    className="w-full ml-2 bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
                />
                <input
                    id={`About_url_${About.id}`}
                    name={`About_url_${About.id}`}
                    type="text"
                    value={About.url}
                    onChange={(e) => handleInputChange(e, About.id, "url")}
                    className="w-full ml-2 bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-slate-800"
                />
                <Switch id={`About_enabled_${About.id}`} checked={About.enabled} onChange={(e) => handleInputChange(e, About.id, "enabled")} />
                <Switch id={`About_shown_${About.id}`} checked={About.shown} onChange={(e) => handleInputChange(e, About.id, "shown")}/>
                <div className="flex justify-center">
                    <button type="button" onClick={() => handleSave(About)}>
                        <FontAwesomeIcon icon={faFloppyDisk} className="mx-2 text-xl text-slate-800"/>
                    </button>
                    <button type="button" onClick={() => handleDelete(About)}>
                        <FontAwesomeIcon className="text-red-600 text-xl mx-2" icon={faTrash}  />
                    </button>
                </div>
            </div>))}
          <button type="button" onClick={handleCreate} className="w-full m-auto border-2 border-slate-800 rounded-b-md bg-slate-700 text-white">
            Ajouter un élément
          </button>
          </div>
        </section>
  );
}

export default DashboardAbout

