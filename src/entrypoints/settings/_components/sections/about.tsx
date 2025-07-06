export default function About() {
  return (
    <div>
      <h1 className="text-2xl font-bold">About</h1>
      <p className="mt-2 text-base">
        Don't Show is a browser extension that helps you hide unwanted content from your web
        experience, mainly based on strings or regular expressions you provide.
      </p>
      <a
        href="https://github.com/ncvcz/dontshow"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-blue-600 hover:underline"
      >
        View source code on GitHub
      </a>
      <span className="text-muted-foreground mt-4 block text-sm">
        Distributed under the MIT License by Valerio Clemenzi and Contributors.
      </span>
    </div>
  );
}
