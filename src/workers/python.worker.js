/* global importScripts, loadPyodide */
const PYODIDE_BASE = "https://cdn.jsdelivr.net/pyodide/v0.27.3/full/";
let runtimePromise;
const loaded = new Set();

async function getRuntime() {
  if (!runtimePromise) {
    self.postMessage({ type: "status", status: "loading", message: "Downloading the Python runtime..." });
    importScripts(`${PYODIDE_BASE}pyodide.js`);
    runtimePromise = loadPyodide({ indexURL: PYODIDE_BASE });
  }
  return runtimePromise;
}

async function ensurePackages(pyodide, packages) {
  const needed = packages.filter((name) => !loaded.has(name));
  if (!needed.length) return;
  self.postMessage({ type: "status", status: "loading", message: `Loading ${needed.join(", ")}...` });
  await pyodide.loadPackage(needed);
  needed.forEach((name) => loaded.add(name));
}

self.onmessage = async ({ data }) => {
  if (data.type !== "run") return;
  try {
    const pyodide = await getRuntime();
    await ensurePackages(pyodide, data.packages || []);
    const stdout = [];
    const stderr = [];
    pyodide.setStdout({ batched: (line) => stdout.push(line) });
    pyodide.setStderr({ batched: (line) => stderr.push(line) });
    self.postMessage({ type: "status", status: "running", message: "Running in an isolated worker..." });
    const seedSetup = "import random\nrandom.seed(42)\ntry:\n import numpy as np\n np.random.seed(42)\nexcept ImportError:\n pass\n";
    await pyodide.runPythonAsync(`${seedSetup}\n${data.code}`);
    const visibleOutput = [...stdout, ...stderr].filter(Boolean).join("\n");
    if (data.hiddenTests) await pyodide.runPythonAsync(data.hiddenTests);
    self.postMessage({ type: "result", output: visibleOutput, hiddenTestsPassed: true });
  } catch (error) {
    self.postMessage({ type: "error", error: String(error) });
  }
};
