"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X, Tag, Loader2, Trash2, MessageSquare, TrendingUp, Clock } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { useCommunityPosts, useCreatePost, useDeletePost } from "@/hooks/useApi";
import { useAuthStore } from "@/lib/stores/authStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

const POPULAR_TAGS = ["organic","composting","watering","harvest","soil","pests","seeds","hydroponics","rooftop","tips"];

function PostSkeleton() {
  return (
    <div className="rounded-[20px] border border-white/06 p-6" style={{ background:"rgba(255,255,255,0.02)" }}>
      <div className="mb-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-zinc-800" />
        <div className="space-y-1.5">
          <div className="h-3 w-28 rounded bg-zinc-800" />
          <div className="h-2.5 w-20 rounded bg-zinc-800/60" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-4/5 rounded bg-zinc-800" />
        <div className="h-3 w-full rounded bg-zinc-800/60" />
        <div className="h-3 w-3/4 rounded bg-zinc-800/60" />
      </div>
    </div>
  );
}

function CreatePostModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { mutateAsync, isPending } = useCreatePost();

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t) && tags.length < 5) { setTags(p => [...p, t]); setTagInput(""); }
  };

  const submit = async () => {
    if (!title.trim()) { toast.error("Title is required."); return; }
    if (!content.trim()) { toast.error("Post content is required."); return; }
    try {
      await mutateAsync({ title: title.trim(), postContent: content.trim(), tags });
      toast.success("Post published!");
      onClose();
    } catch {
      toast.error("Failed to publish. Please try again.");
    }
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[28px] p-7"
        style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>New Post</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-zinc-500 hover:text-white transition-colors"><X size={13} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500">Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="What's your post about?"
              className="input-field" style={{ fontSize: 14 }} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500">Content *</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={5} placeholder="Share your farming tips, questions, or experiences..."
              className="input-field resize-none" style={{ fontSize: 13 }} />
            <p className="mt-1 text-right text-xs text-zinc-700">{content.length}/2000</p>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500">Tags <span className="text-zinc-700">(up to 5)</span></label>
            <div className="flex gap-2">
              <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add a tag..." className="input-field flex-1" style={{ fontSize: 13 }} />
              <button onClick={addTag} className="rounded-xl border border-white/10 bg-white/04 px-4 text-xs text-zinc-400 hover:text-white transition-colors">Add</button>
            </div>
            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tags.map(t => (
                  <span key={t} className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/08 px-2.5 py-0.5 text-xs text-emerald-400">
                    #{t}
                    <button onClick={() => setTags(p => p.filter(x => x !== t))} className="hover:text-white transition-colors"><X size={9} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={submit} disabled={isPending}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-black disabled:opacity-70"
          style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 0 20px rgba(34,197,94,0.25)" }}>
          {isPending ? <><Loader2 size={14} className="animate-spin" />Publishing...</> : "Publish Post"}
        </motion.button>
      </motion.div>
    </>
  );
}

export default function CommunityPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const { data, isLoading } = useCommunityPosts({ search: search || undefined, tag: activeTag || undefined, limit: 20 });
  const { mutate: deletePost } = useDeletePost();
  const { user, isAuthenticated } = useAuthStore();
  const posts = data?.data ?? [];

  const handleDelete = (id: string) => {
    deletePost(id, {
      onSuccess: () => toast.success("Post deleted."),
      onError: () => toast.error("Could not delete post."),
    });
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />
      <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Header */}
      <div className="relative overflow-hidden pt-24 pb-14" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%,rgba(34,197,94,0.08) 0%,transparent 70%)" }} />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-8">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#22c55e", fontFamily: "var(--font-dm)" }}>
            Community Forum
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-balance text-4xl font-extrabold text-white md:text-5xl" style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-2px" }}>
            Grow Together.<br /><span style={{ color: "#22c55e" }}>Learn Together.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed" style={{ color: "var(--text-2)", fontFamily: "var(--font-dm)" }}>
            Share farming tips, ask questions, and connect with urban growers worldwide.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <div className="relative w-full max-w-md">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..."
                className="w-full rounded-2xl border border-white/10 bg-white/04 py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-700 outline-none backdrop-blur focus:border-white/20" />
            </div>
            {isAuthenticated ? (
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowCreate(true)}
                className="flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-black whitespace-nowrap"
                style={{ background: "#22c55e", fontFamily: "var(--font-jakarta)" }}>
                <Plus size={14} />New Post
              </motion.button>
            ) : (
              <a href="/login" className="flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm text-zinc-400 hover:border-white/20 hover:text-white transition-all">
                Sign in to post
              </a>
            )}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="sticky top-24 space-y-5">
              <div className="rounded-[20px] border border-white/06 p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="mb-3 flex items-center gap-2">
                  <TrendingUp size={13} style={{ color: "#22c55e" }} />
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Popular Tags</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button onClick={() => setActiveTag("")}
                    className={cn("rounded-full border px-2.5 py-1 text-xs font-medium transition-all", activeTag === "" ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-white/06 text-zinc-600 hover:border-white/12 hover:text-zinc-400")}>
                    All
                  </button>
                  {POPULAR_TAGS.map(tag => (
                    <button key={tag} onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
                      className={cn("rounded-full border px-2.5 py-1 text-xs font-medium transition-all", activeTag === tag ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-white/06 text-zinc-600 hover:border-white/12 hover:text-zinc-400")}>
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-[20px] border border-white/06 p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="mb-3 flex items-center gap-2">
                  <MessageSquare size={13} style={{ color: "#22c55e" }} />
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Forum Stats</p>
                </div>
                {[["Total Posts", posts.length || "—"], ["Active Members", "2,400+"], ["Topics Covered", "50+"]].map(([k, v]) => (
                  <div key={k as string} className="flex items-center justify-between py-2 border-b border-white/04 last:border-0">
                    <span className="text-xs text-zinc-600" style={{ fontFamily: "var(--font-dm)" }}>{k}</span>
                    <span className="text-xs font-semibold text-zinc-300" style={{ fontFamily: "var(--font-mono)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Posts feed */}
          <div className="flex-1 min-w-0 space-y-4">
            {isLoading
              ? Array(6).fill(0).map((_, i) => <PostSkeleton key={i} />)
              : posts.length === 0
              ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-[24px] border border-white/06 py-20 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <MessageSquare size={36} className="text-zinc-700" />
                  <p className="text-lg font-semibold text-zinc-400" style={{ fontFamily: "var(--font-jakarta)" }}>No posts yet</p>
                  <p className="text-sm text-zinc-700">Be the first to share something with the community.</p>
                </div>
              )
              : posts.map((post, i) => (
                <motion.article key={post.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group rounded-[20px] border border-white/06 p-6 transition-all duration-200 hover:border-white/12"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-black"
                        style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)" }}>
                        {post.user?.name?.[0]?.toUpperCase() ?? "U"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-200">{post.user?.name ?? "Anonymous"}</p>
                        <div className="flex items-center gap-2 text-xs text-zinc-600">
                          <span style={{ fontFamily: "var(--font-dm)" }}>{post.user?.role}</span>
                          <span>·</span>
                          <Clock size={10} />
                          <span>{formatDate(post.postDate)}</span>
                        </div>
                      </div>
                    </div>
                    {user && (user.id === post.userId || user.role === "ADMIN") && (
                      <button onClick={() => handleDelete(post.id)}
                        className="opacity-0 transition-opacity group-hover:opacity-100 flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                  <h2 className="mb-2 text-base font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>{post.title}</h2>
                  <p className="mb-4 text-sm leading-relaxed text-zinc-500 line-clamp-3">{post.postContent}</p>
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map(tag => (
                        <button key={tag} onClick={() => setActiveTag(tag)}
                          className="flex items-center gap-1 rounded-full border border-white/06 px-2.5 py-0.5 text-xs text-zinc-600 transition-all hover:border-emerald-500/20 hover:text-emerald-400">
                          <Tag size={9} />#{tag}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.article>
              ))}
          </div>
        </div>
      </div>

      <AnimatePresence>{showCreate && <CreatePostModal onClose={() => setShowCreate(false)} />}</AnimatePresence>
      <FooterSection />
    </div>
  );
}
