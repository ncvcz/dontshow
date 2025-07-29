export interface Settings {
  sensitiveAlert?: boolean;
  inputCensoring?: boolean;
  uncensorOnFocus?: boolean;
  enableOnLocalhost?: boolean;
  debugMessages?: boolean;
}

export interface Filter {
  expression: string;
  domain: string;
  type: "censor" | "remove";
}

export interface Element {
  website: string;
  selector: string;
  action: "censor" | "remove";
}
