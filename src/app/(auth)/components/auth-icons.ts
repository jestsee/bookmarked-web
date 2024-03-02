import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion } from "next-auth/react";
import { SVGProps } from "react";

import { Github, Google } from "@/components/icons";

type Icon = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

export const AuthIcons: Partial<
  Record<LiteralUnion<BuiltInProviderType, string>, Icon>
> = {
  github: Github,
  google: Google,
};
