import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  User,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  ArrowLeft,
  Share2,
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
        <div className="relative z-10 text-Mg font-bold text-xl animate-pulse">Loading article...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-16 flex items-center justify-center">
        <ParticleBackground />
        <div className="relative z-10 max-w-xl mx-auto px-4 text-center bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-xl">
          <h1 className="text-3xl font-bold text-Dg mb-4">Article unavailable</h1>
          <p className="text-slate-600 mb-8">{error || 'The requested article could not be found.'}</p>
          <Link to="/blog" className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-Mg to-Lg text-white font-bold hover:shadow-lg transition-all">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-16 pb-20">
      <div className="animated-background" />
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Top Navigation */}
        <Link
          to="/blog"
          className="inline-flex items-center text-Mg font-bold hover:text-Lg transition-colors mb-8 group bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center flex-wrap gap-2 mb-6">
            {tags.map((tag: string) => (
              <span key={tag} className="bg-gradient-to-r from-Mg to-Lg text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-Dg leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm font-medium text-slate-600">
            <div className="flex items-center bg-white/60 px-4 py-2 rounded-full shadow-sm">
              <User className="w-4 h-4 text-Mg mr-2" />
              {post.author?.name || post.author?.displayName || 'Areej Fatima'}
            </div>
            <div className="flex items-center bg-white/60 px-4 py-2 rounded-full shadow-sm">
              <Calendar className="w-4 h-4 text-Mg mr-2" />
              {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center bg-white/60 px-4 py-2 rounded-full shadow-sm">
              <Clock className="w-4 h-4 text-Mg mr-2" />
              {post.readTime || '5 min read'}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="w-full rounded-[2rem] overflow-hidden shadow-2xl relative z-10 mb-[-4rem]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[400px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-xl p-8 sm:p-12 md:p-16 relative z-20 border border-white">
          
          {/* Formatted Article Body */}
          <div className="prose prose-lg prose-emerald max-w-none text-slate-700 space-y-6 text-lg leading-relaxed mb-12">
            {post.content.split('\n').map((paragraph: string, index: number) => {
              if (!paragraph.trim()) return null;
              return <p key={index}>{paragraph}</p>;
            })}
          </div>

          {/* Share Section */}
          <div className="border-t border-emerald-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-Dg font-bold flex items-center gap-2">
              <Share2 className="w-5 h-5 text-Mg" />
              Share this article
            </h3>
            <div className="flex space-x-3">
              {[
                { Icon: Facebook, platform: 'facebook', color: 'hover:bg-blue-600 hover:border-blue-600 hover:text-white' },
                { Icon: Twitter, platform: 'twitter', color: 'hover:bg-sky-500 hover:border-sky-500 hover:text-white' },
                { Icon: Linkedin, platform: 'linkedin', color: 'hover:bg-blue-700 hover:border-blue-700 hover:text-white' },
              ].map(({ Icon, platform, color }) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => handleShare(platform as any)}
                  className={`w-10 h-10 rounded-full border-2 border-emerald-100 flex items-center justify-center text-slate-500 transition-all duration-300 ${color}`}
                  aria-label={`Share on ${platform}`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-Dg mb-8 text-center">Read Next</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  to={`/blog/${rp._id}`}
                  key={rp._id}
                  className="group bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 flex flex-col"
                >
                  {rp.image && (
                    <div className="overflow-hidden h-56">
                      <img
                        src={rp.image}
                        alt={rp.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-xl text-Dg mb-3 group-hover:text-Mg transition-colors line-clamp-2">
                      {rp.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
                      <span className="font-medium text-Mg">{rp.category}</span>
                      <span>{new Date(rp.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default SingleBlog;