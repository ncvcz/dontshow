export interface Settings {
  sensitiveAlert?: boolean;
  inputCensoring?: boolean;
}

export const defaultSettings: Settings = {
  sensitiveAlert: true,
  inputCensoring: true,
};
