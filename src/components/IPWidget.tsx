import { GetIP } from "../types/GetIp";
import { useQuery } from "@tanstack/react-query";
import useCoordsStore, { CoordsStore } from "../utils/useCoordsStore";
import WidgetWrapper from "./WidgetWrapper";
import WidgetError from "./WidgetError";
import WidgetLoader from "./WidgetLoader";

type Props = {};

const getIp = async (coordsStore: CoordsStore) => {
  const response = await fetch("https://ipapi.co/json/");
  if (!response.ok) throw new Error("Tjänst ur funktion");
  const json = await response.json();
  // sparar koordinaterna för att hämta vädret
  coordsStore.setCoords({ lon: json.longitude, lat: json.latitude });
  return json;
};

const IPWidget = (props: Props) => {
  const coordsStore = useCoordsStore((state) => state);
  const { data, status, error, refetch } = useQuery<GetIP>({
    queryKey: ["getIp"],
    queryFn: () => getIp(coordsStore),
  });

  return (
    <WidgetWrapper
      name={"Min ip"}
      bgColor={"bg-blue-100"}
      borderColor={"border-blue-300"}
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
