import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  const mermaidRef = useRef(0);
  
  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#667eea',
        primaryTextColor: '#fff',
        primaryBorderColor: '#7c3aed',
        lineColor: '#5a67d8',
        secondaryColor: '#764ba2',
        tertiaryColor: '#667eea',
        background: '#1a202c',
        mainBkg: '#2d3748',
        secondBkg: '#4a5568',
        tertiaryBkg: '#718096',
        textColor: '#fff',
        nodeTextColor: '#fff',
      }
    });
    
    // Find and render mermaid diagrams
    const renderDiagrams = async () => {
      const diagrams = document.querySelectorAll('.language-mermaid');
      for (let i = 0; i < diagrams.length; i++) {
        const element = diagrams[i];
        const graphDefinition = element.textContent;
        const id = `mermaid-${mermaidRef.current++}`;
        
        try {
          const { svg } = await mermaid.render(id, graphDefinition);
          element.innerHTML = svg;
          element.classList.remove('language-mermaid');
          element.classList.add('mermaid-rendered');
        } catch (error) {
          console.error('Mermaid rendering error:', error);
        }
      }
    };
    
    renderDiagrams();
  }, [markdown]);
  
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
                <pre className="language-mermaid">
                  <code>{String(children).replace(/\n$/, '')}</code>
                </pre>
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