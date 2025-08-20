import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `**What we’re proving**
- The desert isn’t hot 24/7—reframe to: "Win the Night"
- ICP: Desert camps, rooftop venues, clinics, mining/logistics sites
- JTBD: Night comfort, extended hours, equipment reliability
- Metrics: +guest satisfaction, +nighttime revenue, -downtime, safety compliance

**Micro-offer (demo pack)**
- Portable, dust-resistant, fuel-efficient heaters; safety-certified
- 7-night rental pilot, onsite setup, training, and 24/7 support
- Success criteria: 20°F/11°C lift at seating, +1.0 NPS, +15% night sales
- Risk reversal: Pay only if KPIs hit; roll into seasonal plan
\`\`\`mermaid
flowchart TD
  A[Resegment] -->|Who cares?| B[Reframe]
  B -->|JTBD: Night comfort & uptime| C[De-risk]
  C -->|Pilot, rental, SLAs| D[Prove]
  D -->|Thermal scans, NPS, revenue lift| E[Close]

  A --- A1[Hospitality camps]
  A --- A2[Clinics/industrial]
  C --- C1[Safety certs & training]
  D --- D1[Before/after temps]
\`\`\`
\`\`\`mermaid
sequenceDiagram
  participant S as Seller
  participant M as Camp Manager
  participant SO as Safety Officer
  participant F as Finance
  S->>M: Nights drop to 8°C—guests leave early
  M-->>S: We lose traffic after 9pm
  S->>M: Pilot 7 nights & seat temp +11°C & measure NPS & sales
  SO-->>S: Safety in wind and sand?
  S->>SO: Tip-over shutoff, CSA certs, sand filters, training
  F-->>S: Upfront cost?
  S->>F: Rental, pay-on-success, option to buy after pilot
\`\`\`
**Back-of-napkin ROI**
\`\`\`python
nights=7; seats=60; occupancy=0.7; rate=35  # avg spend per seated guest/night
lift=0.15  # 15% sales lift from extended heated hours
incremental = nights * seats * occupancy * rate * lift
cost = 900  # pilot rental + fuel
payback_days = cost / (incremental / nights)
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Impossible Sell #2 (Demo): Heaters in the Sahara—Win the Night</h1>
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