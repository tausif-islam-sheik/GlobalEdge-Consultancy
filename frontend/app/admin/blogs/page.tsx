"use client";
import { PostCards, blogPosts } from "@/components/admin/cms-staff-ui";
export default function Page() {
  return <PostCards title="Blogs" sub="Manage blog posts shown on the website." cta="Create Blog" posts={blogPosts} />;
}
