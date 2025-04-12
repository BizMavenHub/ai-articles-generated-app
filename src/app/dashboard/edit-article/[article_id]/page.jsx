"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

import supabase from "@/lib/supabaseClient";

//components
import { Button } from "@/components/ui/button";
import ArticleEditor from "@/components/text_editor/ArticleEditor";

const page = () => {
  const { article_id } = useParams();

  const router = useRouter();

  const [articleContent, setArticleContent] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("id", article_id);

        if (error) {
          console.log(error);
        }

        const rawArticleContent = data[0].content;

        setArticleContent(rawArticleContent);
      } catch (error) {
        console.log(error);
      }
    };

    getArticle();
  }, [article_id]);

  const handleSubmitEditedArticle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("articles")
        .update({
          content: articleContent,
        })
        .eq("id", article_id);

      if (error) {
        console.log(error);
        return;
      }

      alert("article edited successfully");
      router.push("/dashboard/article/" + article_id);

      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(articleContent);

  return (
    <div className="px-8 pb-12">
      <div className="mb-4 flex flex-col space-y-1">
        <h1 className="text-2xl font-bold">Edit Article</h1>
        <p className="text-gray-500">start making changes with your article</p>
      </div>

      <ArticleEditor
        articleContent={articleContent}
        setArticleContent={setArticleContent}
      />

      <div className="flex justify-end">
        <Button
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-lg"
          variant="default"
          onClick={handleSubmitEditedArticle}
          disabled={!articleContent}>
          {loading ? "Editing..." : "Edit Article"}
        </Button>
      </div>
    </div>
  );
};

export default page;
