import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { ArrowLeft, Calendar, Zap } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — CopyForge Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      siteName: "CopyForge",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-brand-blue text-sm font-medium mb-8 hover:gap-2 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
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
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-text leading-tight">
          {post.title}
        </h1>
        <p className="text-lg text-gray-500 mt-4">{post.description}</p>
      </header>

      <div
        className="prose prose-lg prose-gray max-w-none
          prose-headings:font-heading prose-headings:text-brand-text
          prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
          prose-strong:text-brand-text
          prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      />

      {/* CTA */}
      <div className="mt-12 card bg-gradient-to-br from-brand-blue to-blue-700 border-0 text-center py-10 px-6">
        <h2 className="font-heading font-bold text-2xl text-white mb-3">
          Ready to write better product descriptions?
        </h2>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Try CopyForge free — generate SEO-optimized descriptions for Shopify,
          Amazon, Etsy and more in seconds.
        </p>
        <Link
          href="/app"
          className="bg-white text-brand-blue px-6 py-3 rounded-btn font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
        >
          <Zap className="w-5 h-5" />
          Start Generating — Free
        </Link>
      </div>
    </article>
  );
}
