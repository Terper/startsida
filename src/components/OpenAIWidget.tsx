import { useState } from "react";
import WidgetWrapper from "./WidgetWrapper"
import { useMutation } from "@tanstack/react-query";
import useKeyStore from "../utils/useKeyStore";




const messageToGPT = async (key: string, message: string) => {
    const response = await fetch(`https://openai-ama-api-fw-teaching.rahtiapp.fi/?api_key=${key}&simulation=1`, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        prompt: message
    })
    })
    const data = await response.json();
    return data;
}


const OpenAIWidget = () => {

    const [inputmessage, setInputmessage] = useState("");
    const {keys} = useKeyStore((state) => state)
    const mutation = useMutation({
       mutationFn: (message: string) => messageToGPT(keys.openai!, message)
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate(inputmessage);
    }


    return <WidgetWrapper 
    name={"OpenAI"} 
    bgColor={"bg-red-100"} 
    borderColor={"border-red-300"} 
    isExpandable={true}
    >
        <div>
            <ul>
                <li>Ask me anything</li>
                
            </ul>
        </div>

        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="abc" value={inputmessage} onChange={(e) => setInputmessage(e.target.value)}/>
                <button>submit</button>
            </form>
        </div>
    </WidgetWrapper>
}

export default OpenAIWidget