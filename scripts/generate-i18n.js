// build-i18n.js
import { generateTypeFile, parseMessagesFile } from "@wxt-dev/i18n/build";

// Read your localization files
const messages = {
  en: await parseMessagesFile("src/locales/en.yml"),
  // ...
};

// Generate a types file based on your default_locale
await generateTypeFile("wxt-i18n-structure.d.ts", messages.en);
