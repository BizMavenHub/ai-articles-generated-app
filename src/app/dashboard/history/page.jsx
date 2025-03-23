import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
    wordsCount: 100,
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

export default function Page() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-semibold">History</h1>
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
            {data.map((article) => {
              return (
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
                    <Button className="bg-red-600 hover:bg-red-700">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
