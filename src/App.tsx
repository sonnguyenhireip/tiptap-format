import { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/html";
import "./App.css";
import EditorPane from "./components/EditorPane";
import PreviewPane from "./components/PreviewPane";

const INVISIBLE_CHAR = "\u200B";

const initialJson = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: INVISIBLE_CHAR,
          marks: [{ type: "bold" }, { type: "italic" }],
        },
      ],
    },
  ],
};
const initialHtml = generateHTML(initialJson, [StarterKit]);

function hasInvisibleChar(node: any): boolean {
  if (!node) return false;
  if (node.type === "text" && typeof node.text === "string") {
    return node.text.includes(INVISIBLE_CHAR);
  }
  if (node.content && Array.isArray(node.content)) {
    return node.content.some(hasInvisibleChar);
  }
  return false;
}

function App() {
  const [contentHtml, setContentHtml] = useState(initialHtml);
  const [contentJson, setContentJson] = useState<unknown>(initialJson);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialJson,
    onUpdate: ({ editor }) => {
      // If visible text is empty, ensure invisible char with bold+italic exists
      const plain = editor
        .getText()
        .replace(new RegExp(INVISIBLE_CHAR, "g"), "")
        .trim();
      if (plain === "") {
        const json = editor.getJSON();
        if (!hasInvisibleChar(json)) {
          editor.commands.setContent(initialJson);
        }
      }

      setContentHtml(editor.getHTML());
      setContentJson(editor.getJSON());
    },
  });

  if (!editor) return null;

  return (
    <div className="app">
      <EditorPane editor={editor} />
      <PreviewPane html={contentHtml} json={contentJson} />
    </div>
  );
}

export default App;
