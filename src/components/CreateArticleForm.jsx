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
    article_length: 300,
    content_structure: "",
    additional_instructions: "",
    seo_optimization: false,
    suggest_image_placements: false,
    include_references: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = `Create an article on ${articleData.topic} with a ${
    articleData.writingStyle
  } tone and a ${articleData.tone} writing style. 
    The target audience is ${
      articleData.target_audience
    }, and the article should be ${articleData.article_length} words long. 
    Incorporate relevant keywords such as ${
      articleData.keywords
    } for better discoverability. 
    The content structure should include an introduction that hooks the reader, followed by well-organized sections covering key points, supported by examples or case studies
    if applicable, and a conclusion summarizing the key takeaways with a call to action. Additionally, ensure ${
      articleData.additional_instructions
    }. 
    SEO optimization by including a meta description, keyword placement, and readability improvements.
    Suggest appropriate ${
      articleData.suggest_image_placements ? "image placements" : "no"
    } to enhance engagement and ${
    articleData.include_references ? "include references" : "no"
  } include references to credible sources to support the content. 
    ${
      articleData.seo_optimization ? "Yes" : "No"
    } include image placements where visuals would enhance engagement, and ${
    articleData.seo_optimization ? "Yes" : "No"
  } include references to credible sources to support the content.`;

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
          defaultValue={[300]}
          max={2000}
          step={100}
          onValueChange={(e) =>
            setArticleData({ ...articleData, article_length: e[0] })
          }
        />
      </div>

      <div className="flex flex-col space-y-3">
        <Label htmlFor="topic">Content Structure</Label>
        <Select
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
        </Select>
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
          Generate Article
        </Button>
      </div>
    </form>
  );
};

export default CreateArticleForm;
