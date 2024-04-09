import { useState } from "react";
import useKeyStore, { Keys } from "./utils/useKeyStore";
import { XMarkIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import IPWidget from "./components/IPWidget";
import WeatherWidget from "./components/WeatherWidget";
import WikiWidget from "./components/WikiWidget";

const settingsForm = (keys: Keys) => [
  {
    name: "wikipedia",
    label: "Wikipedia API nyckel",
    key: keys.wikipedia,
  },
  {
    name: "openweather",
    label: "OpenWeather API nyckel",
    key: keys.openweather,
  },
  {
    name: "openai",
    label: "OpenAI-AMA API nyckel",
    key: keys.openai,
  },
];

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { keys, setKeys } = useKeyStore((state) => state);

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const cancelSettings = () => {
    setIsSettingsOpen(false);
    setKeys(keys);
  };

  const updateSettings = (event: any) => {
    event.preventDefault();
    // hämtar formulär data genom onSubmit eventet
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    setKeys(data);
    setIsSettingsOpen(false);
  };

  return (
    <>
      <header className="pt-4 px-4 flex justify-between items-center">
        <h1 className="text-4xl">Min startsida</h1>
        <button onClick={openSettings}>
          <WrenchScrewdriverIcon className="w-8 h-8 opacity-50 hover:opacity-100" />
        </button>
      </header>
      <main className="p-4 flex gap-4">
        {/* vänstra panelen */}
        <div className="w-64 flex flex-col gap-4">
          <IPWidget></IPWidget>
          <WeatherWidget></WeatherWidget>
        </div>
        {/* högra panelen */}
        <div className="w-[65ch] flex flex-col gap-4">
          <WikiWidget></WikiWidget>
        </div>
      </main>
      {/* inställnings modal, visas om isSettingsOpen är sant */}
      <div
        className={`fixed inset-0 h-screen w-screen bg-black/50 flex items-center justify-center ${
          isSettingsOpen ? "flex" : "hidden"
        }`}
      >
        <div className="w-[65ch] bg-white rounded border border-black flex flex-col">
          <div className="border-b border-black flex justify-between">
            <span className="py-2 px-4 text-xl">Inställningar</span>
            <button className="py-2 px-4 text-xl" onClick={cancelSettings}>
              <XMarkIcon />
            </button>
          </div>
          <form className="flex flex-col" onSubmit={updateSettings}>
            {/* Skapar en input för varje objekt i settingsForm */}
            {settingsForm(keys).map((field, index) => (
              <div key={index} className="flex flex-col gap-2 px-4 py-2">
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  required
                  type="password"
                  id={field.name}
                  name={field.name}
                  className="border border-black rounded  py-1 px-2"
                  defaultValue={field.key}
                ></input>
              </div>
            ))}
            <div className="py-2 px-4 border-t border-black flex justify-end gap-2">
              <button
                type="submit"
                className="bg-green-500 rounded py-1 px-4 text-white"
              >
                Spara
              </button>
              <button
                type="button"
                className="bg-red-500 rounded py-1 px-4 text-white"
                onClick={cancelSettings}
              >
                Avbryt
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
