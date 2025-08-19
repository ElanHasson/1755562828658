import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Slide() {
  const markdown = `- **Thesis:** You don’t force product–market fit—you create buyer–use case fit.
- **JTBD:** Find the circumstance where your offer is the obvious hire.
- **Ethical Persuasion:** Sell only where the buyer benefits; decline misfit deals.
- **Anchor Examples:**
  - Salt to a slug → sell to gardeners for yield protection.
  - Heaters in the Sahara → sell night comfort and process stability.
  - Ketchup popsicles + white gloves → sell a no-mess novelty with proof.
\`\`\`mermaid
flowchart TD
    A[Your Offer] --> B[Resegment Buyer & Context]
    B --> C[JTBD Discovery: circumstance, progress, constraints]
    C --> D[Reframe to Outcomes: financial, operational, emotional, strategic]
    D --> E{Ethics Gate: net buyer benefit?}
    E -- Yes --> F[De-risk: trial, guarantee, phased rollout]
    F --> G[Proof: case studies, ROI, demos]
    E -- No --> H[Disqualify/Redirect]
\`\`\`
- **Value Hypothesis Template:**
\`\`\`yaml
for: [ICP/persona in specific context]
job_to_be_done: [progress they seek under constraints]
our_solution: [how it works in their world]
outcomes:
  financial: [ROI, payback, cost avoided]
  operational: [time saved, risk reduced]
  emotional: [confidence, status, simplicity]
  strategic: [edge vs. status quo]
proof: [case study, pilot plan, references]
risk_reversal: [trial, guarantee, MAP]
ethics_check: [why buyer clearly benefits]
\`\`\`
- **Quick Checks:**
  - Fit: Can we name a micro-segment and moment where this wins?
  - Job: What are they firing today and why?
  - Ethics: Would we sell this to a friend we admire?`;
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
      <h1>Foundations: Fit, Jobs, and Ethical Persuasion</h1>
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