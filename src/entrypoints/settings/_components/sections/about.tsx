import { Button } from "@/components/ui/button";
import { BookIcon, BugIcon, Globe2Icon, HeartIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation("settings", { keyPrefix: "about" });

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="text-muted-foreground text-base">{t("description")}</p>
      <h2 className="text-2xl font-semibold">{t("usefulLinks")}</h2>
      <div className="flex items-center gap-2">
        <a href="https://github.com/ncvcz/dontshow">
          <Button variant={"outline"}>
            <BookIcon className="h-4 w-4" />
            {t("githubRepository")}
          </Button>
        </a>
        <a href="https://dontshow.app">
          <Button variant={"outline"}>
            <Globe2Icon className="h-4 w-4" />
            {t("officialWebsite")}
          </Button>
        </a>
        <a href="https://github.com/ncvcz/dontshow/issues">
          <Button variant={"outline"}>
            <BugIcon className="h-4 w-4" />
            {t("reportIssue")}
          </Button>
        </a>
        <a href="https://github.com/sponsors/ncvcz">
          <Button variant={"outline"}>
            <HeartIcon className="h-4 w-4" />
            {t("supportProject")}
          </Button>
        </a>
      </div>
      <footer>
        <span className="text-muted-foreground text-base">
          {t("footer", { version: browser.runtime.getManifest().version })}
        </span>
      </footer>
    </div>
  );
}
