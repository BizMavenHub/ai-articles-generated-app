"use client";

import ArticleStyle from "./style.css";
import hljs from "highlight.js";
import supabase from "@/lib/supabaseClient";

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

        setArticle(res.data[0].content);
        setArticle((prev) => removeMarkdownFromArticle(prev));
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
        .replace(/```/g, "")
        .replace("html", "")
        .replace(/`([^`]*)`/g, "$1")
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // replace ** with bold
        .replace(/\*\s*(.*?)\s*\*/g, "$1") // replace * with italics
        .replace(/\*\s*(.*?)\s*\*/g, "$1"); // replace * with italics
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

    highlightCodeBlocks();
  }, [article]);

  return (
    <div className="p-12">
      {loading ? (
        <div className="flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
        </div>
      ) : (
        <>
          {article ? (
            <div
              dangerouslySetInnerHTML={{ __html: article }}
              className="article w-[90%] mx-auto"
            ></div>
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
