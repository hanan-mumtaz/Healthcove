import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import API from '../services/api';

const BlogCard = ({ post }: { post: any }) => {
  const excerpt = post.content
    ? post.content.replace(/\s+/g, ' ').slice(0, 180).trim() + (post.content.length > 180 ? '...' : '')
    : 'Read the latest insight from HealthCove.';

  return (
    <Link to={`/blog/${post._id}`} className="group block">
      <div className="bg-white/75 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/40 transform hover:-translate-y-2 h-full flex flex-col">
        <div className="h-56 relative overflow-hidden bg-emerald-50">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
          ) : null}
          <div className="absolute top-4 left-4">
            <span className="bg-Mg text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
              {post.category || 'Nutrition'}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-3 text-slate-900 leading-tight group-hover:text-Mg transition-colors">{post.title}</h3>
          <p className="text-[#1e3a36] text-sm font-medium mb-6 line-clamp-3 opacity-90">{excerpt}</p>

          <div className="mt-auto pt-4 border-t border-emerald-100 flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-tighter gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-700" />
              {new Date(post.createdAt || post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-1 truncate">
              <User className="w-3.5 h-3.5 text-slate-700" />
              {post.author?.name || post.author?.displayName || 'Areej Fatima'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await API.get('/blogs?public=true');
        setPosts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch blogs', err);
        setError('Unable to load the blog feed right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const featuredPost = useMemo(() => posts.find((post) => post.isFeatured) || posts[0] || null, [posts]);
  const gridPosts = useMemo(() => posts.filter((post) => post._id !== featuredPost?._id), [posts, featuredPost]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 relative pt-16 pb-20">
      <div className="animated-background" />
      <ParticleBackground />

      <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Areej's Health <span className="text-Mg">Insights</span>
          </h1>
          <p className="text-xl text-slate-800 max-w-3xl mx-auto mb-12">
            Expert insights, tips, and the latest research in nutrition and healthy living, bridging clinical science with Sunnah-based healing.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-600 font-medium">Loading published articles...</div>
        ) : error ? (
          <div className="text-center py-20 text-slate-600 font-medium">{error}</div>
        ) : !featuredPost ? (
          <div className="text-center py-20 text-slate-600 font-medium">No published articles yet.</div>
        ) : (
          <>
            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl mb-24 border border-white/50 group">
              <div className="grid lg:grid-cols-2">
                <div className="h-80 lg:h-auto relative overflow-hidden bg-emerald-50">
                  {featuredPost.image ? (
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden"></div>
                </div>

                <div className="p-8 md:p-14 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-Lg font-black text-sm uppercase tracking-[0.2em] mb-4">
                    <Tag className="w-4 h-4" />
                    {featuredPost.category || 'Nutrition'}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black mb-6 text-slate-900 leading-[1.1]">{featuredPost.title}</h2>
                  <p className="text-lg text-[#1e3a36] font-medium mb-8 leading-relaxed opacity-90">
                    {featuredPost.content ? featuredPost.content.replace(/\s+/g, ' ').slice(0, 220).trim() : 'Read the latest published article from HealthCove.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-[11px] font-black text-slate-700 uppercase tracking-widest mb-8">
                    <span className="flex items-center gap-2"><User className="w-4 h-4 text-Mg" /> {featuredPost.author?.name || featuredPost.author?.displayName || 'Areej Fatima'}</span>
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-Mg" /> {new Date(featuredPost.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-Mg" /> {featuredPost.readTime || '5 min read'}</span>
                  </div>

                  <Link
                    to={`/blog/${featuredPost._id}`}
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-Mg to-Lg text-white rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 w-fit"
                  >
                    Read Full Article <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {gridPosts.length > 0 ? (
                gridPosts.map((post) => <BlogCard key={post._id} post={post} />)
              ) : (
                <div className="md:col-span-2 lg:col-span-3 text-center py-12 text-slate-600">No additional published articles available.</div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Blog;