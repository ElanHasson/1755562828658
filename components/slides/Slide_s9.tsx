import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

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
      <h1>Close the Loop: Ethical Selling that Sticks</h1>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          code({node, className, children, ...props}: any) {
            const match = /language-(w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const isInline = !className;
            
            if (!isInline && language === 'mermaid') {
              return (
                <pre className="language-mermaid">
                  <code>{String(children).replace(/\n$/, '')}</code>
                </pre>
              );
            }
            
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}