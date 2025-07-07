import { Filter } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function textReplacement(type: Filter["type"], text: string, expression?: string): string {
  if (type === "censor") {
    return text.replace(new RegExp(expression ?? "", "gi"), match => "*".repeat(match.length));
  } else if (type === "remove") {
    return "";
  }

  return text;
}
