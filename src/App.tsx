import { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./App.css";
import EditorPane from "./components/EditorPane";
import PreviewPane from "./components/PreviewPane";

const initialHtml = "<p>Hello World! 🌍️</p>";
const initialJson = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text", text: "Hello World! 🌍️" }],
    },
  ],
};

function App() {
  const [contentHtml, setContentHtml] = useState(initialHtml);
  const [contentJson, setContentJson] = useState<unknown>(initialJson);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialHtml,
    onUpdate: ({ editor }) => {
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
