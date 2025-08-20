import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- **The 4-Step Playbook**
  - Resegment: Find the buyer, use case, and moment where you win
  - Reframe: Translate features into outcomes the buyer measures
  - De-risk: Redesign the offer to lower fear, friction, and effort
  - Prove: Make the value undeniable with targeted evidence
- **Tools & Outputs**
  - Tools: JTBD, Challenger (Teach–Tailor–Take Control), MEDDICC, MAP
  - Outputs: Value hypothesis, offer packaging, risk reversals, proof assets
  - Guardrail: Ethical fit first—benefit the buyer; avoid harmful sells
\`\`\`mermaid
flowchart TD
    A[Resegment: new ICP, use case, timing] --> E{Ethics aligned?}
    E -- Yes --> B[Reframe: jobs, metrics, narrative]
    E -- No --> X[Stop/Redirect to better-fit use case]
    B --> C[De-risk: trials, guarantees, phased rollout]
    C --> D[Prove: ROI, case studies, demos, references]
    D -->|Residual risk| C
    D -->|Misfit discovered| A
\`\`\`
- **Step Prompts (fast checklist)**
  - Resegment: Who has the most to gain? When is the pain sharpest? What adjacent use case fits?
  - Reframe: Which metric moves—revenue, cost, time, risk, status? What unconsidered cost exists?
  - De-risk: What can we guarantee, phase, rent, or usage-price? How do we support change?
  - Prove: Which proof does this persona trust? Can we demo the riskiest objection?
\`\`\`text
Value Hypothesis Template
For [ICP] who need to [JTBD] but struggle with [pain], our [solution]
delivers [quantified outcome] by [why it works], proven by [evidence],
with risk removed via [trial/guarantee/phasing].
\`\`\`
- **Playful Applications**
  - Salt to a slug → Resegment to gardeners; Reframe as crop protection; De-risk with safe-use kit; Prove with before/after plots
  - Heaters in the Sahara → Sell “win the night” comfort; De-risk with rentals; Prove with thermal readings and guest NPS
  - Ketchup popsicle + white gloves → Reframe as clean novelty; De-risk with no-stain guarantee; Prove with live white-glove demo
\`\`\`mermaid
sequenceDiagram
    participant Seller
    participant Buyer
    Seller->>Buyer: Teach a missed opportunity tied to your metrics
    Buyer->>Seller: What if it fails?
    Seller->>Buyer: Low-risk pilot + guarantee + implementation plan
    Buyer->>Seller: Show me it works
    Seller->>Buyer: Case study + live demo + ROI model
    Seller->>Buyer: Propose a Mutual Action Plan to go-live
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>The 4-Step Playbook: Resegment, Reframe, De-risk, Prove</h1>
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