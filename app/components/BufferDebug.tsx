import { useEffect, useState } from "react";

export function BufferDebug() {
  const [debugInfo, setDebugInfo] = useState<{
    hasBuffer: boolean;
    hasBufferFrom: boolean;
    hasGlobalBuffer: boolean;
    hasProcess: boolean;
    testResult: string;
  }>({
    hasBuffer: false,
    hasBufferFrom: false,
    hasGlobalBuffer: false,
    hasProcess: false,
    testResult: "Not tested",
  });

  useEffect(() => {
    // Check if Buffer exists
    const hasBuffer = typeof window !== "undefined" && typeof (window as any).Buffer !== "undefined";
    const hasBufferFrom = hasBuffer && typeof (window as any).Buffer.from === "function";
    const hasGlobalBuffer = typeof globalThis !== "undefined" && typeof (globalThis as any).Buffer !== "undefined";
    const hasProcess = typeof window !== "undefined" && typeof (window as any).process !== "undefined";
    
    let testResult = "Failed";
    try {
      // Try to use Buffer.from like Privy would
      if (hasBufferFrom) {
        const test = (window as any).Buffer.from("test", "utf-8");
        if (test) {
          testResult = "Success - Buffer.from works!";
        }
      }
    } catch (error: any) {
      testResult = `Error: ${error.message}`;
    }

    setDebugInfo({
      hasBuffer,
      hasBufferFrom,
      hasGlobalBuffer,
      hasProcess,
      testResult,
    });
  }, []);

  // Only show in development or when there's an issue
  if (import.meta.env.PROD && debugInfo.hasBufferFrom) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Buffer Polyfill Debug</h3>
      <ul className="space-y-1">
        <li className={debugInfo.hasBuffer ? "text-green-400" : "text-red-400"}>
          window.Buffer: {debugInfo.hasBuffer ? "✓" : "✗"}
        </li>
        <li className={debugInfo.hasBufferFrom ? "text-green-400" : "text-red-400"}>
          Buffer.from: {debugInfo.hasBufferFrom ? "✓" : "✗"}
        </li>
        <li className={debugInfo.hasGlobalBuffer ? "text-green-400" : "text-red-400"}>
          globalThis.Buffer: {debugInfo.hasGlobalBuffer ? "✓" : "✗"}
        </li>
        <li className={debugInfo.hasProcess ? "text-green-400" : "text-red-400"}>
          window.process: {debugInfo.hasProcess ? "✓" : "✗"}
        </li>
        <li className="mt-2 pt-2 border-t border-gray-600">
          Test: {debugInfo.testResult}
        </li>
      </ul>
      <p className="mt-2 text-gray-400">
        Mode: {import.meta.env.MODE} | Prod: {import.meta.env.PROD ? "Yes" : "No"}
      </p>
    </div>
  );
}