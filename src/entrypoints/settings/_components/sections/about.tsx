import { Button } from "@/components/ui/button";
import { BookIcon, BugIcon, Globe2Icon, HeartIcon } from "lucide-react";

export default function About() {
  return (
    <div className="space-y-4 py-4">
      <h1 className="text-3xl font-bold">About this Extension</h1>
      <p className="text-muted-foreground text-base">
        This extension is designed to help you manage unwanted content on the web by allowing you to
        filter out specific words or phrases. You can add filters to censor or remove content that
        you find inappropriate, too sensitive, or simply distracting.
      </p>
      <h2 className="text-2xl font-semibold">Usefull Links</h2>
      <div className="flex items-center gap-2">
        <a href="https://github.com/ncvcz/dontshow">
          <Button variant={"outline"}>
            <BookIcon className="h-4 w-4" />
            GitHub Repository
          </Button>
        </a>
        <a href="https://dontshow.app">
          <Button variant={"outline"}>
            <Globe2Icon className="h-4 w-4" />
            Official Website
          </Button>
        </a>
        <a href="https://github.com/ncvcz/dontshow/issues">
          <Button variant={"outline"}>
            <BugIcon className="h-4 w-4" />
            Report an Issue
          </Button>
        </a>
        <a href="https://github.com/sponsors/ncvcz">
          <Button variant={"outline"}>
            <HeartIcon className="h-4 w-4" />
            Support the Project
          </Button>
        </a>
      </div>
      <footer>
        <span className="text-muted-foreground text-base">
          Distributed under the MIT License by Valerio Clemenzi
        </span>
      </footer>
    </div>
  );
}
