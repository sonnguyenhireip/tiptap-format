import React from "react";

interface Props {
  html: string;
  json: any;
}

const PreviewPane: React.FC<Props> = ({ html, json }) => {
  const stripped = html
    .replace(/\u200B/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
  const isEmpty = stripped === "";

  return (
    <div className="preview-container">
      <h2>Preview</h2>
      {isEmpty ? (
        <div className="preview-content empty">(Trống)</div>
      ) : (
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}

      <h3>HTML</h3>
      <pre className="preview-html">{html}</pre>

      <h3>JSON Structure</h3>
      <pre className="preview-json">{JSON.stringify(json, null, 2)}</pre>
    </div>
  );
};

export default PreviewPane;
