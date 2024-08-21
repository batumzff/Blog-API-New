import React, { useEffect, useRef, forwardRef } from "react";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../../Helpers/quillModules";

// Forwarding the ref for accessing the Quill editor instance
const QuillEditor = forwardRef(({ value }, ref) => {
  const quillRef = useRef(null);
  console.log(value)

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (value !== undefined && value !== editor.root.innerHTML) {
        const currentContent = editor.root.innerHTML;

        // Check if the content is different before setting it
        if (value !== currentContent) {
          const range = editor.getSelection(); // Get the current caret position
          editor.root.innerHTML = value; // Set the new content
          if (range) {
            editor.setSelection(range); // Restore the caret position
          }
        }
      }
    }
  }, [value]);

  return (
    <ReactQuill
      ref={(el) => {
        quillRef.current = el;
        if (ref) ref.current = el;
      }}
      theme="snow"
      modules={modules}
      value={value}
    />
  );
});

export default QuillEditor;

