// app/pages/blog/articlePage/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { ArticleContent } from '@/components/ArticleContent/ArticleContent';
import { RelatedArticles } from '@/components/RelatedArticles/RelatedArticles';
import Header from '@/components/Header/Header';
import BannerBlog from '@/components/BannerBlog/BannerBlog';
import CallToAction from '@/components/CallToAction/CallToAction';
import Footer from '@/components/Footer/Footer';

export default function ArticlePage() {
  const params = useParams();
  const articleId = params.id as string;

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-light-bg">
      <Header />
      <BannerBlog />
      <div className="w-full max-w-[1200px] my-8 mx-auto px-5 grid grid-cols-1 gap-8 lg:grid-cols-[2.5fr_1fr]">
        <main className="lg:col-span-1">
          <ArticleContent articleId={articleId} />
        </main>
        <aside className="lg:col-span-1">
          <RelatedArticles currentArticleId={articleId} />
        </aside>
      </div>
      <CallToAction/>
      <Footer/>
    </div>
  );
}