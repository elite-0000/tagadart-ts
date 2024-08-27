import React from 'react';
import { Container } from '@/components/Container';
import { FadeIn } from '@/components/FadeIn';
import { Border } from '@/components/Border';
import Link from 'next/link'; // Corrected import statement
import Image from 'next/image'; // Corrected import statement
import { Button } from '@/components/Button';
import { formatDate } from '@/lib/formatDate';

interface ArticleProps {
  href: string;
  title: string;
  eyebrow: string;
  description: string;
  pageIntro: {
    title: string;
    eyebrow: string;
    content: string;
  };
  author: {
    fullname: string;
    role: string;
    avatar: {
      formats: {
        thumbnail: {
          url: string
        }
      }
    };
  };
}

interface ArticleCardProps {
  article: ArticleProps;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const baseUrl = 'http://127.0.0.1:1337';
  article.href = `${baseUrl}/future-of-web-development`;
  const imgUrl = article.author.avatar?.formats?.thumbnail?.url ? `${baseUrl}${article.author.avatar.formats.thumbnail.url}` : null;
  // const imgUrl = null;
  return (
    
    <FadeIn key={article.href}>
      <article>
        <Border className="pt-16">
          <div className="relative lg:-mx-4 lg:flex lg:justify-end">
            <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                <Link href={article.href}>{article.pageIntro.title}</Link>
              </h2>
              <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                <dt className="sr-only">Published</dt>
                <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                  <time dateTime={article.pageIntro.eyebrow}>
                    {article.pageIntro.eyebrow}
                  </time>
                </dd>
                <dt className="sr-only">Author</dt>
                <dd className="mt-6 flex gap-x-4">
                  <div className="flex-none overflow-hidden rounded-xl bg-neutral-100">
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={article.author.fullname}
                        className="h-12 w-12 object-cover grayscale"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <div className="h-12 w-12 bg-neutral-100 rounded-xl" />
                    )}
                  </div>
                  <div className="text-sm text-neutral-950">
                    <div className="font-semibold">
                      {article.author.fullname}
                    </div>
                    <div>{article.author.role}</div>
                  </div>
                </dd>
              </dl>
              <p className="mt-6 max-w-2xl text-base text-neutral-600">
                {article.pageIntro.content}
              </p>
              <Button
                href={article.href}
                aria-label={`Read more: ${article.title}`}
                className="mt-8"
              >
                Read more
              </Button>
            </div>
          </div>
        </Border>
      </article>
    </FadeIn>  
  );
};

export default ArticleCard;
