"use client";
import { PostCards, newsPosts } from "@/components/admin/cms-staff-ui";
export default function Page() {
  return <PostCards title="News" sub="Manage news posts shown on the website." cta="Create News" posts={newsPosts} />;
}
