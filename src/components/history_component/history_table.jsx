"use client";

import { useState, useEffect } from "react";

import { useHistoryContext } from "@/context/historyContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const filteredArticles = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.content.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.date.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.id.toString().includes(searchInput) ||
      item.wordsCount.toString().includes(searchInput)
  );

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="">ID</TableHead>
          <TableHead className="">Title</TableHead>
          <TableHead className="">Content</TableHead>
          <TableHead className="">Date</TableHead>
          <TableHead className="">Words Count</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredArticles.map((article) => (
          <TableRow key={article.id}>
            <TableCell className="font-medium">{article.id}</TableCell>
            <TableCell>{article.title}</TableCell>
            <TableCell>{article.content}</TableCell>
            <TableCell>{article.date}</TableCell>
            <TableCell>{article.wordsCount}</TableCell>
            <TableCell className="justify-center gap-2 flex">
              <Button
                variant="default"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Download
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HistoryTable;
