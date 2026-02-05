import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — CopyForge | E-Commerce Copywriting Tips & AI Insights",
  description:
    "Learn how to write product descriptions that convert. Tips on e-commerce copywriting, AI tools, SEO optimization, and scaling your online store.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-brand-text mb-4">
          Blog
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          E-commerce copywriting tips, AI insights, and strategies to help your
          product listings convert more customers.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-400">No posts yet. Check back soon!</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="card hover:shadow-md hover:border-blue-100 transition-all duration-200 group"
            >
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {post.tags?.length > 0 && (
                  <>
                    <span className="mx-1">·</span>
                    {post.tags.map((tag) => (
                      <span key={tag} className="keyword-highlight text-xs">
                        {tag}
                      </span>
                    ))}
                  </>
                )}
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="font-heading font-bold text-2xl text-brand-text mb-2 group-hover:text-brand-blue transition-colors">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-500 mb-4">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-brand-blue font-medium text-sm hover:gap-2 transition-all"
              >
                Read more <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
