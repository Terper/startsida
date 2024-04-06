import React, { PropsWithChildren, useState } from "react";
import { CgChevronUp, CgChevronDown } from "react-icons/cg";

type Props = {
  // namnet högst upp
  name: string;
  // bg-[färg]-[värde] för bakgrundsfärgen
  bgColor: string;
  // border-[färg]-[värde] för utlinjen
  borderColor: string;
  // om sant lägger till möjligheten att expandera och minimera widgeten
  isExpandable: boolean;
  // om sant är widgeten från början expanderad
  // ifall isExpandable är falskt så visas bara namnet
  isExpanded?: boolean;
};

const WidgetWrapper = (props: PropsWithChildren<Props>) => {
  const [isExpanded, setIsExpanded] = useState(props.isExpanded ?? true);

  return (
    <div
      className={`${props.bgColor} flex flex-col rounded border ${props.borderColor}`}
    >
      <div className="flex justify-between">
        <span className="text-xl py-2 px-4">{props.name}</span>
        {props.isExpandable ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xl py-2 px-4"
          >
            {isExpanded ? <CgChevronUp /> : <CgChevronDown />}
          </button>
        ) : (
          <></>
        )}
      </div>
      <div
        className={`${
          isExpanded
            ? `border-t ${props.borderColor} ${props.bgColor}`
            : "hidden"
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default WidgetWrapper;