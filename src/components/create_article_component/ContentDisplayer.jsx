import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import hljs from "highlight.js";

import supabase from "@/lib/supabaseClient";
import HTMLConverter from "./HTMLConverter";

import "highlight.js/styles/atom-one-dark.css";

import { Button } from "@/components/ui/button";

// Objects
import ArticleObject from "@/lib/ArticleClass";

import { testingArticle } from "@/app/utils/data";

const ContentDisplayer = (props) => {
  const { generatedArticle, articleData } = props;

  const router = useRouter();

  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCleanArticle = async () => {
      try {
        setLoading(true);

        const cleanArticle = await removeMarkdownFromArticle();

        setArticle(cleanArticle);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const removeMarkdownFromArticle = () => {
      // Remove the code block markers and the language identifier
      return generatedArticle
        .replace(/```/g, "")
        .replace("html", "")
        .replace("```", "")
        .replace(/`([^`]*)`/g, "$1");
    };

    // getCleanArticle();
  }, [generatedArticle]);

  useEffect(() => {
    const highlightCodeBlocks = () => {
      const codeBlocks = document.querySelectorAll("pre code");

      codeBlocks.forEach((block) => {
        hljs.highlightElement(block);
      });
    };

    highlightCodeBlocks();
  }, [article]);

  const handleSubmitArticleToDB = async () => {
    try {
      const new_article = new ArticleObject(
        articleData.topic,
        articleData.tone,
        articleData.article_type,
        articleData.keywords,
        articleData.target_audience,
        articleData.article_length,
        articleData.key_points,
        articleData.primary_goal,
        articleData.avoidable_instructions,
        articleData.additional_instructions,
        articleData.call_to_action,
        articleData.article_focused_on,
        articleData.inspiration,
        article
      );

      const { error: insertError } = await supabase
        .from("articles")
        .insert(new_article);

      if (insertError) {
        setError(insertError.message);
        console.error(insertError.message);
        return;
      }

      const { data: articleId, error: articleIdError } = await supabase
        .from("articles")
        .select("id")
        .eq("topic", articleData.topic)
        .single();

      if (articleIdError) {
        setError(articleIdError.message);
        console.error(articleIdError.message);
        return;
      }

      router.push(`/dashboard/create-article/${articleId.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content w-full flex flex-col gap-y-3 overflow-y-auto">
      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="flex justify-center items-center h-full w-full">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <>
            {article ? (
              <div className="flex flex-col gap-3 px-8 ">
                <div className="flex flex-col gap-3 h-[83.5vh] overflow-y-auto">
                  <HTMLConverter article={article} />
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={() => handleSubmitArticleToDB()}
                    size={"xl"}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Publish
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full w-full">
                <p className="text-gray-500">No article generated yet</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContentDisplayer;
