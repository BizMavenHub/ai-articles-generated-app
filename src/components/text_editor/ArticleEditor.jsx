import dynamic from "next/dynamic";

import "react-quill-new/dist/quill.bubble.css";

const ReactQuill = dynamic(
  () => {
    return import("react-quill-new");
  },
  { ssr: false, loading: () => <p>Quill loading</p> }
);

const ArticleEditor = (props) => {
  const { articleContent, setArticleContent } = props;

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }], // font dropdown with sizes
      ["bold", "italic", "link"], // toggled buttons
      ["blockquote", "code-block"], // toggled buttons
      [{ indent: "-1" }, { indent: "+1" }],
      [({ list: "ordered" }, { list: "bullet" })], // toggled buttons
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "code-block",
    "link",
    "list",
    "indent",
  ];

  return (
    <ReactQuill
      theme="bubble"
      className="article-editor min-h-[80vh] w-full border p-2 z-10 relative"
      value={articleContent}
      onChange={setArticleContent}
      modules={modules}
      formats={formats}
      placeholder="Write your article here..."
    />
  );
};

export default ArticleEditor;
