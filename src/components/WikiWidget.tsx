import { GetFeatured } from "@/types/GetFeatured";
import useKeyStore from "@/utils/useKeyStore";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { CgChevronDown, CgChevronUp, CgSpinner, CgSync } from "react-icons/cg";

type Props = {};

const getFeatured = async (key: string | undefined) => {
  if (key === undefined) {
    throw new Error("Lägg till din API nyckel i inställningarna");
  }
  let url = `https://api.wikimedia.org/feed/v1/wikipedia/sv/featured/${moment().format(
    "YYYY/MM/DD"
  )}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${key}`,
      "Api-User-Agent": "Startsite/1.0 (jann.totterman@gmail.com)",
    },
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error("Nyckeln är ogiltig");
    throw new Error("Kunde inte ansluta till Wikipedia");
  }
  const json = await response.json();

  if (!(json as GetFeatured).tfa) {
    throw new Error("Wikipedia gav fel data");
  }
  return json;
};

const WikiWidget = (props: Props) => {
  const keys = useKeyStore((state) => state.keys);
  const [isExpaned, setIsExpaned] = useState(false);
  const { data, status, error, refetch } = useQuery<GetFeatured>({
    queryKey: ["getDailyFeaturedArticle"],
    queryFn: () => getFeatured(keys.wikipedia),
  });

  return (
    <div className="bg-orange-200 flex flex-col rounded border border-orange-300">
      <div className=" flex justify-between">
        <span className="py-2 px-4  text-xl">
          Dagens artikel på svenska Wikipedia
        </span>
        <button className="py-2 px-4" onClick={() => setIsExpaned(!isExpaned)}>
          {isExpaned ? <CgChevronUp /> : <CgChevronDown />}
        </button>
      </div>
      <div
        className={`${isExpaned ? "border-t border-orange-300 " : "hidden"}`}
      >
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
          <div className="flex flex-col gap-2 py-2 px-4 max-h-96 overflow-scroll">
            <span className="text-xl">
              <a href={data.tfa.content_urls.desktop.page}>
                {data.tfa.normalizedtitle}
              </a>
            </span>
            <div
              dangerouslySetInnerHTML={{ __html: data.tfa.extract_html }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WikiWidget;
