import { MARKDOWN_STYLE } from '@/utils/style/markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const MarkdownPreview = ({ children }) => {
  return (
    <section className={`${MARKDOWN_STYLE}`}>
      <ReactMarkdown
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[[rehypeRaw, { allowDangerousHtml: false }]]}
        skipHtml={true}
      >
        {children}
      </ReactMarkdown>
    </section>
  );
};

export default MarkdownPreview;
