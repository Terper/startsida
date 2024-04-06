"use client";

import { GetIP } from "@/types/GetIp";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import WidgetLoader from "./WidgetLoader";
import WidgetError from "./WidgetError";
import WidgetWrapper from "./WidgetWrapper";

type Props = {};

const getIp = async () => {
  const response = await fetch("https://ipapi.co/json/");
  if (!response.ok) throw new Error("Tjänst ur funktion");
  return await response.json();
};

const IPWidget = (props: Props) => {
  const { data, status, error, refetch } = useQuery<GetIP>({
    queryKey: ["getIp"],
    queryFn: getIp,
  });

  return (
    <WidgetWrapper
      name={"Min ip"}
      bgColor={"bg-blue-100"}
      borderColor={"border-blue-200"}
      isExpandable={false}
    >
      {status === "error" ? (
        <WidgetError message={error.message} refetch={refetch}></WidgetError>
      ) : status === "pending" ? (
        <WidgetLoader></WidgetLoader>
      ) : (
        <div className="flex flex-col py-2 px-4">
          <span>{data.ip}</span>
          <div className="flex space-x-2">
            <span>{data.city}</span>
            <span>{data.country}</span>
          </div>
        </div>
      )}
    </WidgetWrapper>
  );
};

export default IPWidget;
