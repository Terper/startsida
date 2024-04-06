import React from "react";
import { CgSpinner } from "react-icons/cg";

type Props = {};

const WidgetLoader = (props: Props) => {
  return (
    <div className="py-2 px-4">
      <CgSpinner className="animate-spin"></CgSpinner>
    </div>
  );
};

export default WidgetLoader;
