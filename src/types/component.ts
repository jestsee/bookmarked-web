export interface LayoutProps {
  children: React.ReactNode;
}

export type SearchParams<T extends string> = {
  [K in T]?: string;
};
