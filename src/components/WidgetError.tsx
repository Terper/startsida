import React from "react";
import { CgSync } from "react-icons/cg";

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
        <button onClick={() => props.refetch} className="py-2 px-4">
          <CgSync></CgSync>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default WidgetError;
