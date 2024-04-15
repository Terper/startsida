import { useState } from "react";
import WidgetWrapper from "./WidgetWrapper"
import { useMutation } from "@tanstack/react-query";
import useKeyStore from "../utils/useKeyStore";



//kallar på api med nyckeln och med användarens meddelande
const messageToGPT = async (key: string, message: string) => {
    const response = await fetch(`https://openai-ama-api-fw-teaching.rahtiapp.fi/?api_key=${key}&simulation=1`, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            prompt: message
        })
    })

//Errorhandling
    if (response.ok === false) {
        if (response.status === 401) {
            throw new Error("Nyckeln är ogiltig")
        }
        throw new Error("Kunde inte ansluta")
    }
//returnerer objekt från gpt som innehåller användarens svar
    return await response.json();
}

const OpenAIWidget = () => {
    // deklarerar en variabel. useState uppdaterar sidan då variabeln endras.
    const [inputmessage, setInputmessage] = useState("");
    //Hämntar nyklarna från lokalminne
    const {keys} = useKeyStore((state) => state)
    
    //skapar en funktion för att kalla messageToGPT
    const mutation = useMutation({
       mutationFn: (message: string) => messageToGPT(keys.openai!, message)
    })

    //hanterar formen
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //useMutation blir kallad när formuläret blir inskickat 
        mutation.mutate(inputmessage);
    }

    return <WidgetWrapper 
    name={"OpenAI"} 
    bgColor={"bg-red-100"} 
    borderColor={"border-red-300"} 
    isExpandable={true}
    >
        {/** ifall nyckeln finns visas formuläret */}
        {keys.openai ? (
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="abc" value={inputmessage} onChange={(e) => setInputmessage(e.target.value)}/>
                    <button type="submit">submit</button>
                </form>
                <div>
                    {/** kollar ifall statuset finns och ifall vad det är, ifall statuset är success läggs svaret från data upp på webbsidan */}
                    {/** on statusen inte är error, pending eller succsess visas ingenting */}
                    {mutation.status === "error" ? (
                        <div>{mutation.error.message}</div>
                    ) : mutation.status === "pending" ? (
                        <div>Laddar...</div>
                    ) : mutation.status === "success" ? (
                        <div>{mutation.data.answer}</div>
                    ) : (
                        <></>
                    )}
                </div>

            </div>
            ) : (
                <div>Lägg till din nyckel i inställningarna</div>
            )}
    </WidgetWrapper>
}

export default OpenAIWidget