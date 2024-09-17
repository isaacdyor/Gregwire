import { cn } from "@/lib/utils";
import { type LucideProps } from "lucide-react";

export const GmailLogo = ({ ...props }: LucideProps) => {
  return (
    <svg
      className={cn("h-6 w-6", props.className)}
      xmlns="http://www.w3.org/2000/svg"
      width="1.33em"
      height="1em"
      viewBox="0 0 256 193"
    >
      <path
        fill="#4285f4"
        d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"
      />
      <path
        fill="#34a853"
        d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"
      />
      <path
        fill="#ea4335"
        d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"
      />
      <path
        fill="#fbbc04"
        d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z"
      />
      <path
        fill="#c5221f"
        d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z"
      />
    </svg>
  );
};
