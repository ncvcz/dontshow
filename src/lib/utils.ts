import { Filter } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function replaceText(type: Filter["type"], text: string): string {
  if (type === "censor") {
    return "*".repeat(text.length);
  } else if (type === "remove") {
    return "";
  }

  return text;
}

export function processTextWithFilter(text: string, filter: Filter): string {
  if (filter.expression.startsWith("/") && filter.expression.endsWith("/")) {
    const regex = new RegExp(filter.expression.slice(1, -1), "gi");
    return text.replace(regex, replaceText(filter.type, filter.expression));
  } else {
    return text.replace(
      new RegExp(filter.expression, "gi"),
      replaceText(filter.type, filter.expression)
    );
  }
}
