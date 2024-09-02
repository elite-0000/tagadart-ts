import React, { FC } from "react"
import remarkGfm from "remark-gfm"
import { MessageMarkdownMemoized } from "./message-markdown-memoized"
import { Tag } from "lucide-react"
import { compile } from "@mdx-js/mdx";
import { remark } from 'remark';
import html from 'remark-html';
import ReactMarkdown from 'react-markdown';
import { TagList, TagListItem } from "./TagList"
import { Blockquote } from "./Blockquote"
import { StatList, StatListItem } from "./StatList"
import rehypeHighlight from 'rehype-highlight';

interface MessageMarkdownProps {
  content: string
}

interface TagListItem {
  tagName: string;
}

interface Blockquote {
  author: {
    name: string;
    role: string;
  };
  image?: {
    src: string;
  };
  text: string;
}

interface StatListItem {
  value: string;
  label: string;
}

interface ExtractedData {
  tags: TagListItem[];
  blockquote: Blockquote;
  stats: StatListItem[];
  otherText: string;
}

interface StatListItem {
  value: string;
  label: string;
}

interface ExtractedData {
  tags: TagListItem[];
  blockquote: Blockquote;
  stats: StatListItem[];  
  otherText: string;
}

function extractDataFromMDX(mdxString: string): ExtractedData {
  const tags: TagListItem[] = [];
  const stats: StatListItem[] = [];

  // Extract TagListItems
  const tagListMatch = mdxString.match(/<TagList>[\s\S]*?<\/TagList>/);
  if (tagListMatch) {
    const tagListItems = tagListMatch[0].match(/<TagListItem>(.*?)<\/TagListItem>/g);
    if (tagListItems) {
      tagListItems.forEach(tag => {
        const tagNameMatch = tag.match(/<TagListItem>(.*?)<\/TagListItem>/);
        if (tagNameMatch) {
          tags.push({ tagName: tagNameMatch[1] });
        }
      });
    }
  }

  // Extract Blockquote
  const blockquoteMatch = mdxString.match(/<Blockquote[\s\S]*?>([\s\S]*?)<\/Blockquote>/);
  let blockquote: Blockquote = {
    author: {
      name: '',
      role: ''
    },
    text: ''
  };
  if (blockquoteMatch) {
    const authorNameMatch = blockquoteMatch[1].match(/name: '([^']*)'/);
    const authorRoleMatch = blockquoteMatch[1].match(/role: '([^']*)'/);
    const imageSrcMatch = blockquoteMatch[1].match(/src: ([^}]*)/);
    const textMatch = blockquoteMatch[1].match(/>([^<]*)<\/Blockquote>/);

    blockquote = {
      author: {
        name: authorNameMatch ? authorNameMatch[1] : '',
        role: authorRoleMatch ? authorRoleMatch[1] : ''
      },
      image: imageSrcMatch ? { src: imageSrcMatch[1].trim() } : undefined,
      text: textMatch ? textMatch[1].trim() : blockquoteMatch[1].replace(/<[^>]+>/g, '').trim()
    };
  }

  // Extract StatListItems
  const statListMatch = mdxString.match(/<StatList>[\s\S]*?<\/StatList>/);
  if (statListMatch) {
    const statListItems = statListMatch[0].match(/<StatListItem value="([^"]+)" label="([^"]+)" \/>/g);
    if (statListItems) {
      statListItems.forEach(stat => {
        const statMatch = stat.match(/<StatListItem value="([^"]+)" label="([^"]+)" \/>/);
        if (statMatch) {
          stats.push({ value: statMatch[1], label: statMatch[2] });
        }
      });
    }
  }

  // Remove the matched component data from the MDX string
  const cleanedMdxString = mdxString
    .replace(/<TagList>[\s\S]*?<\/TagList>/, '')
    .replace(/<Blockquote[\s\S]*?>([\s\S]*?)<\/Blockquote>/, '')
    .replace(/<StatList>[\s\S]*?<\/StatList>/, '');

  // Capture remaining text
  const otherText = cleanedMdxString.trim();

  return {
    tags,
    blockquote,
    stats,
    otherText
  };
}

export const MessageMarkdown: FC<MessageMarkdownProps> = ({ content }) => {
  const { tags, blockquote, stats, otherText } = extractDataFromMDX(content);
  console.log(tags);
  return (
    <div className='[&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0 mt-24 sm:mt-32 lg:mt-40 main_content'>
      <div className="typography" >
      <ReactMarkdown remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeHighlight]}>{otherText}</ReactMarkdown>
      <TagList>
        {tags.map((tag, index) => (
          <TagListItem key={index}>{tag.tagName}</TagListItem>
        ))}
      </TagList>
      <Blockquote author={blockquote.author} image={blockquote.image}>
        {blockquote.text}
      </Blockquote>      
      <StatList>
        {stats.map((stat, index) => (
          <StatListItem key={index} label={stat.label} value={stat.value} />
        ))}
      </StatList>
      </div>
      
      </div>
  )
}
