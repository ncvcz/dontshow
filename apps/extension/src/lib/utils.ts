export const escapeRegex = (pattern: string): string => {
  return pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}