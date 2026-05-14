import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

// ------------------------------
// UPDATED DATA FOR AREEJ (Faith & Science focus)
// ------------------------------
const featuredPost = {
  title: "Prophetic Nutrition: The Healing Power of Dates & Talbinah",
  excerpt:
    "Exploring the intersection of Sunnah-inspired foods and modern nutritional science for hormonal balance and energy.",
  image: "https://www.ilhammalick.com/wp-content/uploads/2025/10/Talbina-%E2%80%93-The-Comforting-Sunnah-Food-1080x675.webp",
  date: "March 20, 2026",
  author: "Areej Fatima",
  readTime: "10 min read",
  category: "Prophetic Medicine"
};

const posts = [
  {
    title: "Managing PCOS Naturally in Pakistan",
    excerpt: "Practical dietary swaps for traditional Pakistani meals to improve insulin sensitivity and hormonal health.",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
    date: "March 18, 2026",
    author: "Areej Fatima",
    category: "PCOS Health"
  },
  {
    title: "Nutritional Needs During the First Trimester",
    excerpt: "A guide for expecting mothers on essential nutrients, managing morning sickness, and Sunnah-based pregnancy tips.",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800",
    date: "March 15, 2026",
    author: "Areej Fatima",
    category: "Pregnancy"
  },
  {
    title: "Hidden Sugars in Traditional Desserts",
    excerpt: "How to enjoy your favorite treats while maintaining stable blood sugar levels and weight management.",
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800",
    date: "March 12, 2026",
    author: "Areej Fatima",
    category: "Weight Mgmt"
  },
  {
    title: "The Importance of Iron for Women",
    excerpt: "Addressing the high prevalence of anemia in our region through iron-rich, culturally relevant food choices.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    date: "March 10, 2026",
    author: "Areej Fatima",
    category: "Anemia"
  },
  {
    title: "Fasting with PCOS: A Clinical Perspective",
    excerpt: "How to manage your diet during Ramadan or voluntary fasts while keeping hormones in check.",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
    date: "March 08, 2026",
    author: "Areej Fatima",
    category: "Lifestyle"
  },
  {
    title: "Weaning Your Baby: The First 1000 Days",
    excerpt: "Introducing solids to your infant using home-cooked, nutritious, and safe traditional recipes.",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800",
    date: "March 05, 2026",
    author: "Areej Fatima",
    category: "Child Nutrition"
  }
];

// --------------------------------------
// MEMOIZED POST CARD (High-Contrast & Glass)
// --------------------------------------
const BlogCard = memo(({ post, index }) => (
  <Link to={`/blog/${index}`} className="group block">
    <div className="bg-white/75 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/40 transform hover:-translate-y-2 h-full flex flex-col">
      <div className="h-56 relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-Mg text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3 text-slate-900 leading-tight group-hover:text-Mg transition-colors">{post.title}</h3>
        <p className="text-[#1e3a36] text-sm font-medium mb-6 line-clamp-3 opacity-90">{post.excerpt}</p>
        
        <div className="mt-auto pt-4 border-t border-emerald-100 flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-tighter">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-700" />
            {post.date}
          </div>
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-700" />
            {post.author}
          </div>
        </div>
      </div>
    </div>
  </Link>
));

function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 relative pt-24 pb-20">
      <div className="animated-background" />
      <ParticleBackground />

<section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
<div className="text-center max-w-3xl mx-auto mb-16">         <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
        Areej's Health <span className="text-Mg">Insights</span>
      </h1>
      <p className="text-xl text-slate-800 max-w-3xl mx-auto mb-12">
        Expert insights, tips, and the latest research in nutrition and healthy living, 
        bridging clinical science with Sunnah-based healing.
      </p>
    </div>

          {/* Featured Post (Glass Layout) */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl mb-24 border border-white/50 group">
            <div className="grid lg:grid-cols-2">
              <div className="h-80 lg:h-auto relative overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden"></div>
              </div>

              <div className="p-8 md:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-Lg font-black text-sm uppercase tracking-[0.2em] mb-4">
                  <Tag className="w-4 h-4" />
                  {featuredPost.category}
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-6 text-slate-900 leading-[1.1]">{featuredPost.title}</h2>
                <p className="text-lg text-[#1e3a36] font-medium mb-8 leading-relaxed opacity-90">{featuredPost.excerpt}</p>

                <div className="flex flex-wrap items-center gap-6 text-[11px] font-black text-slate-700 uppercase tracking-widest mb-8">
                  <span className="flex items-center gap-2"><User className="w-4 h-4 text-Mg" /> {featuredPost.author}</span>
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-Mg" /> {featuredPost.date}</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-Mg" /> {featuredPost.readTime}</span>
                </div>

                <Link
                  to="/blog/featured"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-Mg to-Lg text-white rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 w-fit"
                >
                  Read Full Article <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post, index) => (
              <BlogCard key={index} post={post} index={index} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

export default Blog;