"use client";

import {
  QueryErrorResetBoundary,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { Suspense } from "react";
import { CgSpinner, CgSync } from "react-icons/cg";

type Props = {};

type GetIP = {
  ip: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  languages: string;
  asn: string;
  org: string;
};

const getIp = async () => {
  const response = await fetch("https://ipapi.co/json/");
  console.log(response);
  if (!response.ok) throw new Error("Tjänst urfnk");
  return await response.json();
};

const IPWidget = (props: Props) => {
  const { data, status, error, refetch } = useQuery<GetIP>({
    queryKey: ["getIp"],
    queryFn: getIp,
  });

  return (
    <div className="bg-blue-200 flex flex-col rounded border border-blue-300">
      <span className="py-2 px-4 border-b border-blue-300 text-xl">Min ip</span>
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
        <div className="flex flex-col py-2 px-4">
          <span>{data.ip}</span>
          <div className="flex space-x-2">
            <span>{data.city}</span>
            <span>{data.country}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPWidget;
