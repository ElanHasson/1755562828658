import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  D[Discovery: "What worries you about serving red foods?"] --> R[Reframe: "Novelty without mess"]
  R --> K[De-risk: sleeve, guarantee, pilot]
  K --> P[Proof: White-Glove Challenge]
  P --> A[Action: Schedule 1-event pilot + MAP]
\`\`\`
- Next Step (MAP Snapshot)
  - Success: 200 servings, zero stains, +10 event NPS
  - Owners: you + us; Date: next event
  - Assets: sample kit, setup guide, ROI one-pager`;
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