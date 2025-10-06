"use client";

import "@uiw/react-markdown-preview/markdown.css";
import type { MDEditorProps } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

export type EditorProps = MDEditorProps;

function PostsEditor({ ...rest }: MDEditorProps) {
  return (
    <MDEditor
      {...rest}
      className="w-full min-h-[500px]"
      style={{ minHeight: "500px" }}
      height={500}
    />
  );
}

export default PostsEditor;
