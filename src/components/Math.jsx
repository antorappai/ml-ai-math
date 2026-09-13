import React from "react";
import katex from "katex";

function MathMarkup({ latex, displayMode, className = "" }) {
  let html;
  try {
    html = katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      strict: "warn",
      output: "htmlAndMathml"
    });
  } catch {
    return <code className={`math-fallback ${className}`}>{latex}</code>;
  }

  const Tag = displayMode ? "div" : "span";
  return (
    <Tag
      className={`${displayMode ? "block-math" : "inline-math"} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function InlineMath({ children, className }) {
  return <MathMarkup latex={String(children)} displayMode={false} className={className} />;
}

export function BlockMath({ children, className }) {
  return <MathMarkup latex={String(children)} displayMode className={className} />;
}

// Only explicitly delimited mathematics is parsed. Ordinary prose, prices, and
// Python code are never guessed to be TeX.
export function MathText({ children }) {
  const text = String(children ?? "");
  const parts = text.split(/(\\\([\s\S]*?\\\)|\[\[math:[\s\S]*?\]\])/g);
  return <>{parts.map((part, index) => {
    if (part.startsWith("\\(") && part.endsWith("\\)")) return <InlineMath key={index}>{part.slice(2, -2)}</InlineMath>;
    if (part.startsWith("[[math:") && part.endsWith("]]")) {
      try {
        return <InlineMath key={index}>{decodeURIComponent(part.slice(7, -2))}</InlineMath>;
      } catch {
        return <React.Fragment key={index}>{part}</React.Fragment>;
      }
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  })}</>;
}
