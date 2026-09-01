import React, { useEffect, useRef, useState } from "react";

const TIMEOUT_MS = 15000;
const createRuntimeWorker = () => new Worker(new URL("./workers/python.worker.js", import.meta.url));

export default function PythonPlayground({ lessonKey, initialCode, expectedOutput = "", packages = [], hiddenTests = "", onComplete }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("Python loads only when you run code.");
  const workerRef = useRef(null);
  const timerRef = useRef(null);

  function stopWorker() {
    clearTimeout(timerRef.current);
    workerRef.current?.terminate();
    workerRef.current = null;
  }

  useEffect(() => {
    setCode(initialCode);
    setOutput("");
    setStatus("idle");
    setMessage("Python loads only when you run code.");
    stopWorker();
    return stopWorker;
  }, [initialCode, lessonKey]);

  function runCode() {
    stopWorker();
    const worker = createRuntimeWorker();
    workerRef.current = worker;
    setStatus("loading");
    setOutput("");
    setMessage(packages.length ? `Loading Python and ${packages.join(", ")}...` : "Loading Python runtime...");

    worker.onmessage = ({ data }) => {
      if (data.type === "status") {
        setStatus(data.status);
        setMessage(data.message);
        return;
      }
      clearTimeout(timerRef.current);
      if (data.type === "result") {
        setOutput(data.output || "Code ran successfully. No output was printed.");
        setStatus("done");
        setMessage("Run completed in the isolated Python worker.");
        if ((!expectedOutput || data.output.trim() === expectedOutput.trim()) && data.hiddenTestsPassed) onComplete?.();
      } else {
        setOutput(data.error);
        setStatus("error");
        setMessage("Read the final traceback line first, then inspect the referenced code line.");
      }
    };

    worker.onerror = (error) => {
      clearTimeout(timerRef.current);
      setOutput(error.message || "Python worker failed to start.");
      setStatus("error");
      setMessage("Reset the runtime and try again.");
    };

    worker.postMessage({ type: "run", code, packages, hiddenTests });
    timerRef.current = setTimeout(() => {
      stopWorker();
      setStatus("error");
      setOutput(`Execution stopped after ${TIMEOUT_MS / 1000} seconds.`);
      setMessage("The timeout protects the page from infinite loops. Check loop conditions and retry.");
    }, TIMEOUT_MS);
  }

  function reset() {
    stopWorker();
    setCode(initialCode);
    setOutput("");
    setStatus("idle");
    setMessage("Runtime reset. Python will reload on the next run.");
  }

  const matchesExpected = expectedOutput && output && output.trim() === expectedOutput.trim();

  return (
    <article className="python-lab">
      <div className="python-lab-head">
        <div><p className="eyebrow">Browser Python Lab</p><h3>Edit, run, inspect</h3></div>
        <span className={`runtime-pill ${status}`}>{message}</span>
      </div>
      <label className="editor-label" htmlFor={`python-${lessonKey}`}>Editable code</label>
      <textarea id={`python-${lessonKey}`} className="python-editor" value={code} onChange={(event) => setCode(event.target.value)} spellCheck="false" />
      <div className="button-row">
        <button type="button" onClick={runCode} disabled={status === "loading" || status === "running"}>Run code</button>
        <button type="button" className="button secondary" onClick={reset}>Reset runtime</button>
      </div>
      <div className="output-panel">
        <span>Output</span>
        <pre><code>{output || "Run the code to see output."}</code></pre>
        {expectedOutput && <p className={matchesExpected ? "grade-pass" : "muted"}>{matchesExpected ? `Visible check passed${hiddenTests ? " · hidden checks passed" : ""}.` : "Compare your result with the expected output shown in the lesson."}</p>}
      </div>
    </article>
  );
}
