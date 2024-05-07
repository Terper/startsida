import { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { useMutation } from "@tanstack/react-query";
import useKeyStore from "../utils/useKeyStore";

//kallar på api med nyckeln och med användarens meddelande
const messageToGPT = async (key: string, message: string) => {
  const response = await fetch(
    `https://openai-ama-api-fw-teaching.rahtiapp.fi/?api_key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    }
  );

  //Errorhandling
  if (response.ok === false) {
    if (response.status === 401) {
      throw new Error("Nyckeln är ogiltig");
    }
    throw new Error("Kunde inte ansluta");
  }
  //returnerer objekt från gpt som innehåller användarens svar
  return await response.json();
};

const OpenAIWidget = () => {
  // deklarerar en variabel. useState uppdaterar sidan då variabeln endras.
  const [inputmessage, setInputmessage] = useState("");
  //Hämntar nyklarna från lokalminne
  const { keys } = useKeyStore((state) => state);

  //skapar en funktion för att kalla messageToGPT
  const mutation = useMutation({
    mutationFn: (message: string) => messageToGPT(keys.openai!, message),
  });

  //hanterar formen
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //useMutation blir kallad när formuläret blir inskickat
    mutation.mutate(inputmessage);
    // rensar inputfältet
    setInputmessage("");
  };

  return (
    <WidgetWrapper
      name={"OpenAI"}
      bgColor={"bg-gray-100"}
      borderColor={"border-gray-300"}
      isExpandable={true}
    >
      {/** ifall nyckeln finns visas formuläret */}
      {keys.openai ? (
        <div className="flex flex-col gap-2 py-2 px-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="abc"
              value={inputmessage}
              onChange={(e) => setInputmessage(e.target.value)}
              className="border border-black rounded py-1 px-2 grow"
            />
            <button
              type="submit"
              className="bg-blue-500 rounded py-1 px-4 text-white"
            >
              Fråga
            </button>
          </form>
          {/** kollar ifall statuset finns och ifall vad det är, ifall statuset är success läggs svaret från data upp på webbsidan */}
          {/** on statusen inte är error, pending eller succsess visas ingenting */}
          {mutation.status === "error" ? (
            <div>{mutation.error.message}</div>
          ) : mutation.status === "pending" ? (
            <div>Laddar...</div>
          ) : mutation.status === "success" ? (
            <div className="p-2 bg-white border border-black rounded max-h-96 overflow-scroll">
              {mutation.data.answer}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="py-2 px-4">Lägg till din nyckel i inställningarna</div>
      )}
    </WidgetWrapper>
  );
};

export default OpenAIWidget;
