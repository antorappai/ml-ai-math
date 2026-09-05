import "@testing-library/jest-dom/vitest";
import { cleanup, configure } from "@testing-library/react";
import { afterEach } from "vitest";

// Hash-router events and formula-heavy pages can exceed one second on busy hosts.
configure({ asyncUtilTimeout: 5000 });

afterEach(cleanup);
