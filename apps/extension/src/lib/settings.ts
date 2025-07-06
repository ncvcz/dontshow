export interface Settings {
  sensitiveAlert?: boolean;
  inputCensoring?: boolean;
  uncensorOnFocus?: boolean;
  enableOnLocalhost?: boolean;
}

export const defaultSettings: Settings = {
  sensitiveAlert: true,
  inputCensoring: true,
  uncensorOnFocus: true,
  enableOnLocalhost: false,
};
