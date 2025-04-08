"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = () => {
  const [keywordInput, setKeywordInput] = useState("");

  const [keyword, setKeyword] = useState([]);
  const [relatedKeywords, setRelatedKeywords] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchKeyword = async (e) => {
    try {
      e.preventDefault(); // Prevent the default form submission behavior

      if (!keywordInput) {
        setError(new Error("Please enter a keyword."));
        return;
      }

      const url = `https://ai-google-keyword-research-planner.p.rapidapi.com/global-volume?keyword=${keywordInput}`;

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
      const res = await fetch(url, options);

      if (res.status === 429) {
        setError(new Error(`Rate limit exceeded. Please try again later.`));
        return;
      }

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

  return (
    <form onSubmit={fetchKeyword} className="px-8 pb-8 flex flex-col space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Keyword Research</h1>
        <p className="text-gray-500 mt-1">
          Discover high-value keywords for your SEO strategy.
        </p>
      </div>

      <div>
        <Input
          placeholder="Search for keywords"
          className="w-full"
          onChange={(e) => setKeywordInput(e.target.value)}
        />
      </div>

      {error ? (
        <div className="text-red-500">Error: {error.message}</div>
      ) : (
        <section className="flex flex-col space-y-4">
          <div className="display-keyword-research">
            {keyword.length > 0 ? (
              <>
                <h2 className="text-lg font-semibold ">
                  Searching for:{" "}
                  <span className="text-gray-500">{keyword.keyword}</span>
                </h2>

                <div className="searching-keyword overflow-x-auto">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
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
                  )}
                </div>
              </>
            ) : (
              <p className="text-gray-500">Enter a keyword to search.</p>
            )}
          </div>
        </section>
      )}
    </form>
  );
};

export default page;
