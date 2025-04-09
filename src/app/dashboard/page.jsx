"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

// Icons

// Components
import HistorySearchInput from "@/components/history_component/history_search_input";
import Link from "next/link";

export default function Page() {
  const [session, setSession] = useState(null);

  const [totalArticle, setTotalArticle] = useState(0);
  const [totalArticleThisMonth, setTotalArticleThisMonth] = useState(0);
  const [totalWords, setTotalWords] = useState(0);

  const [totalArticleLastMonth, setTotalArticleLastMonth] = useState(0);
  const [totalWordsLastMonth, setTotalWordsLastMonth] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const userSession = await supabase.auth.getSession();

      setSession(userSession.data.session);

      if (!userSession.data.session) {
        router.push("/sign-in");
      }
    };

    const fetchTotalArticle = async () => {
      const { data, error } = await supabase.from("articles").select("*");

      if (error) {
        console.log(error);
      }

      console.log(data);

      setTotalArticle(data.length);
    };

    const fetchTotalArticleThisMonth = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .gte(
          "created_at",
          new Date().toISOString().slice(0, 7) + "-01T00:00:00.000Z"
        );

      if (error) {
        console.error(error);
      }

      setTotalArticleThisMonth(data.length);
    };

    const fetchTotalWords = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("article_length");

      if (error) {
        console.error(error);
      }

      setTotalWords(data.reduce((acc, item) => acc + item.article_length, 0));
    };

    const fetchTotalArticleLastMonth = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .gte(
          "created_at",
          new Date().toISOString().slice(0, 7) + "-01T00:00:00.000Z"
        )
        .lte(
          "created_at",
          new Date().toISOString().slice(0, 7) + "-31T23:59:59.000Z"
        );

      if (error) {
        console.error(error);
      }

      setTotalArticleLastMonth(data.length);
    };

    const fetchTotalWordsLastMonth = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("article_length")
        .gte(
          "created_at",
          new Date().toISOString().slice(0, 7) + "-01T00:00:00.000Z"
        )
        .lte(
          "created_at",
          new Date().toISOString().slice(0, 7) + "-31T23:59:59.000Z"
        );

      if (error) {
        console.error(error);
      }

      setTotalWordsLastMonth(
        data.reduce((acc, item) => acc + item.article_length, 0)
      );
    };

    checkSession();
    fetchTotalArticle();
    fetchTotalArticleThisMonth();
    fetchTotalWords();
    fetchTotalArticleLastMonth();
    fetchTotalWordsLastMonth();
  }, [router]);

  if (!session) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-4xl font-semibold my-4">Dashboard</h1>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {/* Total Articles */}
          <section className="h-[20vh] rounded-xl bg-muted/50 p-8 flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Total Articles</h2>
            </div>
            <span className="text-5xl font-bold">{totalArticle}</span>
            <p className="text-sm text-gray-600">
              +{totalArticleLastMonth} from last month
            </p>
          </section>

          {/* Total Articles This Month */}
          <section className="h-[20vh] rounded-xl bg-muted/50 p-8 flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Articles This Month</h2>
            </div>
            <span className="text-5xl font-bold">{totalArticleThisMonth}</span>
            <p className="text-sm text-gray-600">
              +{totalArticleLastMonth} from last month
            </p>
          </section>

          {/* Total Word Count */}
          <section className="h-[20vh] rounded-xl bg-muted/50 p-8 flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Total Words Count</h2>
            </div>
            <span className="text-5xl font-bold">{totalWords}</span>
            <p className="text-sm text-gray-600">
              +{totalWordsLastMonth} from last month
            </p>
          </section>
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <section className="h-[60vh] flex flex-col space-y-6 rounded-xl bg-muted/50 p-6">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">Articles</h2>
              <Link
                href="/dashboard/create-article"
                className="bg-indigo-600 h-fit text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 hover:text-white transition duration-150 ease-in"
              >
                New Article
              </Link>
            </div>

            <div>
              <HistorySearchInput />
            </div>
          </section>

          <section className="h-[60vh] flex flex-col space-y-6 rounded-xl bg-muted/50 p-6">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">Trending Keywords</h2>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
