import React from "react";
import "./style.css";

const HTMLConverter = ({ article }) => {
  return (
    <div
      className="article"
      dangerouslySetInnerHTML={{ __html: article }}></div>
  );
};

export default HTMLConverter;
