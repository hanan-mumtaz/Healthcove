import React from "react";
import {
  Calendar,
  User,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  ArrowLeft,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";

// ----------------------------
// Static Post Data (moves out of component for optimization)
// ----------------------------
const POST_DATA = {
  title: "The Science Behind Intuitive Eating",
  content: `
    <h2>Understanding Your Body's Signals</h2>
    <p>Intuitive eating is a framework that helps you tune into your body's natural hunger and fullness signals...</p>

    <h2>The Ten Principles of Intuitive Eating</h2>
    <p>1. Reject the Diet Mentality<br>2. Honor Your Hunger<br>3. Make Peace with Food...</p>
  `,
  image:
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=2000",
  date: "March 15, 2024",
  author: "Dr. Sarah Johnson",
  readTime: "8 min read",
  category: "Nutrition Science",
  tags: ["Intuitive Eating", "Mental Health", "Nutrition", "Wellness"],
  relatedPosts: [
    {
      title: "Understanding Macronutrients",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
      date: "March 12, 2024",
    },
    {
      title: "Mindful Eating Practices",
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&q=80&w=800",
      date: "March 10, 2024",
    },
  ],
};

function SingleBlog() {
  useParams(); // Only needed to trigger route match, no performance issue

  const post = POST_DATA;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="animated-background" />
      </div>
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center text-Lg font-semibold hover:text-Mg transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-Mg">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center text-Dg gap-4 mt-4">
            <span className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {post.author}
            </span>

            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {post.date}
            </span>

            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl mb-10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[450px] object-cover"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-Dg mb-10">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-violet-100 text-Lg px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Social Share */}
        <div className="border-t border-b border-Lg py-6 flex justify-between items-center mb-10">
          <span className="text-Dg">Share this article:</span>

          <div className="flex space-x-4">
            {[Facebook, Twitter, Linkedin].map((Icon) => (
              <button
                key={Icon.name}
                className="text-Dg hover:text-Lg transition-colors"
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        <h2 className="text-2xl text-Dg font-semibold mb-6">Related Articles</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {post.relatedPosts.map((rp) => (
            <div
              key={rp.title}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={rp.image}
                alt={rp.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />

              <div className="p-6">
                <h3 className="font-semibold text-Dg mb-2">{rp.title}</h3>
                <p className="text-Dg text-sm">{rp.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comments */}
        <div className="bg-white/30 rounded-3xl p-8 mt-12 shadow-lg">
          <h2 className="text-2xl text-Dg font-bold mb-6">Comments</h2>

          <textarea
            placeholder="Share your thoughts..."
            className="w-full p-3 rounded-xl border border-Dg focus:ring-2 focus:ring-Lg focus:border-transparent"
            rows={3}
          />

          <button className="mt-4 bg-Mg text-white px-10 py-2 rounded-full hover:bg-Dg transition-colors">
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;