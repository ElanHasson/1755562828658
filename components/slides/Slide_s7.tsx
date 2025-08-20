import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- Goal: Craft a one-sentence value hypothesis that ethically makes the “unsellable” compelling.
- Use this template:
\`\`\`text
For [ICP/persona], in [context/use case], who need to [JTBD], our [solution/offer] delivers [quantified outcome] by [key mechanism], proven by [evidence], de-risked via [risk reversal].
\`\`\`
- 120-second sprint steps:
  - Pick a buyer + context where your offer wins
  - Name the job-to-be-done (progress they want)
  - Quantify the outcome (%, time, money, risk)
  - Explain the mechanism (how it works)
  - Add proof + risk reversal
\`\`\`mermaid
flowchart TD
  A[Pick ICP + context] --> B[Define JTBD]
  B --> C[Quantify outcome]
  C --> D[Mechanism]
  D --> E[Proof]
  E --> F[Risk reversal]
  F --> G[One-sentence hypothesis]
\`\`\`
- Quick examples (ethical reframes):
  - Home gardening: For home gardeners battling slugs, our precision salt applicator protects 90% of seedlings in 7 days by targeted crystals that avoid collateral damage, proven by before/after plots, de-risked with a $0 trial pack.
  - Desert hospitality: For desert camps hosting night guests, our dust-proof portable heaters lift comfort scores 15% on cool evenings via fuel-efficient radiant heat, proven by pilot NPS, de-risked with rental + on-site service.
  - Event catering: For event caterers serving kids, our no-drip ketchup popsicles deliver zero-stain novelty by a thicker gel and sleeve, proven by live white-cloth demo, de-risked with a stain-proof guarantee.
- Interaction: Type your one sentence in chat; vote which lever to strengthen—Outcome, Mechanism, Proof, or Risk.`;
  
  return (
    <div className="slide markdown-slide">
      <h1>120-Second Workshop: Build Your One-Sentence Value Hypothesis</h1>
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