import { ArrowPathIcon } from "@heroicons/react/24/solid";

type Props = {
  // felmeddelandet
  message: string;
  // useQuerys refetch funktion
  refetch?: () => void;
};

const WidgetError = (props: Props) => {
  return (
    <div className="flex justify-between">
      <span className="py-2 px-4">{props.message}</span>
      {props.refetch ? (
        <button onClick={() => props.refetch!()} className="py-2 px-4">
          <ArrowPathIcon className="w-4 h-4 text-black"></ArrowPathIcon>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default WidgetError;
