import React, { useEffect, useMemo, useState } from "react";
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
import API from "../services/api";

function SingleBlog() {
  const { id } = useParams();
  const [post, setPost] = useState<any | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('Missing article identifier.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [postResponse, listResponse] = await Promise.all([
          API.get(`/blogs/${id}?public=true`),
          API.get('/blogs?public=true'),
        ]);

        const fetchedPost = postResponse.data;
        setPost(fetchedPost);

        const related = Array.isArray(listResponse.data)
          ? listResponse.data.filter((item: any) => item._id !== fetchedPost._id && item.category === fetchedPost.category).slice(0, 2)
          : [];

        setRelatedPosts(related);
      } catch (err) {
        console.error('Failed to load blog article', err);
        setError('This article could not be loaded right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const tags = useMemo(() => {
    if (!post) return [];
    if (Array.isArray(post.tags) && post.tags.length > 0) return post.tags;
    return post.category ? [post.category] : [];
  }, [post]);

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    if (!post) return;
    const url = window.location.href;
    const title = post.title;
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-16 flex items-center justify-center">
        <ParticleBackground />
        <div className="relative z-10 text-slate-700 font-medium">Loading article...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-16 flex items-center justify-center">
        <ParticleBackground />
        <div className="relative z-10 max-w-xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Article unavailable</h1>
          <p className="text-slate-600 mb-8">{error || 'The requested article could not be found.'}</p>
          <Link to="/blog" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-Mg to-Lg text-white font-bold">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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
              {post.author?.name || post.author?.displayName || 'Areej Fatima'}
            </span>

            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>

            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime || '5 min read'}
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl mb-10">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[450px] object-cover"
              loading="lazy"
            />
          ) : null}
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-Dg mb-10">
          <div className="whitespace-pre-line leading-8 text-lg">{post.content}</div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((tag: string) => (
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
            {[
              { Icon: Facebook, platform: 'facebook' as const },
              { Icon: Twitter, platform: 'twitter' as const },
              { Icon: Linkedin, platform: 'linkedin' as const },
            ].map(({ Icon, platform }) => (
              <button
                key={platform}
                type="button"
                onClick={() => handleShare(platform)}
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
          {relatedPosts.length > 0 ? relatedPosts.map((rp) => (
            <div
              key={rp._id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              {rp.image ? (
                <img
                  src={rp.image}
                  alt={rp.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              ) : null}

              <div className="p-6">
                <h3 className="font-semibold text-Dg mb-2">{rp.title}</h3>
                <p className="text-Dg text-sm">{new Date(rp.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
          )) : (
            <div className="col-span-full bg-white/30 rounded-3xl p-8 text-center text-Dg shadow-lg">
              More articles will appear here soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;