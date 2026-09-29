"use client";
import { PostCards, announcementPosts } from "@/components/admin/cms-staff-ui";
export default function Page() {
  return <PostCards title="Announcements" sub="Manage public announcements shown on the website." cta="Create Announcement" posts={announcementPosts} />;
}
