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
