import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { blogs } from "~/blogs";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const title = params["title"];
  if (!title) {
    throw new Response("Not Found", { status: 404 });
  }
  console.log({
    title,
    encodedTitle: encodeURIComponent(title),
    encodedBlogTitles: blogs.map((blog) => encodeURIComponent(blog.title)),
  });
  const blog = blogs.find((blog) => {
    console.log({
      dbTitle: blog.title,
      encodedDbTitle: encodeURIComponent(blog.title),
      pathTitle: title,
    });
    return encodeURIComponent(blog.title) === encodeURIComponent(title);
  });
  if (!blog) {
    throw new Response("Not Found", { status: 404 });
  }
  return { blog };
};

export default function Blog() {
  const { blog } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{blog.title}</h1>
    </div>
  );
}
