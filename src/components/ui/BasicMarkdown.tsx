import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

type Props = {
  content?: string
  children?: string
}

function BasicMarkdown({ children, content }: Props) {
  return (
    <div className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {children || content}
      </ReactMarkdown>
    </div>
  )
}

export default BasicMarkdown
