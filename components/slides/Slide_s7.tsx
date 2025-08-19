import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

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
      <h1>120-Second Workshop: Build Your One-Sentence Value Hypothesis</h1>
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