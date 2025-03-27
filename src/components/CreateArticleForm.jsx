"use client";

import { useState, useEffect } from "react";

import supabase from "@/lib/supabaseClient";

// Components
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateArticleForm = () => {
  const [articleData, setArticleData] = useState({
    topic: "",
    writingStyle: "",
    tone: "",
    keywords: "",
    target_audience: "",
    article_length: 1000,
    content_structure: "",
    additional_instructions: "",
    seo_optimization: false,
    suggest_image_placements: false,
    include_references: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = `
  Topic: ${articleData.topic}
  Tone: ${articleData.tone}
  Writing Style: ${articleData.writingStyle}
  Target Audience: ${articleData.target_audience}
  Word Count: ${articleData.article_length} words
  
  Structure:
  ${articleData.content_structure}

  Additional Instructions:
  ${articleData.additional_instructions}
  
  SEO & Keyword Optimization
  Keywords: ${articleData.keywords}
  
  SEO Considerations:
  ${
    articleData.seo_optimization ? "Include" : "Don't include"
  } an engaging meta description summarizing the article.
  Ensure readability improvements for better user experience.
  Strategically place keywords for better discoverability.
  
  Additional Requirements
  Image Placements: ${
    articleData.suggest_image_placements ? "Include" : "Don't include"
  } suggested image placements, such as diagrams explaining type annotations and TypeScript project setup screenshots.
  References: ${
    articleData.suggest_image_placements ? "Include" : "Don't include"
  } references to credible sources like the official TypeScript documentation and popular developer blogs.`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/generated-article-with-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: query,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        console.log(data.error);
        return;
      }

      const { error: insertError } = await supabase.from("articles").insert({
        topic: articleData.topic,
        writing_style: articleData.writingStyle,
        tone: articleData.tone,
        keywords: articleData.keywords,
        target_audience: articleData.target_audience,
        article_length: articleData.article_length,
        content_structure: articleData.content_structure,
        additional_instructions: articleData.additional_instructions,
        seo_optimization: articleData.seo_optimization,
        suggest_image_placements: articleData.suggest_image_placements,
        include_references: articleData.include_references,
        content: data.context,
      });

      if (insertError) {
        setError(insertError.message);
        console.log(insertError.message);
        return;
      }

      setError(null);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6 pb-6" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-3">
        <Label htmlFor="topic">Topic</Label>
        <Input
          required
          placeholder="Enter a topic"
          onChange={(e) =>
            setArticleData({ ...articleData, topic: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="topic">Writing Styles</Label>
          <Select
            required
            onValueChange={(e) =>
              setArticleData({ ...articleData, writingStyle: e })
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a writing style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="narrative">Narrative</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
              <SelectItem value="explanatory">Explanatory</SelectItem>
              <SelectItem value="informative">Informative</SelectItem>
              <SelectItem value="argumentative">Argumentative</SelectItem>
              <SelectItem value="descriptive">Descriptive</SelectItem>
              <SelectItem value="analytical">Analytical</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="topic">Tones</Label>
          <Select
            required
            onValueChange={(e) => setArticleData({ ...articleData, tone: e })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="informal">Informal</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="exciting">Exciting</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
              <SelectItem value="motivational">Motivational</SelectItem>
              <SelectItem value="inspirational">Inspirational</SelectItem>
              <SelectItem value="optimistic">Optimistic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <Label htmlFor="topic">Keywords (comma separated)</Label>
        <Textarea
          placeholder="Enter keywords"
          className="resize-none h-[10vh]"
          onChange={(e) =>
            setArticleData({ ...articleData, keywords: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col space-y-3">
        <Label htmlFor="topic">Target Audience</Label>
        <Select
          onValueChange={(e) =>
            setArticleData({ ...articleData, target_audience: e })
          }>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a target audience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginners">Beginners</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <Label htmlFor="topic">Article Length</Label>
          <Label htmlFor="topic">{articleData.article_length} words</Label>
        </div>
        <Slider
          defaultValue={[1000]}
          max={5000}
          step={100}
          onValueChange={(e) =>
            setArticleData({ ...articleData, article_length: e[0] })
          }
        />
      </div>

      <div className="flex flex-col space-y-3">
        <Label htmlFor="topic">Content Structure</Label>
        {/* <Select
          required
          onValueChange={(e) =>
            setArticleData({
              ...articleData,
              content_structure: e,
            })
          }>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a content structure" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tutorial">Tutorial</SelectItem>
            <SelectItem value="listicle">Listicle</SelectItem>
            <SelectItem value="comparison">Comparison</SelectItem>
            <SelectItem value="case-study">Case Study</SelectItem>
            <SelectItem value="opinion">Opinion</SelectItem>
            <SelectItem value="news-trends-article">
              News & Trends Article
            </SelectItem>
            <SelectItem value="beginners-guide">Beginner Guide</SelectItem>
          </SelectContent>
        </Select> */}
        <Textarea
          placeholder={`Introduction: ...

Main Section: ...

Conclusion: ...`}
          className="resize-none h-[14vh]"
          cols={5}
        />
      </div>

      <div className="flex flex-col space-y-3">
        <Label htmlFor="topic">Additional Instructions</Label>
        <Textarea
          placeholder="Enter more instructions"
          className="resize-none h-[10vh]"
          onChange={(e) =>
            setArticleData({
              ...articleData,
              additional_instructions: e.target.value,
            })
          }
        />
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="seo-optimization" className="">
            SEO Optimization
          </Label>
          <Switch
            id="seo-optimization"
            onCheckedChange={(e) => {
              setArticleData({
                ...articleData,
                seo_optimization: e,
              });
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="suggest-image-placements" className="">
            Suggesst Image Placements
          </Label>
          <Switch
            id="suggest-image-placements"
            onCheckedChange={(e) => {
              setArticleData({
                ...articleData,
                suggest_image_placements: e,
              });
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="include-references" className="">
            Include References
          </Label>
          <Switch
            id="include-references"
            onCheckedChange={(e) => {
              setArticleData({
                ...articleData,
                include_references: e,
              });
            }}
          />
        </div>
      </div>

      <div className="float-right">
        <Button type="submit" size={"xl"}>
          {loading ? (
            <>
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </>
          ) : (
            "Generate Article"
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateArticleForm;
