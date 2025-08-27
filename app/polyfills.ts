import { Buffer } from "buffer";
import process from "process";

// Polyfill for browser environment
if (typeof window !== "undefined") {
  // Store original Buffer if it exists
  // @ts-ignore
  if (window.Buffer) {
    // @ts-ignore
    window.pBuffer = window.Buffer;
  }
  
  // Set up Buffer globally
  // @ts-ignore
  window.Buffer = Buffer;
  // @ts-ignore
  window.global = window.global || window;
  
  // Set up process globally
  // @ts-ignore
  if (!window.process) {
    // @ts-ignore
    window.process = process;
  }
  
  // Also ensure globalThis has Buffer
  // @ts-ignore
  if (!globalThis.Buffer) {
    // @ts-ignore
    globalThis.Buffer = Buffer;
  }
}

// Also set up for Node.js environment
if (typeof global !== "undefined") {
  if (!global.Buffer) {
    global.Buffer = Buffer;
  }
}
