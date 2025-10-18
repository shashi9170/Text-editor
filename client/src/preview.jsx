import React from "react";
import MDEditor from "@uiw/react-md-editor";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function DarkPreview({ content }) {
  return (
    <div
      style={{
        padding: "10px",
        background: "#000000",
        borderRadius: "5px",
        fontFamily: "'Inter', sans-serif",
      }}
    >

      <MDEditor.Markdown
        source={content}
        rehypePlugins={[rehypeKatex]}
        remarkPlugins={[remarkMath]}
        linkable={false}
        height="100%"
        style={{
          color:"#ffffff",
          background: "#000000",
        }}
      />
    </div>
  );
}