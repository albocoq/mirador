import type { ReactNode } from "react";

type Props = {
  source: string;
};

function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }

    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      parts.push(
        <code key={key++} className="rounded bg-white/8 px-1.5 py-0.5 text-[0.9em]">
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        parts.push(
          <a
            key={key++}
            href={link[2]}
            className="text-ember underline decoration-ember/40 underline-offset-2 transition hover:decoration-ember"
            target="_blank"
            rel="noreferrer"
          >
            {link[1]}
          </a>,
        );
      }
    }

    last = match.index + token.length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts;
}

export function Markdown({ source }: Props) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const nodes: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    if (line.trim() === "---") {
      nodes.push(<hr key={key++} className="my-10 border-white/10" />);
      i += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      nodes.push(
        <h1 key={key++} className="font-display text-4xl leading-tight text-sand sm:text-5xl">
          {inline(line.slice(2))}
        </h1>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      nodes.push(
        <h2 key={key++} className="mt-12 font-display text-2xl text-sand">
          {inline(line.slice(3))}
        </h2>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      nodes.push(
        <h3 key={key++} className="mt-8 text-lg font-semibold text-sand">
          {inline(line.slice(4))}
        </h3>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i += 1;
      }
      nodes.push(
        <ul key={key++} className="mt-4 list-disc space-y-2 pl-5 text-mist">
          {items.map((item, idx) => (
            <li key={idx}>{inline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      nodes.push(
        <p key={key++} className="mt-10 text-sm italic text-mist/70">
          {inline(line.slice(1, -1))}
        </p>,
      );
      i += 1;
      continue;
    }

    const para: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("- ") &&
      lines[i].trim() !== "---"
    ) {
      para.push(lines[i]);
      i += 1;
    }

    nodes.push(
      <p key={key++} className="mt-4 text-[1.05rem] leading-8 text-mist">
        {inline(para.join(" "))}
      </p>,
    );
  }

  return <article className="legal-prose">{nodes}</article>;
}
