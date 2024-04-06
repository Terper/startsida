"use client";

import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import "moment/locale/sv";
import React, { useState } from "react";
import { CgChevronDown, CgChevronUp, CgSpinner, CgSync } from "react-icons/cg";
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
  const [isExpaned, setIsExpaned] = useState(true);
  const { data, status, error, refetch } = useQuery<GetYle>({
    queryKey: ["getYle"],
    queryFn: getYle,
  });

  return (
    <div className="bg-green-200 flex flex-col rounded border border-green-300 w-full">
      <div className=" flex justify-between">
        <span className="py-2 px-4 text-xl">Svenska Yle</span>
        <button className="py-2 px-4" onClick={() => setIsExpaned(!isExpaned)}>
          {isExpaned ? <CgChevronUp /> : <CgChevronDown />}
        </button>
      </div>
      <div className={`${isExpaned ? "border-t border-green-300" : "hidden"}`}>
        {status === "error" ? (
          <div className="flex justify-between">
            <span className="py-2 px-4">{error.message}</span>
            <button onClick={() => refetch()} className="py-2 px-4">
              <CgSync></CgSync>
            </button>
          </div>
        ) : status === "pending" ? (
          <div className="py-2 px-4">
            <CgSpinner className="animate-spin"></CgSpinner>
          </div>
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
      </div>
    </div>
  );
};

export default YleWidget;
