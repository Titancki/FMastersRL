import { FC, useState, useEffect } from "react";
import RoundedButton from "~/components/RoundedButton";
import { About } from "~/utils/about";

export const HomeAbout: FC<{ selectedLanguage: string }> = ({ selectedLanguage }) => {
  const [abouts, setabouts] = useState<About[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/about?shown=true');
        const aboutResponse = await response.json();
        const abouts: About[] = aboutResponse.map((about: About) => ({
          ...about,
        }));
        setabouts(abouts);
      } catch (error) {
        console.error("Error fetching about:", error);
        throw new Error('Internal Server Error');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-36 items-center justify-center gap-2 md:gap-8">
          {abouts.map((about : About) => (
            <RoundedButton key={about.id} enabled={about.enabled} className="flex-grow m-2">
              {about.enabled ? (
                <a href={about.url}>
                  {selectedLanguage === 'fr' ? about.name_fr : about.name_en}
                </a>
              ) : (
                selectedLanguage === 'fr' ? about.name_fr : about.name_en
              )}
            </RoundedButton>
          ))}
        </div>
  )}
  export default HomeAbout