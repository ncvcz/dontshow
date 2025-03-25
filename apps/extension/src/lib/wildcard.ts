export const matchWildcard = (pattern: string, value: string): boolean => {
  if (pattern === "*") return true

  const normalizedDomain = value.toLowerCase();
  const normalizedWildcard = pattern.toLowerCase();

  if (!normalizedWildcard.includes("*")) {
    return normalizedDomain === normalizedWildcard;
  }

  const regexPattern = "^" + 
    normalizedWildcard
      .replace(/\./g, "\\.")
      .replace(/\*/g, "[^.]+") +
    "$";

  const regex = new RegExp(regexPattern);

  return regex.test(normalizedDomain); 
}
