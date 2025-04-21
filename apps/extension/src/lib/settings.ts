export interface Settings {
  sensitiveAlert?: boolean;
  inputCensoring?: boolean;
  enableOnLocalhost?: boolean;
}

export const defaultSettings: Settings = {
  sensitiveAlert: true,
  inputCensoring: true,
  enableOnLocalhost: false,
};
