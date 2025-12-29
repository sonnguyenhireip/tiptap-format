import React from "react";
import { EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import Toolbar from "./Toolbar";

interface Props {
  editor: Editor | null;
}

const EditorPane: React.FC<Props> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="editor-container">
      <h2>TipTap Editor</h2>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorPane;
