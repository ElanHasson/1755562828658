import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `**Key takeaways**
- Match buyer + use case: create relevance; don’t force fit
- Reframe value in their metrics: ROI, risk, time, status
- Remove risk and prove it: pilots, guarantees, references

**Ethical guardrails**
- Sell only where the buyer genuinely benefits
- Be transparent about limits and risks
- Commit to post‑sale success; decline misfit deals
\`\`\`mermaid
flowchart TD
    A[Discover JTBD & segment] --> B[Reframe in buyer metrics]
    B --> C[De-risk: pilot, guarantee, phased rollout]
    C --> D[Prove: ROI, demos, references]
    D --> E[Mutual Action Plan]
    E --> F[Go-live & outcomes]
    F --> G[Review, expand, advocate]
\`\`\`
**One next step**
- Build a 1‑page value hypothesis + MAP for one “impossible” account this week
- Aim for a low‑risk pilot with success criteria in writing`;
  
  return (
    <div className="slide markdown-slide">
      <h1>Close the Loop: Ethical Selling that Sticks</h1>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          code({node, inline, className, children, ...props}: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            // Handle inline code
            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            
            // Handle mermaid diagrams
            if (language === 'mermaid') {
              return (
                <Mermaid chart={String(children).replace(/\n$/, '')} />
              );
            }
            
            // Handle code blocks with syntax highlighting
            if (language) {
              return (
                <SyntaxHighlighter
                  language={language}
                  style={atomDark}
                  showLineNumbers={true}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            
            // Default code block without highlighting
            return (
              <pre>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}