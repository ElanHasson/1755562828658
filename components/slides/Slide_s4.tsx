import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `**Demo objective**
- Prove the 4-step playbook on the “salt to a slug” myth—without selling to the slug
- Match a buyer, reframe value, remove risk, show proof

**4 moves applied**
- Resegment: Buyer = home gardener; JTBD = protect seedlings overnight
- Reframe: “Precision, humane pest control” vs. generic slug-killing
- De-risk: Measured applicator, safety guide, 7-day micro-trial + guarantee
- Prove: Side-by-side planter test with time-lapse; quantified seedling survival

**Offer (demo)**
- SlugGuard Precision Salt Kit: measured shaker + how-to + mini trial bag
- Usage play: micro-ring barrier around seedlings; avoid soil saturation
- Outcome: 80–90% fewer slug hits in 48 hours (pilot data)

**Proof assets**
- 10s time-lapse: untreated vs. ringed seedlings
- Before/after count: 12/12 intact vs. 7/12 intact
- ROI: $9 kit vs. ~$36 in lost seedlings per bed
\`\`\`mermaid
flowchart TD
    A[Resegment Buyer/Context] --> B[Reframe JTBD & Outcomes]
    B --> C[De-risk Offer]
    C --> D[Demonstrate Proof]
    D --> E[Next Step: 7-day Micro-Pilot]
\`\`\`
**Value hypothesis (filled)**
\`\`\`
For home gardeners losing seedlings to slugs, our SlugGuard kit protects beds by 80–90% in 48 hours via a precision salt barrier and usage guide, proven by side-by-side demos and a 7-day micro-trial, de-risked with a no-mess applicator and satisfaction guarantee.
\`\`\`
**Demo checklist**
- Two small planters (left: untreated, right: salted ring), measured shaker, salt
- Pre-recorded 10s time-lapse clip queued
- One-slide ROI overlay graphic
- Safety/ethics slide: targeted use, pet/plant precautions, local guidelines`;
  
  return (
    <div className="slide markdown-slide">
      <h1>Impossible Sell #1 (Demo): Salt to a Slug—Without Selling to the Slug</h1>
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