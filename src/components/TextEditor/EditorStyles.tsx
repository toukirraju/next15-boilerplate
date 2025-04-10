export const EditorStyles = () => (
  <style jsx global>{`
    .ProseMirror table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;
      min-width: 100%;
    }

    .ProseMirror table td,
    .ProseMirror table th {
      position: relative;
      min-width: 1em;
      border: 1px solid #b5bcca73;
      padding: 0.5rem;
      vertical-align: top;
    }

    .ProseMirror table th {
      font-weight: 600;
      background-color: #cdd2dd49;
    }

    .ProseMirror table .selectedCell {
      background-color: rgba(59, 130, 246, 0.1);
    }

    .tableWrapper {
      padding: 1rem 0;
      overflow-x: auto;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;

      background-color: #3b82f6;
      pointer-events: none;
      z-index: 10;
    }

    .resize-cursor {
      cursor: col-resize;
    }

    .ProseMirror ul,
    ol {
      padding-left: 1.5rem;
      list-style: revert;
    }

    .ProseMirror h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .ProseMirror h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .ProseMirror h3 {
      font-size: 1.25rem;
      font-weight: 500;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .ProseMirror h4 {
      font-size: 1rem;
      font-weight: 400;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .ProseMirror h5 {
      font-size: 0.875rem;
      font-weight: 400;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .ProseMirror h6 {
      font-size: 0.75rem;
      font-weight: 400;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .ProseMirror hr {
      border: none;
      border-top: 1px solid #cdd2dd49;
      margin: 0.5rem 0;
    }

    .ProseMirror a {
      color: #3b82f6;
    }

    .ProseMirror a:hover {
      text-decoration: underline;
    }

    .ProseMirror-focused {
      outline: none;
    }

    .ProseMirror blockquote {
      border-left: 4px solid #ccc;
      padding-left: 16px;
      color: #666;
      font-style: italic;
    }

    .ProseMirror code {
      background-color: #cdd2dd49;
      padding: 3px 5px;
      border-radius: 3px;
    }
  `}</style>
);
