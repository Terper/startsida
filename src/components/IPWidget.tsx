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
  query: string;
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
};

const getIp = async () => {
  const response = await fetch("https://ip-api.com/json/");
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
          <span>{data.query}</span>
          <div className="flex space-x-2">
            <span>{data.city}</span>
            <span>{data.countryCode}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPWidget;
