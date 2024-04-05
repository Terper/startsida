"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {};

const IPWidget = (props: Props) => {
  const query = useQuery({
    queryKey: ["ip"],
    queryFn: async () => {
      const response = await fetch("/api/ip");
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      console.log(json);
      return json;
    },
  });

  return (
    <div>
      <div>Min IP-address</div>
      {query.status === "error" ? (
        <div>Error while fetching data</div>
      ) : query.status === "pending" ? (
        <div>Loading</div>
      ) : (
        <div>{query.data.ip}</div>
      )}
    </div>
  );
};

export default IPWidget;
