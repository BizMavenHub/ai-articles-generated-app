"use client";

import hljs from "highlight.js";
import supabase from "@/lib/supabaseClient";

import "./style.css";
import "highlight.js/styles/atom-one-dark.css";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const params = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticleById = async () => {
      try {
        setLoading(true);

        const res = await supabase
          .from("articles")
          .select("content")
          .eq("id", params.article_id);

        if (res.error) {
          console.log(res.error);
        }

        const content = res.data[0].content;

        const cleanedContent = removeMarkdownFromArticle(content);

        setArticle(cleanedContent);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const removeMarkdownFromArticle = (article) => {
      return article
        .replace(/`([^`]*)`/g, "$1") // remove inline code backticks
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // convert bold
        .replace(/\*(.*?)\*/g, "$1"); // convert italics
    };

    fetchArticleById();
  }, [params.article_id]);

  useEffect(() => {
    const highlightCodeBlocks = () => {
      const codeBlocks = document.querySelectorAll("pre code");

      codeBlocks.forEach((block) => {
        hljs.highlightElement(block);
      });
    };

    const highlightCodeBlocks2 = () => {
      const codeBlocks = document.querySelectorAll(
        ".ql-code-block-container .ql-code-block"
      );

      codeBlocks.forEach((block) => {
        hljs.highlightElement(block);
      });
    };

    highlightCodeBlocks();
    highlightCodeBlocks2();
  }, [article]);

  return (
    <div className="pb-12">
      {loading ? (
        <div className="flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
        </div>
      ) : (
        <>
          {article ? (
            <div
              dangerouslySetInnerHTML={{ __html: article }}
              className="article w-[90%] mx-auto"></div>
          ) : (
            <div className="flex justify-center items-center">
              <h1 className="text-3xl">No article found</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default page;
