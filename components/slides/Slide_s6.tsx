import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- The Job-to-be-Done
  - Serve bold, savory novelty without stains or mess
  - Elevate events while keeping attire pristine
  - Kid-friendly control and faster cleanup
- Reframe + Resegment
  - ICP: event caterers, family venues, chef-led pop-ups
  - Message: "White-glove flavor, zero-mess assurance"
  - Outcome: differentiate experiences; reduce clean-up time/cost
- De-risk the Offer
  - No-drip sleeve + thicker gel formulation
  - Stain-proof guarantee; 1-event pilot
  - Disposable glove liners and white-fabric test included
- Live Proof: White-Glove Challenge
  - Tilt + squeeze over white cloth: 60s melt test
  - Bite test: no drip, wipe-clean check
  - Record results; share video/social proof
\`\`\`mermaid
flowchart LR
  D["Discovery: 'What worries you about serving red foods?'"] --> R["Reframe: 'Novelty without mess'"]
  R --> K[De-risk: sleeve, guarantee, pilot]
  K --> P[Proof: White-Glove Challenge]
  P --> A[Action: Schedule 1-event pilot + MAP]
\`\`\`
- Next Step (MAP Snapshot)
  - Success: 200 servings, zero stains, +10 event NPS
  - Owners: you + us; Date: next event
  - Assets: sample kit, setup guide, ROI one-pager`;
  
  return (
    <div className="slide markdown-slide">
      <h1>Impossible Sell #3 (Demo): Ketchup Popsicles &amp; White Gloves</h1>
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