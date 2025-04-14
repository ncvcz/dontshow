"use client";

import { client } from "@/lib/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const RecentPost = () => {
  const [name, setName] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: recentPost, isPending: isLoadingPosts } = useQuery({
    queryKey: ["get-recent-post"],
    queryFn: async () => {
      const res = await client.post.recent.$get();
      return await res.json();
    },
  });

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const res = await client.post.create.$post({ name });
      return await res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-recent-post"] });
      setName("");
    },
  });

  return (
    <div className="w-full max-w-sm space-y-2 rounded-md bg-black/15 px-8 py-6 text-zinc-100/75 backdrop-blur-lg">
      {isLoadingPosts ? (
        <p className="text-base/6 text-[#ececf399]">Loading posts...</p>
      ) : recentPost ? (
        <p className="text-base/6 text-[#ececf399]">Your recent post: "{recentPost.name}"</p>
      ) : (
        <p className="text-base/6 text-[#ececf399]">You have no posts yet.</p>
      )}
      <form
        onSubmit={e => {
          e.preventDefault();
          createPost({ name });
        }}
        onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            createPost({ name });
          }
        }}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter a title..."
          value={name}
          onChange={e => setName(e.target.value)}
          className="h-12 w-full rounded-md bg-black/50 px-4 py-2 text-base/6 text-zinc-100 ring-2 ring-transparent transition hover:bg-black/75 hover:ring-zinc-800 focus:bg-black/75 focus:ring-zinc-800 focus-visible:outline-none"
        />
        <button
          disabled={isPending}
          type="submit"
          className="bg-brand-700 hover:bg-brand-800 h-12 rounded-md bg-gradient-to-tl from-zinc-300 to-zinc-200 px-10 py-3 text-base/6 font-medium text-zinc-800 ring-2 ring-transparent ring-offset-2 ring-offset-black transition hover:ring-zinc-100 focus-visible:outline-none focus-visible:ring-zinc-100"
        >
          {isPending ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};
