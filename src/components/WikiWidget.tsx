import { GetFeatured } from "@/types/GetFeatured";
import useKeyStore from "@/utils/useKeyStore";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import WidgetWrapper from "./WidgetWrapper";
import WidgetError from "./WidgetError";
import WidgetLoader from "./WidgetLoader";

type Props = {};

const getFeatured = async (key: string | undefined) => {
  // returnerar tidigt ifall API nyckeln inte är satt
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
  // ifall statusen är 401 är nyckeln ogiltig
  if (!response.ok) {
    if (response.status === 401) throw new Error("Nyckeln är ogiltig");
    throw new Error("Kunde inte ansluta till Wikipedia");
  }

  const json = await response.json();

  // ibland returnerar wikipedia inte objektet för dagens artikel
  if (!(json as GetFeatured).tfa) {
    throw new Error("Wikipedia gav fel data");
  }
  return json;
};

const WikiWidget = (props: Props) => {
  const keys = useKeyStore((state) => state.keys);

  const { data, status, error, refetch } = useQuery<GetFeatured>({
    queryKey: ["getDailyFeaturedArticle"],
    queryFn: () => getFeatured(keys.wikipedia),
  });

  return (
    <WidgetWrapper
      name={"Dagens artikel på svenska Wikipedia"}
      bgColor={"bg-violet-100"}
      borderColor={"violet-teal-200"}
      isExpandable={true}
    >
      {status === "error" ? (
        <WidgetError message={error.message} refetch={refetch}></WidgetError>
      ) : status === "pending" ? (
        <WidgetLoader></WidgetLoader>
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
    </WidgetWrapper>
  );
};

export default WikiWidget;
