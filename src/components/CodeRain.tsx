"use client";

import { useEffect, useState } from "react";

interface CodeBlock {
  lines: string[];
  language: "javascript" | "typescript" | "jsx" | "tsx";
}

const codeBlocks: CodeBlock[] = [
  {
    language: "javascript",
    lines: [
      "const portfolio = {",
      "  name: 'Monu Rajput',",
      "  title: 'Full Stack Developer',",
      "  skills: ['React', 'Node.js'],,",
      "  experience: 3,",
      "};",
      "",
      "async function buildPortfolio() {",
      "  const ui = await createUI();",
      "  const animations = setupAnimations();",
      "  return { ui, animations };",
      "}",
      "",
      "document.addEventListener('DOMContentLoaded', () => {",
      "  const app = buildPortfolio();",
      "  app.render();",
      "});",
    ],
  },
  {
    language: "jsx",
    lines: [
      "function Hero({ name, title }) {",
      "  const [isVisible, setVisible] = useState(false);",
      "",
      "  useEffect(() => {",
      "    setVisible(true);",
      "  }, []);",
      "",
      "  return (",
      "    <section className='hero'>",
      "      <motion.div",
      "        initial={{ opacity: 0 }}",
      "        animate={{ opacity: 1 }}",
      "      >",
      "        <h1>{name}</h1>",
      "        <p>{title}</p>",
      "      </motion.div>",
      "    </section>",
      "  );",
      "}",
    ],
  },
  {
    language: "typescript",
    lines: [
      "interface Project {",
      "  id: string;",
      "  title: string;",
      "  description: string;",
      "  technologies: Tech[];",
      "}",
      "",
      "type Tech = 'React' | 'Node' | 'MongoDB';",
      "",
      "async function fetchProjects(): Promise<Project[]> {",
      "  const response = await fetch('/api/projects');",
      "  if (!response.ok) {",
      "    throw new Error('Failed');",
      "  }",
      "  return response.json();",
      "}",
    ],
  },
  {
    language: "tsx",
    lines: [
      "export default function SkillsSection() {",
      "  const skills = useSkills();",
      "",
      "  return (",
      "    <div className='grid grid-cols-4'>",
      "      {skills.map((skill) => (",
      "        <SkillCard",
      "          key={skill.id}",
      "          name={skill.name}",
      "          level={skill.level}",
      "        />",
      "      ))}",
      "    </div>",
      "  );",
      "}",
    ],
  },
  {
    language: "javascript",
    lines: [
      "class Developer {",
      "  constructor(name, stack) {",
      "    this.name = name;",
      "    this.stack = stack;",
      "    this.experience = 3;",
      "  }",
      "",
      "  code() {",
      "    return this.stack.map(tech =>",
      "      'Writing ' + tech + ' code'",
      "    );",
      "  }",
      "",
      "  learn() {",
      "    this.experience++;",
      "  }",
      "}",
    ],
  },
];

const colors = {
  background: "#0f172a",
  lineNumber: "#475569",
  comment: "#22c55e",
  keyword: "#a78bfa",
  function: "#fbbf24",
  string: "#4ade80",
  number: "#fb923c",
  variable: "#38bdf8",
  operator: "#f472b6",
  punctuation: "#94a3b8",
};

