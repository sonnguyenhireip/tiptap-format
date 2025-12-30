import { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/html";
import "./App.css";
import EditorPane from "./components/EditorPane";
import PreviewPane from "./components/PreviewPane";

const initialJson = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};
const initialHtml = generateHTML(initialJson, [StarterKit]);

function App() {
  const [contentHtml, setContentHtml] = useState(initialHtml);
  const [contentJson, setContentJson] = useState<unknown>(initialJson);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialJson,
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
