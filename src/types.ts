export interface Settings {
  sensitiveAlert?: boolean;
  inputCensoring?: boolean;
  uncensorOnFocus?: boolean;
  enableOnLocalhost?: boolean;
}

export interface Filter {
  expression: string;
  domain: string;
  type: "censor" | "remove";
}
