"use client";

import { useState, useRef } from 'react';
import useAuth from '@/hooks/useAuth';
import Header from '@/components/Header/Header';
import BannerBlog from '@/components/BannerBlog/BannerBlog';
import CallToAction from '@/components/CallToAction/CallToAction';
import Footer from '@/components/Footer/Footer';
import { HeroBlog } from '@/components/HeroBlog/HeroBlog';
import { ArticleList } from '@/components/ArticleList/ArticleList';
import { Article } from '@/types/blog';
import { Tags } from '@/components/Tags/Tags'
import CategoryGrid from '@/components/CategoryGrid/CategoryGrid';

export default function BlogPage() {
  const scrollPositionRef = useRef(0);
  const { user, isLoading } = useAuth();
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [selectedTag, setSelectedTag] = useState('todos');

  const handleTagSelect = (slug: string) => {
    scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;
    setSelectedTag(slug);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-light-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-opacity-60"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-light-bg">
      <Header />
      <BannerBlog/>
      <div className="w-full max-w-[1200px] mx-[2rem] my-[2rem] px-[20px] flex flex-col gap-[2rem] snap-y snap-proximity">
        <div className="grid grid-cols-1 lg:[grid-template-columns:1.2fr_1fr] gap-8">
          <div className="order-[-1]">
            <HeroBlog featuredArticle={featuredArticle} />
          </div>
          <div className="blog-articles-column">
            <ArticleList 
              itemsPerPage={3} 
              onArticleClick={(article) => setFeaturedArticle(article)}
            />
          </div>
        </div>
        <CallToAction />
        <Tags 
          selectedTag={selectedTag} 
          onTagSelect={handleTagSelect} 
        />
        {/* Pasar el selectedTag actual en lugar de "todos" */}
        <CategoryGrid slug={selectedTag} />
      </div>
      <Footer />
    </div>
  );
}