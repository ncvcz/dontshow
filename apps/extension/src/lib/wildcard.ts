const regexPatternCache = new Map<string, RegExp>();

export const matchWildcard = (pattern: string, value: string): boolean => {
  const patterns = pattern.split(",").map(p => p.trim());

  return patterns.some(singlePattern => {
    if (singlePattern === value || singlePattern === "*") return true;

    const normalizedDomain = value.toLowerCase();
    const normalizedWildcard = singlePattern.toLowerCase();

    if (normalizedWildcard === normalizedDomain) return true;

    if (!normalizedWildcard.includes("*")) {
      return normalizedDomain === normalizedWildcard;
    }

    let regex = regexPatternCache.get(normalizedWildcard);

    if (!regex) {
      const regexPattern =
        "^" + normalizedWildcard.replace(/\./g, "\\.").replace(/\*/g, "[^.]+") + "$";

      regex = new RegExp(regexPattern);
      regexPatternCache.set(normalizedWildcard, regex);
    }

    return regex.test(normalizedDomain);
  });
};
