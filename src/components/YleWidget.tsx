"use client";

import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import "moment/locale/sv";
import React from "react";
import WidgetWrapper from "./WidgetWrapper";
import WidgetLoader from "./WidgetLoader";
import WidgetError from "./WidgetError";
type Props = {};

const getYle = async () => {
  const response = await fetch("api/yle");
  if (!response.ok) throw new Error("Kunde inte ansluta till Yle");
  return await response.json();
};

type GetYle = {
  items: [
    { title: string; description: string; link: string; pubDate: string }
  ];
};

const YleWidget = (props: Props) => {
  const { data, status, error, refetch } = useQuery<GetYle>({
    queryKey: ["getYle"],
    queryFn: getYle,
  });

  return (
    <WidgetWrapper
      name={"Svenska Yle"}
      bgColor={"bg-green-100"}
      borderColor={"border-green-200"}
      isExpandable={true}
    >
      {status === "error" ? (
        <WidgetError message={error.message} refetch={refetch}></WidgetError>
      ) : status === "pending" ? (
        <WidgetLoader></WidgetLoader>
      ) : (
        <div className="flex flex-col max-h-96 overflow-scroll">
          {data.items.map((item, index) => (
            <div key={index} className="py-2 px-4 flex flex-col gap-1">
              <span>
                <a href={item.link}>{item.title}</a>
              </span>
              <div className="flex justify-between">
                <span className="text-sm">{item.description}</span>
                <span className="text-sm">
                  {moment(item.pubDate).locale("sv").fromNow()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </WidgetWrapper>
  );
};

export default YleWidget;
