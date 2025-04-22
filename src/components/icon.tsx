"use client";
import { LoaderIcon } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";
import { FC, memo } from "react";

type IconName = keyof typeof dynamicIconImports;

const icons = Object.keys(dynamicIconImports) as IconName[];

type ReactComponent = FC<{ className?: string }>;
const icons_components = {} as Record<IconName, ReactComponent>;

for (const name of icons) {
  const NewIcon = dynamic(dynamicIconImports[name], {
    ssr: false,
  }) as ReactComponent;
  icons_components[name] = NewIcon;
}

type DynamicIconProps = {
  name: string;
  className?: string;
};

const DynamicIcon = memo(({ name, ...props }: DynamicIconProps) => {
  const Icon = icons_components[name as IconName];
  if (!Icon) return <LoaderIcon {...props}></LoaderIcon>;
  return <Icon {...props} />;
});
DynamicIcon.displayName = "DynamicIcon";

export default DynamicIcon;
