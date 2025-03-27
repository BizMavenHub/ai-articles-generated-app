"use client";

import ReactMarkdown from "react-markdown";
import supabase from "@/lib/supabaseClient";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const params = useParams();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticleById = async () => {
      try {
        const res = await supabase
          .from("articles")
          .select("content")
          .eq("id", params.article_id);

        if (res.error) {
          console.log(res.error);
        }
        setArticle(res.data[0].content);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticleById();
  }, [params.article_id]);

  return (
    <div className="container">
      {article ? (
        <ReactMarkdown>{article}</ReactMarkdown>
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default page;
