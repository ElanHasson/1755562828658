import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `**Objection Handling: LAER + Flip**
- Listen, Acknowledge, Explore, Respond (LAER)
- Isolate the real blocker: need, fit, risk, budget, or timing
- Flip the top objection into your demo/proof
- Close with a clear next step (pilot or MAP)

**Risk Reversal Menu**
- Pilot/POC with success criteria and opt-out
- Phased rollout + onboarding support
- Performance SLAs or milestone-based fees
- Usage-based or rental pricing
- Guarantees: “stain-proof”/"time-to-value" commitments

**CFO-Era Proof (under 2 minutes)**
- 6–12 month payback model; show assumptions and sensitivity
- One-page business case co-authored with your champion
- Peer proof: before/after metrics, references, and benchmarks

**"Impossible" Objection Flips**
- Ketchup popsicle: white-glove, no-drip demo + stain-free guarantee
- Heaters in the Sahara: “Win the night” pilot at a desert venue
- Salt to a slug: sell to gardeners—precision applicator + safety guidance
\`\`\`mermaid
flowchart TD
    A[Objection surfaces] --> B[LAER]
    B --> C{Type?}
    C -->|Risk/Budget| D[Pick risk reversal lever]
    C -->|Fit/Need| E[Reframe value to buyer's metrics]
    D --> F[Proof asset: demo/case/ROI]
    E --> F
    F --> G[Mutual Action Plan: pilot -> go-live]
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Objections, Risk Reversal, and CFO-Era Proof—Quick Hits</h1>
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