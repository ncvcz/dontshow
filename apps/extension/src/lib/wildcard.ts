// Cache for compiled regex patterns
const regexPatternCache = new Map<string, RegExp>();

export const matchWildcard = (pattern: string, value: string): boolean => {
  // Fast path for exact match or universal wildcard
  if (pattern === value || pattern === "*") return true;

  const normalizedDomain = value.toLowerCase();
  const normalizedWildcard = pattern.toLowerCase();

  // Fast path for exact match after normalization
  if (normalizedWildcard === normalizedDomain) return true;
  
  // Fast path for non-wildcard patterns
  if (!normalizedWildcard.includes("*")) {
    return normalizedDomain === normalizedWildcard;
  }

  // Check cache for compiled regex
  let regex = regexPatternCache.get(normalizedWildcard);
  
  if (!regex) {
    // Create and cache the regex pattern
    const regexPattern = "^" + 
      normalizedWildcard
        .replace(/\./g, "\\.")
        .replace(/\*/g, "[^.]+") +
      "$";
    
    regex = new RegExp(regexPattern);
    regexPatternCache.set(normalizedWildcard, regex);
  }

  return regex.test(normalizedDomain); 
}
