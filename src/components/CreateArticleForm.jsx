"use client";

import { useState, useEffect } from "react";

import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

// Components
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ContentDisplayer from "@/components/create_article_component/ContentDisplayer";

const CreateArticleForm = () => {
  const [articleData, setArticleData] = useState({
    topic: "",
    article_type: "",
    tone: "",
    key_points: "",
    primary_goal: "",
    target_audience: "",
    article_length: 1500,
    keywords: "",
    avoidable_instructions: "",
    additional_instructions: "",
    call_to_action: "",
    inspiration: "",
    article_focused_on: "",
  });

  const [generatedArticle, setGeneratedArticle] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = `Generate a ${articleData.article_type} article on the topic of "${articleData.topic}" in html with showing only the body.
    The article should be approximately ${articleData.article_length} words long.

    The desired tone of the article is ${articleData.tone}.

    Key points or sections to include are ${articleData.key_points}.

    The article should aim to ${articleData.primary_goal} and should be written for ${articleData.target_audience}.

    The target audience for this article is ${articleData.target_audience}.

    Avoid ${articleData.avoidable_instructions} in the article.

    Include ${articleData.key_points} in the article.

    ${articleData.additional_instructions}

    Meta Information:
    Based on the content of the generated article, please also provide:
    Meta Description: A concise and engaging summary of the article's content, ideally around 150-160 characters (including spaces). This description should entice readers to click on the article in search engine results.
    Meta Keywords: A list of approximately 5-10 relevant keywords or short phrases that people might use to search for this article. Separate each keyword/phrase with a comma.
    And don't forget to show it in the html after the article.

    Optional additions:
    - Consider including a call to action such as ${articleData.call_to_action} at the end of the article.
    - The article should be written with a focus on ${articleData.article_focused_on} to provide a unique perspective.
    - Draw inspiration from ${articleData.inspiration} to enhance the article's depth and relevance.
    - Have a table of content that could that the reader to the key points and sections of the article. ( Must have )
    - Don't forget to include a meta description and meta keywords. ( Must have )`;

  const handleGenerateArticle = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!checkIfTitleExist(articleData.topic)) {
        setError("That title is already existed, choose another one.");
        return;
      }

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

      console.log(data);

      setGeneratedArticle(data.content);
      setIsGenerated(true);

      setError(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfTitleExist = async (title) => {
    const { data: articleTitle, error: articleTitleError } = await supabase
      .from("articles")
      .select("*")
      .eq("topic", title);

    if (articleTitleError) {
      setError(articleTitleError.message);
      console.error(articleTitleError.message);
      return;
    }

    if (articleTitle.length === 0) {
      return true;
    }

    return false;
  };

  return (
    <div className="flex gap-8 px-8 h-[90vh] overflow-y-auto">
      <form className="pb-4 w-[35vw]">
        {step === 1 ? (
          <div className="flex flex-col space-y-7">
            {/* Topic */}
            <div className="flex flex-col space-y-3">
              <Label htmlFor="topic">Topic</Label>
              <Textarea
                id="topic"
                placeholder="Enter a topic"
                required
                value={articleData.topic}
                onChange={(e) =>
                  setArticleData({ ...articleData, topic: e.target.value })
                }
                className="resize-none h-[6vh]"
              />
            </div>

            {/* Article Type */}
            <div className="flex flex-col space-y-3">
              <Label htmlFor="topic">Article Type</Label>
              <Select
                value={articleData.article_type}
                required
                onValueChange={(e) =>
                  setArticleData({ ...articleData, article_type: e })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an article type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="how-to">How-to</SelectItem>
                  <SelectItem value="listicle">Listicle</SelectItem>
                  <SelectItem value="opinion">Opinion</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Target Audience & Tones */}
            <div className="grid grid-cols-2 gap-3">
              {/* Target Audience */}
              <div className="flex flex-col space-y-3">
                <Label htmlFor="topic">Target Audience</Label>
                <Select
                  value={articleData.target_audience}
                  required
                  onValueChange={(e) =>
                    setArticleData({ ...articleData, target_audience: e })
                  }
                >
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

              {/* Tones */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="topic">Tones</Label>
                <Select
                  required
                  value={articleData.tone}
                  onValueChange={(e) =>
                    setArticleData({ ...articleData, tone: e })
                  }
                >
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

            {/* Article Length */}
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="topic">Article Length</Label>
                <Label htmlFor="topic">
                  {articleData.article_length} words
                </Label>
              </div>
              <Slider
                defaultValue={[1500]}
                value={[articleData.article_length]}
                max={5000}
                min={1000}
                step={100}
                onValueChange={(e) =>
                  setArticleData({ ...articleData, article_length: e[0] })
                }
              />
            </div>

            {/* Keywords */}
            <div className="flex flex-col space-y-3">
              <Label htmlFor="topic">Keywords (comma separated)</Label>
              <Textarea
                placeholder="Enter keywords"
                className="resize-none h-[8vh]"
                value={articleData.keywords}
                onChange={(e) =>
                  setArticleData({ ...articleData, keywords: e.target.value })
                }
              />
            </div>

            {/* Key Points */}
            <div className="flex flex-col space-y-3">
              <Label htmlFor="key_points">Key Points</Label>
              <Textarea
                className="resize-none h-[10vh]"
                placeholder="List 2-5 essential elements or subtopics you want covered e.g. Break down concepts into very basic terms they can grasp."
              />
            </div>

            {/* Primary Goal */}
            <div className="flex flex-col space-y-3">
              <Label htmlFor="primary_goal">Primary Goal</Label>
              <Textarea
                placeholder="What is the primary goal of the article?"
                className="resize-none h-[10vh]"
                value={articleData.primary_goal}
                onChange={(e) =>
                  setArticleData({
                    ...articleData,
                    primary_goal: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} size={"xl"}>
                Next
              </Button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="flex flex-col space-y-7">
            {/* Avoidable Instructions */}
            <div className="flex flex-col space-y-3">
              <Label htmlFor="topic">Avoidable Instructions</Label>
              <Textarea
                placeholder="Specify anything you don't want the AI to do or include: e.g. overly technical jargon, personal opinions, biased language."
                className="resize-none h-[10vh]"
                value={articleData.avoidable_instructions}
                onChange={(e) =>
                  setArticleData({
                    ...articleData,
                    avoidable_instructions: e.target.value,
                  })
                }
              />
            </div>

            {/* Inspiration Instructions */}
            <div className="flex flex-col space-y-3">
              <Label htmlFor="topic">Inspiration Instructions</Label>
              <Textarea
                placeholder="Mention any specific articles, styles, or sources you want the AI to consider."
                className="resize-none h-[10vh]"
                value={articleData.inspiration}
                onChange={(e) =>
                  setArticleData({
                    ...articleData,
                    inspiration: e.target.value,
                  })
                }
              />
            </div>

            <hr />

            {/* Call to Action Instructions */}
            <div className="flex flex-col space-y-3">
              <Label htmlFor="topic">Call to Action Instructions</Label>
              <Textarea
                placeholder="Specify any call to action you want to include: e.g. 'Read more on our blog', 'Subscribe for updates', 'Contact us for more information'."
                className="resize-none h-[10vh]"
                value={articleData.call_to_action}
                onChange={(e) =>
                  setArticleData({
                    ...articleData,
                    call_to_action: e.target.value,
                  })
                }
              />
            </div>

            {/* Article Focused On Instructions */}
            <div className="flex flex-col space-y-3">
              <Label htmlFor="topic">Article Focused On Instructions</Label>
              <Textarea
                placeholder="Highlight a Specific Angle or Perspective: e.g. the future implications of this technology, the ethical considerations."
                className="resize-none h-[10vh]"
                value={articleData.article_focused_on}
                onChange={(e) =>
                  setArticleData({
                    ...articleData,
                    article_focused_on: e.target.value,
                  })
                }
              />
            </div>

            <hr />

            {/* Additional Instructions */}
            <div className="flex flex-col space-y-3">
              <Label htmlFor="topic">Additional Instructions</Label>
              <Textarea
                placeholder="Specify any Formatting Requirements: e.g. a compelling introduction, clear headings and subheadings, bullet points for lists."
                className="resize-none h-[10vh]"
                value={articleData.additional_instructions}
                onChange={(e) =>
                  setArticleData({
                    ...articleData,
                    additional_instructions: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex gap-x-4 justify-between">
              <Button onClick={() => setStep(1)} size={"xl"}>
                Back
              </Button>

              <div className="flex gap-x-4">
                <Button
                  onClick={(e) => handleGenerateArticle(e)}
                  toast={
                    error
                      ? ("There is an error",
                        {
                          description: error,
                        })
                      : ("Article is generating",
                        {
                          description: "Please be patient!",
                        })
                  }
                  size={"xl"}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? (
                    <>
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </>
                  ) : (
                    <>{isGenerated ? "Regenerate" : "Generate Article "}</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </form>

      <div className="w-full">
        <ContentDisplayer
          generatedArticle={generatedArticle}
          articleData={articleData}
        />
      </div>
    </div>
  );
};

export default CreateArticleForm;
