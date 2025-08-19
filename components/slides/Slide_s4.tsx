import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

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
      <h1>Impossible Sell #1 (Demo): Salt to a Slug—Without Selling to the Slug</h1>
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