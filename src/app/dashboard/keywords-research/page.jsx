"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

import { relatedKeywordsData, keywordData } from "@/app/utils/data";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = () => {
  const [keyword, setKeyword] = useState(keywordData);
  const [relatedKeywords, setRelatedKeywords] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKeyword = async () => {
      const url = `https://ai-google-keyword-research-planner.p.rapidapi.com/global-volume?keyword=email%20marketing`;

      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "be1a737ddamshe78d37a54a9b166p18609djsnc5d07e7f184b",
          "x-rapidapi-host":
            "ai-google-keyword-research-planner.p.rapidapi.com",
        },
      };

      setLoading(true);
      try {
        const res = await fetch(url, options);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();

        setKeyword(data["Global Keyword Data"]);

        setRelatedKeywords(data["Related Keyword Data (Global)"].slice(0, 50));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeyword();
  }, []);

  return (
    <div className="px-8 pb-8 flex flex-col space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Keyword Research</h1>
        <p className="text-gray-500 mt-1">
          Discover high-value keywords for your SEO strategy.
        </p>
      </div>

      <div>
        <Input placeholder="Search for keywords" className="w-full" />
      </div>

      {error ? (
        <div className="text-red-500">Error: {error.message}</div>
      ) : (
        <section className="flex flex-col space-y-4">
          <div className="display-keyword-research">
            <h2 className="text-lg font-semibold ">
              Searching for:{" "}
              <span className="text-gray-500">Chocolate Ice Cream</span>
            </h2>
          </div>

          <div className="searching-keyword overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Ranking</TableHead>
                  <TableHead>High CPC:</TableHead>
                  <TableHead>Low CPC</TableHead>
                  <TableHead>Avg Monthly Searches</TableHead>
                  <TableHead>Keyword Competition</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keyword.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.keyword}</TableCell>
                    <TableCell>{item.competition_index}</TableCell>
                    <TableCell>{item["High CPC"]}</TableCell>
                    <TableCell>{item["Low CPC"]}</TableCell>
                    <TableCell>{item.avg_monthly_searches}</TableCell>
                    <TableCell>{item.competition_value}</TableCell>
                  </TableRow>
                ))}
                <p className="w-full mb-1 font-medium mt-6 ml-1">
                  Related Keywords
                </p>
                {relatedKeywords.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.keyword}</TableCell>
                    <TableCell>{item.competition_index}</TableCell>
                    <TableCell>{item["High CPC"]}</TableCell>
                    <TableCell>{item["Low CPC"]}</TableCell>
                    <TableCell>{item.avg_monthly_searches}</TableCell>
                    <TableCell>{item.competition_value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      )}
    </div>
  );
};

export default page;
