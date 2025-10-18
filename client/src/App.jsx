import React, { useState } from "react";
import Editor from "./editor";
import Preview from "./preview";

export default function App() {
  const [value, setValue] = useState(`# JEE Test Editor

Write **Markdown**, include _lists_, images, and math formulas!

## Example:

**Inline math:**
$\\lim_{x \\to 0} \\frac{\\sin x}{x}$

**Block math:**
\\[
\\int_0^1 (3x^2 + 2x + 1) \\, dx
\\]

**Bold text:** **Important**

\`\`\`python
def sum(a, b):
    return a + b
\`\`\`
`);

  const [viewMode, setViewMode] = useState("both");

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 font-inter">
      {/* Toolbar */}
      <div className="flex justify-center gap-4 py-4 bg-[#111827] border-b border-gray-700 shadow-md">
        {["editor", "preview", "both"].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-6 py-2 rounded-xl font-semibold capitalize transition-all duration-200 ${
              viewMode === mode
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-hidden">
        {/* Editor Only */}
        {viewMode === "editor" && (
          <div className="w-full h-full rounded-lg overflow-hidden">
            <Editor value={value} setValue={setValue} />
          </div>
        )}

        {/* Preview Only */}
        {viewMode === "preview" && (
          <div className="w-full h-full rounded-lg overflow-hidden">
            <Preview content={value} />
          </div>
        )}

        {/* Both Mode (Responsive) */}
        {viewMode === "both" && (
          <div className="flex flex-col md:flex-row gap-4 h-full">
            {/* Editor */}
            <div className="flex-1 min-h-[50vh] md:min-h-0 rounded-lg overflow-hidden border border-gray-700 bg-[#0d1117]">
              <Editor value={value} setValue={setValue} />
            </div>

            {/* Preview */}
            <div className="flex-1 min-h-[50vh] md:min-h-0 rounded-lg overflow-hidden border border-gray-700 bg-[#0d1117]">
              <Preview content={value} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
