"use client";

import IPWidget from "@/components/IPWidget";
import WikiWidget from "@/components/WikiWidget";
import YleWidget from "@/components/YleWidget";
import useKeyStore from "@/utils/useKeyStore";
import { useState } from "react";
import { CgClose, CgOptions } from "react-icons/cg";

const Home = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { keys, setKeys } = useKeyStore((state) => state);

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const cancelSettings = () => {
    setIsSettingsOpen(false);
  };

  const updateSettings = (event: any) => {
    event.preventDefault();
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
          <CgOptions className="text-4xl opacity-50 hover:opacity-100" />
        </button>
      </header>
      <main className="p-4 flex gap-4">
        <div className="w-64 flex flex-col gap-4">
          <IPWidget></IPWidget>
        </div>
        <div className="w-[65ch] flex flex-col gap-4">
          <YleWidget></YleWidget>
          <WikiWidget></WikiWidget>
        </div>
      </main>
      <div
        className={`fixed inset-0 h-screen w-screen bg-black/50 flex items-center justify-center ${
          isSettingsOpen ? "flex" : "hidden"
        }`}
      >
        <div className="w-[65ch] bg-white rounded border border-black flex flex-col">
          <div className="border-b border-black flex justify-between">
            <span className="py-2 px-4 text-xl">Inställningar</span>
            <button className="py-2 px-4 text-xl" onClick={cancelSettings}>
              <CgClose />
            </button>
          </div>
          <form className="flex flex-col" onSubmit={updateSettings}>
            <div className="flex flex-col gap-2 px-4 py-2">
              <label htmlFor="wikipedia" className="">
                Wikipedia API Key
              </label>
              <input
                required
                type="password"
                id="wikipedia"
                name="wikipedia"
                className="border border-black rounded  py-1 px-2"
                defaultValue={keys.wikipedia}
              ></input>
            </div>
            <div className="flex flex-col gap-2 px-4 py-2">
              <label htmlFor="openweather" className="">
                Openweather API Key
              </label>
              <input
                required
                type="password"
                id="openweather"
                name="openweather"
                className="border border-black rounded  py-1 px-2"
                defaultValue={keys.openweather}
              ></input>
            </div>
            <div className="flex flex-col gap-2 px-4 py-2">
              <label htmlFor="openai" className="">
                OpenAI-AMA API Key
              </label>
              <input
                required
                type="password"
                id="openai"
                name="openai"
                className="border border-black rounded py-1 px-2"
                defaultValue={keys.openai}
              ></input>
            </div>
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
};
export default Home;
