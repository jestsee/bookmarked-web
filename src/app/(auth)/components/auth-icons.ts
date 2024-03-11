import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion } from "next-auth/react";

import { Github, Google, X } from "@/components/icons";
import { Icon } from "@/types/component";

export const AuthIcons: Partial<
  Record<LiteralUnion<BuiltInProviderType, string>, Icon>
> = {
  github: Github,
  google: Google,
  twitter: X,
};