function tokenize(line: string): { text: string; color: string }[] {
  const tokens: { text: string; color: string }[] = [];
  let i = 0;

  while (i < line.length) {
    if (line.slice(i, i + 2) === "//") {
      tokens.push({ text: line.slice(i), color: colors.comment });
      break;
    }
    
    if (line[i] === '"' || line[i] === "'" || line[i] === "`") {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === "\\") j++;
        j++;
      }
      tokens.push({ text: line.slice(i, j + 1), color: colors.string });
      i = j + 1;
      continue;
    }

    if ("{}[]();,".includes(line[i])) {
      tokens.push({ text: line[i], color: colors.punctuation });
      i++;
      continue;
    }

    if ("+-*/%=<>!&|?:".includes(line[i])) {
      let op = line[i];
      if (i + 1 < line.length && line.slice(i, i + 2) === "=>") {
        op = "=>";
      } else if (i + 1 < line.length && (line.slice(i, i + 2) === "==" || line.slice(i, i + 2) === "!=" || line.slice(i, i + 2) === "<=" || line.slice(i, i + 2) === ">=" || line.slice(i, i + 2) === "&&" || line.slice(i, i + 2) === "||")) {
        op = line.slice(i, i + 2);
      } else if (i + 2 < line.length && line.slice(i, i + 3) === "!==") {
        op = "!==";
      } else if (i + 1 < line.length && "+-*/%=<>&|".includes(line[i + 1])) {
        op = line[i] + line[i + 1];
      }
      tokens.push({ text: op, color: colors.operator });
      i += op.length;
      continue;
    }

    if (/\d/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: colors.number });
      i = j;
      continue;
    }

    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\w$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      
      const keywords = ["const", "let", "var", "function", "return", "if", "else", "for", "while", "class", "import", "export", "from", "default", "async", "await", "new", "this", "extends", "static", "try", "catch", "throw", "typeof", "instanceof", "of", "in", "true", "false", "null", "undefined"];
      const builtins = ["useState", "useEffect", "useRef", "useCallback", "useMemo", "useContext", "React", "Component", "Fragment", "Promise", "fetch", "console", "document", "window", "Array", "Object", "String", "Number"];
      
      if (keywords.includes(word)) {
        tokens.push({ text: word, color: colors.keyword });
      } else if (builtins.includes(word)) {
        tokens.push({ text: word, color: colors.function });
      } else if (j < line.length && line[j] === "(") {
        tokens.push({ text: word, color: colors.function });
      } else {
        tokens.push({ text: word, color: colors.variable });
      }
      i = j;
      continue;
    }

    tokens.push({ text: line[i], color: colors.variable });
    i++;
  }

  return tokens;
}

interface EditorBlock {
  block: CodeBlock;
  startX: number;
  startY: number;
  duration: number;
  delay: number;
}

export default function CodeRain() {
  const [blocks, setBlocks] = useState<EditorBlock[]>([]);

  useEffect(() => {
    const newBlocks: EditorBlock[] = [];
    for (let i = 0; i < 5; i++) {
      const block = codeBlocks[i % codeBlocks.length];
      newBlocks.push({
        block,
        startX: 5 + (i % 3) * 30,
        startY: -40 - i * 20,
        duration: 50 + Math.random() * 20,
        delay: i * 10,
      });
    }
    setBlocks(newBlocks);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes codeScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(250vh + 100%)); }
        }
      `}</style>

      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.5) 100%)",
          }}
        />

        <div className="relative w-full h-[350vh]">
          {blocks.map((item, index) => (
            <div
              key={index}
              className="absolute font-mono text-[9px] md:text-[10px] leading-5 md:leading-6 whitespace-pre"
              style={{
                left: `${item.startX}%`,
                top: `${item.startY}%`,
                animation: `codeScroll ${item.duration}s linear infinite`,
                animationDelay: `${item.delay}s`,
              }}
            >
              <div className="flex items-center gap-1.5 px-2 py-1 mb-2 rounded-t-md" style={{ backgroundColor: "#1e293b" }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ef4444" }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#eab308" }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#22c55e" }} />
                <span className="ml-2 text-[8px]" style={{ color: "#64748b" }}>
                  {item.block.language === "javascript" ? "index.js" :
                   item.block.language === "jsx" ? "Component.jsx" :
                   item.block.language === "typescript" ? "types.ts" : "Component.tsx"}
                </span>
              </div>

              <div className="px-3 py-2 rounded-b-md" style={{ backgroundColor: colors.background }}>
                {item.block.lines.map((line, lineIndex) => (
                  <div key={lineIndex} className="flex">
                    <span className="w-6 md:w-7 text-right pr-2 select-none opacity-40" style={{ color: colors.lineNumber }}>
                      {lineIndex + 1}
                    </span>
                    <span>
                      {tokenize(line).map((token, tokenIndex) => (
                        <span key={tokenIndex} style={{ color: token.color }}>
                          {token.text}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to bottom, rgba(14, 19, 34, 0.9) 0%, transparent 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, rgba(14, 19, 34, 0.95) 0%, transparent 100%)" }} />
        <div className="absolute top-0 bottom-0 left-0 w-16" style={{ background: "linear-gradient(to right, rgba(14, 19, 34, 0.8) 0%, transparent 100%)" }} />
        <div className="absolute top-0 bottom-0 right-0 w-16" style={{ background: "linear-gradient(to left, rgba(14, 19, 34, 0.8) 0%, transparent 100%)" }} />
      </div>
    </>
  );
}
