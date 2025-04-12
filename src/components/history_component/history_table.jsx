"use client";

import { useState, useEffect } from "react";

import { useHistoryContext } from "@/context/historyContext";
import supabase from "@/lib/supabaseClient";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

const HistoryTable = () => {
  const searchInput = useHistoryContext();

  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase.from("articles").select("*");

        if (error) {
          console.log(error);
          return;
        }

        setArticles(data);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDeleteArticle = async (id) => {
    try {
      const { error } = await supabase.from("articles").delete().eq("id", id);

      if (error) {
        console.log(error);
        return;
      }

      setArticles((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Article deleted successfully");
    }
  };

  const filteredArticles = articles.filter(
    (item) =>
      item.topic.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.content.toLowerCase().includes(searchInput.toLowerCase()) ||
      new Date(item.created_at).toLocaleDateString().includes(searchInput) ||
      item.id.toString().includes(searchInput) ||
      item.article_length.toString().includes(searchInput)
  );

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
        </div>
      ) : (
        <>
          {filteredArticles.length === 0 ? (
            <div className="flex justify-center items-center">
              <h1 className="text-3xl">No article found</h1>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">ID</TableHead>
                  <TableHead className="w-[15vw]">Title</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead className="">Date</TableHead>
                  <TableHead className="">Words Count</TableHead>
                  <TableHead className="text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.id}</TableCell>
                    <TableCell
                      className="w-[20vw] underline cursor-pointer underline-offset-2 font-bold text-indigo-500"
                      onClick={() =>
                        (window.location.href = `/dashboard/article/${article.id}`)
                      }>
                      {article.topic}
                    </TableCell>
                    <TableCell className="whitespace-pre-line w-[40vw] line-clamp-4">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: article.content
                            .replace(/```/g, "")
                            .replace("html", "")
                            .replace(/<[^>]+>/g, "")
                            .trim(),
                        }}></div>
                    </TableCell>
                    <TableCell>
                      {new Date(article.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {article.article_length}
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">...</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-fit p-4 flex flex-col space-y-2 z-10">
                          <Button
                            onClick={() =>
                              (window.location.href = `/dashboard/edit-article/${article.id}`)
                            }
                            variant="default"
                            className="w-[5vw] bg-indigo-600 hover:bg-indigo-700 text-white">
                            Edit
                          </Button>
                          <Button
                            variant="default"
                            className="w-[5vw] bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleDeleteArticle(article.id)}>
                            Delete
                          </Button>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default HistoryTable;
