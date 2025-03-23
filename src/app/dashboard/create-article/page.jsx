import React from "react";

import CreateArticleForm from "@/components/CreateArticleForm";

const page = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-6 px-8 pt-0">
      <div className="flex gap-2 flex-col">
        <h1 className="text-3xl font-semibold">Create Article</h1>
        <p className="text-gray-600">
          Fill in the details below to generate a new article.
        </p>
      </div>

      <CreateArticleForm />
    </div>
  );
};

export default page;
