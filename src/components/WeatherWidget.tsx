"use client";

import { GetIP } from "@/types/GetIp";
import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useState } from "react";
import WidgetLoader from "./WidgetLoader";
import WidgetError from "./WidgetError";
import WidgetWrapper from "./WidgetWrapper";
import { GetWeather } from "@/types/GetWeather";
import useKeyStore from "@/utils/useKeyStore";
import useCoordsStore, { Coords } from "@/utils/useCoordsStore";

type Props = {};

const getWeather = async (
  key: string | undefined,
  coords: Coords | undefined,
  setName: Dispatch<SetStateAction<string>>
) => {
  // returnerar tidigt ifall API nyckeln inte är satt
  if (key === undefined) {
    throw new Error("Lägg till din API nyckel i inställningarna");
  }

  // returnerar tidigt ifall koordinaterna inte finns
  if (coords?.lat === undefined && coords?.lon === undefined) {
    throw new Error("Kunde inte hämta data");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${key}&lang=sv&units=metric`
  );

  // svarar 401 ifall nyckeln är ogiltig
  if (!response.ok) {
    if (response.status === 401) throw new Error("Nyckeln är ogiltig");
    throw new Error("Kunde inte ansluta");
  }

  const json = await response.json();

  // inkluderar staden i namnet på widgeten
  setName(`Vädret i ${json.name}`);
  return json;
};

const WeatherWidget = (props: Props) => {
  const [name, setName] = useState("Vädret");
  const keys = useKeyStore((state) => state.keys);
  const coords = useCoordsStore((state) => state.coords);
  const { data, status, error, refetch } = useQuery<GetWeather>({
    queryKey: ["getWeather"],
    queryFn: () => getWeather(keys.openweather, coords, setName),
    enabled: !!coords, // körs bara ifall koordinatera finns sparade
  });

  return (
    <WidgetWrapper
      name={name}
      bgColor={"bg-red-100"}
      borderColor={"border-red-300"}
      isExpandable={false}
    >
      {status === "error" ? (
        <WidgetError message={error.message} refetch={refetch}></WidgetError>
      ) : status === "pending" ? (
        <WidgetLoader></WidgetLoader>
      ) : (
        <div className="flex items-center">
          <img
            className="w-16 h-16"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={`Bild på ${data.weather[0].description}`}
          ></img>
          <div className="flex flex-col py-2">
            <span>
              {data.main.temp}°C, N {data.wind.speed} m/s
            </span>
            <span className="first-letter:capitalize">
              {data.weather[0].description}
            </span>
          </div>
        </div>
      )}
    </WidgetWrapper>
  );
};

export default WeatherWidget;
