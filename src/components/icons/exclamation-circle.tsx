import { SVGProps } from "react";

export function ExclamationCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 14a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 12 14m0-1.5a1 1 0 0 0 1-1v-3a1 1 0 0 0-2 0v3a1 1 0 0 0 1 1M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8.01 8.01 0 0 1-8 8"
      ></path>
    </svg>
  );
}
