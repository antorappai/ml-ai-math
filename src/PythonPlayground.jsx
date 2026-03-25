import React, { useEffect, useRef, useState } from "react";

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.27.3/full/pyodide.js";

let pyodideReadyPromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-pyodide-script="true"]`);
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      if (window.loadPyodide) {
        resolve();
      }
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.pyodideScript = "true";
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

async function getPyodideInstance() {
  if (!pyodideReadyPromise) {
    pyodideReadyPromise = (async () => {
      await loadScript(PYODIDE_URL);
      return window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.3/full/"
      });
    })();
  }

  return pyodideReadyPromise;
}

export default function PythonPlayground({ lessonKey, initialCode }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("idle");
  const [runtimeReady, setRuntimeReady] = useState(false);
  const [loadError, setLoadError] = useState("");
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setCode(initialCode);
    setOutput("");
    setStatus("idle");
  }, [initialCode, lessonKey]);

  useEffect(() => {
    let cancelled = false;

    async function prepareRuntime() {
      try {
        setStatus("loading");
        setLoadError("");
        await getPyodideInstance();
        if (!cancelled && mountedRef.current) {
          setRuntimeReady(true);
          setStatus("idle");
        }
      } catch (error) {
        if (!cancelled && mountedRef.current) {
          setLoadError(
            "Python runtime could not load. Check your connection and try again."
          );
          setStatus("error");
        }
      }
    }

    prepareRuntime();

    return () => {
      cancelled = true;
    };
  }, []);

  async function runCode() {
    try {
      setStatus("running");
      setOutput("");
      setLoadError("");

      const pyodide = await getPyodideInstance();
      const stdoutLines = [];
      const stderrLines = [];

      pyodide.setStdout({
        batched(message) {
          stdoutLines.push(message);
        }
      });

      pyodide.setStderr({
        batched(message) {
          stderrLines.push(message);
        }
      });

      await pyodide.runPythonAsync(code);

      const renderedOutput = [...stdoutLines, ...stderrLines].filter(Boolean).join("\n");

      if (mountedRef.current) {
        setOutput(renderedOutput || "Code ran successfully. No output was printed.");
        setStatus("done");
      }
    } catch (error) {
      if (mountedRef.current) {
        setOutput(String(error));
        setStatus("error");
      }
    }
  }

  function resetCode() {
    setCode(initialCode);
    setOutput("");
    setStatus(runtimeReady ? "idle" : "loading");
  }

  const statusText =
    status === "loading"
      ? "Loading Python runtime..."
      : status === "running"
        ? "Running code..."
        : runtimeReady
          ? "Python is ready in the browser."
          : "Preparing Python runtime.";

  return (
    <article className="content-card wide">
      <div className="playground-header">
        <div>
          <p className="panel-label">Live Python Playground</p>
          <p className="playground-copy">
            Edit the code, run it in the browser, and use it like an exam practice
            scratchpad. First load may take a few seconds because Python is being
            downloaded into the page.
          </p>
        </div>
        <span className={`runtime-pill ${status}`}>{statusText}</span>
      </div>

      <div className="playground-shell">
        <label className="editor-label" htmlFor={`python-editor-${lessonKey}`}>
          Editable Python Code
        </label>
        <textarea
          id={`python-editor-${lessonKey}`}
          className="python-editor"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          spellCheck="false"
        />
        <div className="playground-actions">
          <button type="button" onClick={runCode} disabled={status === "loading" || status === "running"}>
            Run code
          </button>
          <button type="button" className="secondary-button" onClick={resetCode}>
            Reset code
          </button>
        </div>
      </div>

      <div className="playground-output-card">
        <p className="panel-label">Output</p>
        <pre className="code-block playground-output">
          <code>{loadError || output || "Run the code to see output here."}</code>
        </pre>
      </div>
    </article>
  );
}
