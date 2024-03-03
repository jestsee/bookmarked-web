import { SVGProps } from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

export type SearchParams<T extends string> = {
  [K in T]?: string;
};

export type Icon = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
