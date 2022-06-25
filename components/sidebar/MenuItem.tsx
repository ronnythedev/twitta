import React from "react";

type Props = {
  menuText: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
};

export default function MenuItem({ menuText, Icon, active }: Props) {
  return (
    <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
      <Icon className="h-7" />
      <span className={`${active && "font-bold"} hidden xl:inline`}>
        {menuText}
      </span>
    </div>
  );
}
