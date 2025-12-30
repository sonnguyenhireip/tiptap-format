import React, { useEffect, useState } from "react";
import { EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import Toolbar from "./Toolbar";

interface Props {
  editor: Editor | null;
}

const INVISIBLE_CHAR = "\u200B";

const EditorPane: React.FC<Props> = ({ editor }) => {
  if (!editor) return null;

  const isEmptyOrInvisible = () =>
    editor.getText().replace(new RegExp(INVISIBLE_CHAR, "g"), "").trim()
      .length === 0;

  const [showPlaceholder, setShowPlaceholder] =
    useState<boolean>(isEmptyOrInvisible);

  useEffect(() => {
    if (!editor) return;
    const handler = () => setShowPlaceholder(isEmptyOrInvisible());
    // initialize
    handler();
    editor.on("update", handler);
    return () => {
      editor.off("update", handler);
    };
  }, [editor]);

  return (
    <div className="editor-container">
      <h2>TipTap Editor</h2>
      <Toolbar editor={editor} />
      <div className="editor-content-wrapper">
        {showPlaceholder && (
          <div className="editor-placeholder">Nhập nội dung ở đây...</div>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default EditorPane;
