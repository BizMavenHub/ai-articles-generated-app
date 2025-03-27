"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

const data = [
  {
    id: 1,
    title: "This is the title of the article",
    content: "This is the content of the article",
    date: "2023-01-01",
    wordsCount: 100,
  },
  {
    id: 2,
    title: "This is the title of the article",
    content: "This is the content of the article",
    date: "2023-01-01",
    wordsCount: 110,
  },
  {
    id: 3,
    title: "This is the title of the article",
    content: "This is the content of the article",
    date: "2023-01-01",
    wordsCount: 100,
  },
  {
    id: 4,
    title: "This is the title of the article",
    content: "This is the content of the article",
    date: "2023-01-01",
    wordsCount: 100,
  },
];

const HistoryTable = () => {
  const searchInput = useHistoryContext();

  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(false);

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
      item.date.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.id.toString().includes(searchInput) ||
      item.wordsCount.toString().includes(searchInput)
  );

  return (
    <>
      {loading || filteredArticles.length === 0 ? (
        <div className="flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">ID</TableHead>
              <TableHead className="">Title</TableHead>
              <TableHead className="">Content</TableHead>
              <TableHead className="">Date</TableHead>
              <TableHead className="">Words Count</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">
                  <Link
                    className="hover:text-indigo-600 underline-offset-2 hover:underline"
                    href={"create-article/" + article.id}>
                    {article.id}
                  </Link>
                </TableCell>
                <TableCell>{article.topic}</TableCell>
                <TableCell className="whitespace-pre-line line-clamp-4">
                  {article.content}
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
                    <DropdownMenuContent className="w-fit p-4 flex flex-col space-y-2">
                      <Button
                        variant="default"
                        className="w-[5vw] bg-indigo-600 hover:bg-indigo-700 text-white">
                        Edit
                      </Button>
                      <Button
                        variant="default"
                        className="w-[5vw] bg-green-600
                    hover:bg-green-700 text-white"
                        asChild>
                        <Link href={`/dashboard/create-article/${article.id}`}>
                          View
                        </Link>
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
  );
};

export default HistoryTable;
