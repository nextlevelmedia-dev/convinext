"use client"

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const card = {
  width: "100%",
  borderRadius: "20px",
  background: "linear-gradient(135deg, #0d1b38 0%, #0a1628 100%)",
  border: "1px solid rgba(255,255,255,0.07)",
  boxShadow: "0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
  overflow: "hidden",
  aspectRatio: "16/10",
  position: "relative" as const,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const gradStart = "#fc03b0"
const gradEnd = "#047cf9"

function EcommerceUXVisual() {
  return (
    <div style={card}>
      <style>{`
        @keyframes ux-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ux-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(0.96)} }
        @keyframes ux-slide-in { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes ux-cart { 0%{transform:translateX(0)} 60%{transform:translateX(6px)} 100%{transform:translateX(0)} }
        @keyframes ux-badge { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
        .ux-phone { animation: ux-float 3.5s ease-in-out infinite; }
        .ux-heart1 { animation: ux-pulse 2s ease-in-out infinite; }
        .ux-heart2 { animation: ux-pulse 2s ease-in-out infinite 0.6s; }
        .ux-cart { animation: ux-cart 2.5s ease-in-out infinite 1s; }
        .ux-badge { animation: ux-badge 2s ease-in-out infinite 0.3s; }
        .ux-item1 { animation: ux-slide-in 0.5s ease forwards 0.2s; opacity:0; }
        .ux-item2 { animation: ux-slide-in 0.5s ease forwards 0.5s; opacity:0; }
        .ux-item3 { animation: ux-slide-in 0.5s ease forwards 0.8s; opacity:0; }
      `}</style>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 50%, rgba(252,3,176,0.10) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(4,124,249,0.08) 0%, transparent 60%)"}} />
      <svg viewBox="0 0 520 320" style={{width:"90%",maxWidth:480}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ux-g1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={gradStart}/><stop offset="100%" stopColor={gradEnd}/></linearGradient>
          <linearGradient id="ux-g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a2a4a"/><stop offset="100%" stopColor="#0d1b38"/></linearGradient>
          <filter id="ux-blur"><feGaussianBlur stdDeviation="8"/></filter>
        </defs>
        <ellipse cx="160" cy="160" rx="80" ry="60" fill={gradStart} opacity="0.08" filter="url(#ux-blur)"/>
        <ellipse cx="360" cy="160" rx="80" ry="60" fill={gradEnd} opacity="0.08" filter="url(#ux-blur)"/>
        <g className="ux-phone">
          <rect x="155" y="30" width="120" height="210" rx="18" fill="url(#ux-g2)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
          <rect x="155" y="30" width="120" height="210" rx="18" fill="none" stroke="url(#ux-g1)" strokeWidth="1.5" opacity="0.4"/>
          <rect x="195" y="36" width="40" height="7" rx="4" fill="rgba(0,0,0,0.5)"/>
          <rect x="165" y="52" width="100" height="80" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
          <rect x="185" y="68" width="60" height="48" rx="6" fill="rgba(252,3,176,0.15)"/>
          <circle cx="215" cy="92" r="18" fill="rgba(252,3,176,0.2)"/>
          <circle cx="215" cy="92" r="10" fill="rgba(252,3,176,0.4)"/>
          <g className="ux-item1">
            <rect x="165" y="142" width="70" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
            <rect x="165" y="154" width="45" height="5" rx="2.5" fill="rgba(255,255,255,0.3)"/>
          </g>
          <g className="ux-item2"><rect x="165" y="166" width="50" height="6" rx="3" fill="url(#ux-g1)" opacity="0.9"/></g>
          <g className="ux-item3">
            <rect x="165" y="180" width="100" height="26" rx="13" fill="url(#ux-g1)"/>
            <rect x="185" y="190" width="60" height="6" rx="3" fill="rgba(255,255,255,0.9)"/>
          </g>
          <circle cx="205" cy="226" r="3" fill="url(#ux-g1)"/>
          <circle cx="215" cy="226" r="2" fill="rgba(255,255,255,0.2)"/>
          <circle cx="225" cy="226" r="2" fill="rgba(255,255,255,0.2)"/>
        </g>
        <g className="ux-heart1"><text x="92" y="105" fontSize="22" fill={gradStart} opacity="0.85">♥</text></g>
        <g className="ux-heart2"><text x="340" y="85" fontSize="16" fill={gradEnd} opacity="0.7">♥</text></g>
        <g className="ux-cart" transform="translate(340,130)">
          <rect x="0" y="0" width="100" height="52" rx="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <text x="16" y="22" fontSize="18" fill="white" opacity="0.9">🛒</text>
          <rect x="38" y="10" width="50" height="5" rx="2.5" fill="rgba(255,255,255,0.6)"/>
          <rect x="38" y="20" width="35" height="4" rx="2" fill="rgba(255,255,255,0.25)"/>
          <rect x="38" y="32" width="42" height="12" rx="6" fill="url(#ux-g1)" opacity="0.9"/>
          <rect x="50" y="36" width="18" height="4" rx="2" fill="white" opacity="0.9"/>
        </g>
        <g className="ux-badge" transform="translate(68,175)">
          <rect x="0" y="0" width="78" height="38" rx="10" fill="rgba(252,3,176,0.12)" stroke="rgba(252,3,176,0.3)" strokeWidth="1"/>
          <text x="12" y="24" fontSize="15" fontWeight="800" fill={gradStart}>+42%</text>
        </g>
      </svg>
    </div>
  )
}

function EcommercePerformanceVisual() {
  return (
    <div style={card}>
      <style>{`
        @keyframes perf-score { from{stroke-dashoffset:283} to{stroke-dashoffset:0} }
        @keyframes perf-glow { 0%,100%{filter:drop-shadow(0 0 6px #22c55e)} 50%{filter:drop-shadow(0 0 16px #22c55e)} }
        @keyframes perf-num { 0%{opacity:0;transform:scale(0.8)} 100%{opacity:1;transform:scale(1)} }
        @keyframes perf-bar1 { from{width:0} to{width:150px} }
        @keyframes perf-bar2 { from{width:0} to{width:186px} }
        @keyframes perf-bar3 { from{width:0} to{width:176px} }
        .perf-circle { animation: perf-score 1.8s cubic-bezier(0.4,0,0.2,1) forwards 0.3s; stroke-dasharray:283; stroke-dashoffset:283; }
        .perf-glow { animation: perf-glow 2s ease-in-out infinite 2s; }
        .perf-num { animation: perf-num 0.5s ease forwards 1.8s; opacity:0; }
        .perf-bar1 { animation: perf-bar1 1s cubic-bezier(0.4,0,0.2,1) forwards 0.8s; }
        .perf-bar2 { animation: perf-bar2 1s cubic-bezier(0.4,0,0.2,1) forwards 1.1s; }
        .perf-bar3 { animation: perf-bar3 1s cubic-bezier(0.4,0,0.2,1) forwards 1.4s; }
      `}</style>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.06) 0%, transparent 60%)"}} />
      <svg viewBox="0 0 520 320" style={{width:"90%",maxWidth:480}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="p-green" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#22c55e"/><stop offset="100%" stopColor="#16a34a"/></linearGradient>
          <filter id="p-blur"><feGaussianBlur stdDeviation="10"/></filter>
        </defs>
        <ellipse cx="180" cy="160" rx="100" ry="80" fill="#22c55e" opacity="0.04" filter="url(#p-blur)"/>
        <rect x="60" y="40" width="400" height="240" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <rect x="60" y="40" width="400" height="36" rx="14" fill="rgba(255,255,255,0.05)"/>
        <rect x="60" y="62" width="400" height="14" fill="rgba(255,255,255,0.05)"/>
        <circle cx="82" cy="58" r="5" fill="rgba(252,3,176,0.5)"/>
        <circle cx="98" cy="58" r="5" fill="rgba(255,200,0,0.4)"/>
        <circle cx="114" cy="58" r="5" fill="rgba(34,197,94,0.5)"/>
        <rect x="148" y="50" width="220" height="16" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <rect x="158" y="55" width="100" height="6" rx="3" fill="rgba(255,255,255,0.3)"/>
        <g className="perf-glow">
          <circle cx="170" cy="175" r="52" fill="none" stroke="rgba(34,197,94,0.1)" strokeWidth="8"/>
          <circle className="perf-circle" cx="170" cy="175" r="45" fill="none" stroke="url(#p-green)" strokeWidth="6" strokeLinecap="round" transform="rotate(-90 170 175)"/>
        </g>
        <g className="perf-num">
          <text x="170" y="181" textAnchor="middle" fontSize="32" fontWeight="900" fill="white">100</text>
          <text x="170" y="197" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)" letterSpacing="1">PERFORMANCE</text>
        </g>
        <g transform="translate(248,105)">
          <text x="0" y="0" fontSize="9" fill="rgba(255,255,255,0.45)">FIRST CONTENTFUL PAINT</text>
          <text x="0" y="18" fontSize="16" fontWeight="700" fill="white">1.2s</text>
          <rect x="0" y="24" width="200" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
          <rect className="perf-bar1" x="0" y="24" height="6" rx="3" fill="url(#p-green)" style={{width:0}}/>
          <text x="0" y="52" fontSize="9" fill="rgba(255,255,255,0.45)">FIRST INPUT DELAY</text>
          <text x="0" y="70" fontSize="16" fontWeight="700" fill="white">12ms</text>
          <rect x="0" y="76" width="200" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
          <rect className="perf-bar2" x="0" y="76" height="6" rx="3" fill="url(#p-green)" style={{width:0}}/>
          <text x="0" y="104" fontSize="9" fill="rgba(255,255,255,0.45)">LARGEST CONTENTFUL PAINT</text>
          <text x="0" y="122" fontSize="16" fontWeight="700" fill="white">0.9s</text>
          <rect x="0" y="128" width="200" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
          <rect className="perf-bar3" x="0" y="128" height="6" rx="3" fill="url(#p-green)" style={{width:0}}/>
        </g>
        <g transform="translate(248,248)">
          <rect x="0" y="0" width="120" height="22" rx="11" fill="url(#p-green)" opacity="0.15" stroke="rgba(34,197,94,0.3)" strokeWidth="1"/>
          <text x="12" y="15" fontSize="10" fill="#22c55e" fontWeight="700">✓ Fast (90-100)</text>
        </g>
      </svg>
    </div>
  )
}

function EcommerceScalabileVisual() {
  return (
    <div style={card}>
      <style>{`
        @keyframes sc-notify { 0%{opacity:0;transform:translateY(8px)} 20%{opacity:1;transform:translateY(0)} 80%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-8px)} }
        @keyframes sc-count { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sc-pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        .sc-notify1 { animation: sc-notify 3s ease-in-out infinite 0.5s; opacity:0; }
        .sc-notify2 { animation: sc-notify 3s ease-in-out infinite 1.8s; opacity:0; }
        .sc-notify3 { animation: sc-notify 3s ease-in-out infinite 3.1s; opacity:0; }
        .sc-count { animation: sc-count 0.6s ease forwards 0.4s; opacity:0; }
        .sc-dot { animation: sc-pulse 1.5s ease-in-out infinite; }
      `}</style>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 60% 50%, rgba(4,124,249,0.10) 0%, transparent 60%), radial-gradient(ellipse at 20% 50%, rgba(252,3,176,0.08) 0%, transparent 60%)"}} />
      <svg viewBox="0 0 520 320" style={{width:"90%",maxWidth:480}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sc-g1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={gradStart}/><stop offset="100%" stopColor={gradEnd}/></linearGradient>
        </defs>

        {/* iPhone più grande e centrato */}
        <rect x="185" y="18" width="150" height="284" rx="26" fill="#0d1b38" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
        <rect x="185" y="18" width="150" height="284" rx="26" fill="none" stroke="url(#sc-g1)" strokeWidth="1.5" opacity="0.35"/>
        <rect x="228" y="26" width="64" height="10" rx="5" fill="rgba(0,0,0,0.6)"/>

        {/* Ora e data */}
        <text x="260" y="72" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.3)">Monday, June 5</text>
        <text x="260" y="102" textAnchor="middle" fontSize="36" fontWeight="200" fill="white">9:41</text>
        <rect x="196" y="115" width="128" height="0.5" fill="rgba(255,255,255,0.1)"/>

        {/* Notifiche con icona borsa verde */}
        <g className="sc-notify1">
  <rect x="196" y="124" width="128" height="44" rx="12" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
  <rect x="206" y="134" width="22" height="22" rx="6" fill="#96BF48"/>
  <text x="217" y="150" textAnchor="middle" fontSize="12" fill="white">🛍</text>
  <rect x="234" y="132" width="68" height="6" rx="3" fill="rgba(255,255,255,0.5)"/>
  <rect x="234" y="143" width="48" height="5" rx="2" fill="rgba(255,255,255,0.25)"/>
  <text x="316" y="138" textAnchor="end" fontSize="8" fill="rgba(252,3,176,0.9)" fontWeight="700">now</text>
  <text x="234" y="158" fontSize="7" fill="rgba(255,255,255,0.4)">Nuovo ordine ricevuto</text>
</g>

<g className="sc-notify2">
  <rect x="196" y="180" width="128" height="44" rx="12" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
  <rect x="206" y="190" width="22" height="22" rx="6" fill="#96BF48"/>
  <text x="217" y="206" textAnchor="middle" fontSize="12" fill="white">💳</text>
  <rect x="234" y="188" width="56" height="6" rx="3" fill="rgba(255,255,255,0.5)"/>
  <rect x="234" y="199" width="40" height="5" rx="2" fill="rgba(255,255,255,0.25)"/>
  <text x="316" y="194" textAnchor="end" fontSize="8" fill="rgba(252,3,176,0.9)" fontWeight="700">now</text>
  <text x="234" y="214" fontSize="7" fill="rgba(255,255,255,0.4)">Pagamento confermato</text>
</g>

<g className="sc-notify3">
  <rect x="196" y="236" width="128" height="44" rx="12" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
  <rect x="206" y="246" width="22" height="22" rx="6" fill="#96BF48"/>
  <text x="217" y="262" textAnchor="middle" fontSize="12" fill="white">📦</text>
  <rect x="234" y="244" width="74" height="6" rx="3" fill="rgba(255,255,255,0.5)"/>
  <rect x="234" y="255" width="52" height="5" rx="2" fill="rgba(255,255,255,0.25)"/>
  <text x="316" y="250" textAnchor="end" fontSize="8" fill="rgba(252,3,176,0.9)" fontWeight="700">now</text>
  <text x="234" y="270" fontSize="7" fill="rgba(255,255,255,0.4)">Ordine spedito</text>
</g>

        {/* Home indicator */}
        <rect x="232" y="290" width="56" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>

        {/* Card ORDINI OGGI */}
        <g transform="translate(30,80)">
          <rect x="0" y="0" width="120" height="64" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
          <text x="14" y="22" fontSize="9" fill="rgba(255,255,255,0.35)">ORDINI OGGI</text>
          <g className="sc-count"><text x="14" y="48" fontSize="28" fontWeight="900" fill="white">247</text></g>
          <circle cx="100" cy="18" r="6" fill="rgba(34,197,94,0.3)" stroke="rgba(34,197,94,0.6)" strokeWidth="1"/>
          <circle className="sc-dot" cx="100" cy="18" r="4" fill="#22c55e"/>
        </g>

        {/* Card REVENUE */}
        <g transform="translate(370,80)">
          <rect x="0" y="0" width="120" height="64" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
          <text x="14" y="22" fontSize="9" fill="rgba(255,255,255,0.35)">REVENUE</text>
          <text x="14" y="48" fontSize="24" fontWeight="900" fill="white">€32k</text>
          <text x="14" y="62" fontSize="9" fill="#22c55e" fontWeight="700">↑ +18%</text>
        </g>

      </svg>
    </div>
  )
}

function CROAnalisiVisual() {
  return (
    <div style={card}>
      <style>{`
        @keyframes cro-hm1 { 0%,100%{opacity:0.3} 50%{opacity:0.9} }
        @keyframes cro-hm2 { 0%,100%{opacity:0.2} 50%{opacity:0.7} }
        @keyframes cro-cursor { 0%{transform:translate(0,0)} 30%{transform:translate(40px,20px)} 60%{transform:translate(80px,-10px)} 100%{transform:translate(0,0)} }
        @keyframes cro-tooltip { 0%,40%{opacity:0} 50%,90%{opacity:1} 100%{opacity:0} }
        @keyframes cro-rec { 0%{r:4} 50%{r:7} 100%{r:4} }
        .cro-hm1 { animation: cro-hm1 2.5s ease-in-out infinite; }
        .cro-hm2 { animation: cro-hm2 2.5s ease-in-out infinite 0.8s; }
        .cro-cursor { animation: cro-cursor 4s ease-in-out infinite; }
        .cro-tooltip { animation: cro-tooltip 4s ease-in-out infinite; }
        .cro-rec { animation: cro-rec 1.5s ease-in-out infinite; fill:#ef4444; }
      `}</style>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 40% 40%, rgba(252,3,176,0.08) 0%, transparent 55%)"}} />
      <svg viewBox="0 0 520 320" style={{width:"90%",maxWidth:480}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ca-hot1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/><stop offset="60%" stopColor="#f97316" stopOpacity="0.3"/><stop offset="100%" stopColor="transparent"/></radialGradient>
          <radialGradient id="ca-hot2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fc03b0" stopOpacity="0.7"/><stop offset="60%" stopColor="#7c3aed" stopOpacity="0.2"/><stop offset="100%" stopColor="transparent"/></radialGradient>
          <filter id="ca-blur2"><feGaussianBlur stdDeviation="6"/></filter>
        </defs>
        <rect x="60" y="30" width="400" height="260" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <rect x="60" y="30" width="400" height="32" rx="14" fill="rgba(255,255,255,0.04)"/>
        <rect x="60" y="48" width="400" height="14" fill="rgba(255,255,255,0.04)"/>
        <circle cx="80" cy="46" r="4" fill="rgba(239,68,68,0.5)"/>
        <circle cx="94" cy="46" r="4" fill="rgba(250,204,21,0.4)"/>
        <circle cx="108" cy="46" r="4" fill="rgba(34,197,94,0.5)"/>
        <rect x="136" y="38" width="200" height="14" rx="7" fill="rgba(255,255,255,0.05)"/>
        <rect x="72" y="72" width="376" height="20" rx="4" fill="rgba(255,255,255,0.04)"/>
        <rect x="72" y="100" width="200" height="12" rx="3" fill="rgba(255,255,255,0.04)"/>
        <rect x="72" y="118" width="160" height="12" rx="3" fill="rgba(255,255,255,0.04)"/>
        <rect x="280" y="100" width="80" height="30" rx="8" fill="rgba(252,3,176,0.08)" stroke="rgba(252,3,176,0.2)" strokeWidth="1"/>
        <rect x="72" y="160" width="100" height="60" rx="6" fill="rgba(255,255,255,0.03)"/>
        <rect x="184" y="160" width="100" height="60" rx="6" fill="rgba(255,255,255,0.03)"/>
        <rect x="296" y="160" width="100" height="60" rx="6" fill="rgba(255,255,255,0.03)"/>
        <g className="cro-hm1"><ellipse cx="320" cy="115" rx="45" ry="25" fill="url(#ca-hot1)" filter="url(#ca-blur2)"/></g>
        <g className="cro-hm2">
          <ellipse cx="145" cy="185" rx="55" ry="30" fill="url(#ca-hot2)" filter="url(#ca-blur2)"/>
          <ellipse cx="235" cy="185" rx="35" ry="25" fill="url(#ca-hot1)" filter="url(#ca-blur2)" opacity="0.5"/>
        </g>
        <g className="cro-cursor" transform="translate(200,120)">
          <polygon points="0,0 0,16 5,12 8,18 10,17 7,11 13,11" fill="white" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5"/>
        </g>
        <g className="cro-tooltip" transform="translate(210,100)">
          <rect x="0" y="0" width="100" height="28" rx="8" fill="rgba(252,3,176,0.9)"/>
          <text x="10" y="12" fontSize="8" fill="white" fontWeight="700">Drop-off: 68%</text>
          <text x="10" y="22" fontSize="7" fill="rgba(255,255,255,0.8)">Users exit here</text>
        </g>
        <g transform="translate(400,50)"><circle className="cro-rec" cx="8" cy="8" r="4"/><text x="18" y="12" fontSize="8" fill="rgba(255,255,255,0.5)" fontWeight="600">REC</text></g>
        <g transform="translate(72,240)">
          <rect x="0" y="0" width="88" height="36" rx="10" fill="rgba(252,3,176,0.08)" stroke="rgba(252,3,176,0.2)" strokeWidth="1"/>
          <text x="10" y="14" fontSize="7" fill="rgba(255,255,255,0.4)">SCROLL DEPTH</text>
          <text x="10" y="28" fontSize="14" fontWeight="800" fill={gradStart}>42%</text>
          <rect x="100" y="0" width="88" height="36" rx="10" fill="rgba(4,124,249,0.08)" stroke="rgba(4,124,249,0.2)" strokeWidth="1"/>
          <text x="110" y="14" fontSize="7" fill="rgba(255,255,255,0.4)">CLICK RATE</text>
          <text x="110" y="28" fontSize="14" fontWeight="800" fill={gradEnd}>8.2%</text>
          <rect x="200" y="0" width="88" height="36" rx="10" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.2)" strokeWidth="1"/>
          <text x="210" y="14" fontSize="7" fill="rgba(255,255,255,0.4)">EXIT RATE</text>
          <text x="210" y="28" fontSize="14" fontWeight="800" fill="#ef4444">68%</text>
          <rect x="300" y="0" width="88" height="36" rx="10" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.2)" strokeWidth="1"/>
          <text x="310" y="14" fontSize="7" fill="rgba(255,255,255,0.4)">CVR</text>
          <text x="310" y="28" fontSize="14" fontWeight="800" fill="#22c55e">1.4%</text>
        </g>
      </svg>
    </div>
  )
}

function CROABTestVisual() {
  return (
    <div style={card}>
      <style>{`
        @keyframes ab-fill-a { from{height:0;y:180} to{height:80px;y:100} }
        @keyframes ab-fill-b { from{height:0;y:180} to{height:130px;y:50} }
        @keyframes ab-badge { 0%{opacity:0;transform:scale(0.8)} 100%{opacity:1;transform:scale(1)} }
        @keyframes ab-line { from{stroke-dashoffset:200} to{stroke-dashoffset:0} }
        @keyframes ab-blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .ab-bar-a { animation: ab-fill-a 1.2s cubic-bezier(0.4,0,0.2,1) forwards 0.5s; }
        .ab-bar-b { animation: ab-fill-b 1.2s cubic-bezier(0.4,0,0.2,1) forwards 0.8s; }
        .ab-badge { animation: ab-badge 0.5s ease forwards 2s; opacity:0; }
        .ab-line { animation: ab-line 1s ease forwards 0.3s; stroke-dasharray:200; stroke-dashoffset:200; }
        .ab-blink { animation: ab-blink 1.5s ease-in-out infinite 2.5s; }
      `}</style>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 60%, rgba(252,3,176,0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 40%, rgba(4,124,249,0.08) 0%, transparent 55%)"}} />
      <svg viewBox="0 0 520 320" style={{width:"90%",maxWidth:480}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ab-g1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={gradStart}/><stop offset="100%" stopColor={gradEnd}/></linearGradient>
          <linearGradient id="ab-ga" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor={gradStart} stopOpacity="0.4"/><stop offset="100%" stopColor={gradStart} stopOpacity="0.9"/></linearGradient>
          <linearGradient id="ab-gb" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor={gradEnd} stopOpacity="0.4"/><stop offset="100%" stopColor={gradEnd} stopOpacity="0.9"/></linearGradient>
        </defs>
        <rect x="100" y="30" width="140" height="34" rx="10" fill="rgba(252,3,176,0.08)" stroke="rgba(252,3,176,0.25)" strokeWidth="1"/>
        <text x="170" y="52" textAnchor="middle" fontSize="14" fontWeight="900" fill={gradStart}>A</text>
        <text x="125" y="52" fontSize="10" fill="rgba(255,255,255,0.4)">Variante</text>
        <rect x="280" y="30" width="140" height="34" rx="10" fill="rgba(4,124,249,0.08)" stroke="rgba(4,124,249,0.25)" strokeWidth="1"/>
        <text x="350" y="52" textAnchor="middle" fontSize="14" fontWeight="900" fill={gradEnd}>B</text>
        <text x="305" y="52" fontSize="10" fill="rgba(255,255,255,0.4)">Variante</text>
        <circle cx="260" cy="47" r="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <text x="260" y="52" textAnchor="middle" fontSize="11" fontWeight="700" fill="rgba(255,255,255,0.5)">VS</text>
        <rect x="80" y="85" width="360" height="140" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <rect className="ab-bar-a" x="155" y="100" width="70" height="80" rx="8" fill="url(#ab-ga)"/>
        <rect className="ab-bar-b" x="295" y="100" width="70" height="80" rx="8" fill="url(#ab-gb)"/>
        <text x="190" y="238" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">CVR: 1.8%</text>
        <text x="330" y="238" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">CVR: 3.2%</text>
        <g className="ab-badge" transform="translate(270,42)">
          <rect x="0" y="0" width="80" height="22" rx="11" fill="url(#ab-gb)" opacity="0.2" stroke="rgba(4,124,249,0.4)" strokeWidth="1"/>
          <text x="10" y="15" fontSize="9" fill={gradEnd} fontWeight="700">🏆 Winner</text>
        </g>
        <g transform="translate(100,256)">
          <rect x="0" y="0" width="320" height="32" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
          <text x="16" y="14" fontSize="8" fill="rgba(255,255,255,0.35)">STATISTICAL CONFIDENCE</text>
          <rect x="16" y="18" width="288" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
          <rect className="ab-line" x="16" y="18" width="230" height="6" rx="3" fill="url(#ab-g1)"/>
          <text x="250" y="24" fontSize="8" fill="white" fontWeight="700" className="ab-blink">95%</text>
        </g>
      </svg>
    </div>
  )
}

function CROCrescitaVisual() {
  return (
    <div style={card}>
      <style>{`
        @keyframes cr-line { from{stroke-dashoffset:600} to{stroke-dashoffset:0} }
        @keyframes cr-dot { from{opacity:0;r:0} to{opacity:1;r:6} }
        @keyframes cr-label { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cr-glow { 0%,100%{opacity:0.4} 50%{opacity:1} }
        .cr-line { animation: cr-line 2s cubic-bezier(0.4,0,0.2,1) forwards 0.3s; stroke-dasharray:600; stroke-dashoffset:600; }
        .cr-dot1 { animation: cr-dot 0.4s ease forwards 2.1s; opacity:0; }
        .cr-dot2 { animation: cr-dot 0.4s ease forwards 2.3s; opacity:0; }
        .cr-label1 { animation: cr-label 0.4s ease forwards 2.2s; opacity:0; }
        .cr-label2 { animation: cr-label 0.4s ease forwards 2.4s; opacity:0; }
        .cr-glow { animation: cr-glow 2s ease-in-out infinite 2.5s; }
      `}</style>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 70% 30%, rgba(34,197,94,0.08) 0%, transparent 55%), radial-gradient(ellipse at 30% 70%, rgba(252,3,176,0.06) 0%, transparent 55%)"}} />
      <svg viewBox="0 0 520 320" style={{width:"90%",maxWidth:480}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cr-g1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={gradStart}/><stop offset="100%" stopColor={gradEnd}/></linearGradient>
          <linearGradient id="cr-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={gradEnd} stopOpacity="0.25"/><stop offset="100%" stopColor={gradEnd} stopOpacity="0"/></linearGradient>
          <filter id="cr-gf"><feGaussianBlur stdDeviation="6"/></filter>
        </defs>
        <rect x="52" y="30" width="416" height="250" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        <text x="76" y="60" fontSize="11" fill="rgba(255,255,255,0.4)">REVENUE MENSILE</text>
        <text x="76" y="82" fontSize="26" fontWeight="900" fill="white">€ 48.200</text>
        <rect x="76" y="90" width="70" height="18" rx="9" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.3)" strokeWidth="1"/>
        <text x="84" y="103" fontSize="9" fill="#22c55e" fontWeight="700">↑ +40% CVR</text>
        {[130,160,190,220,250].map((y,i)=><line key={i} x1="76" y1={y} x2="444" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
        {["Gen","Feb","Mar","Apr","Mag","Giu"].map((m,i)=><text key={i} x={96+i*58} y="272" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.25)">{m}</text>)}
        <path d="M96,240 C120,235 140,220 154,200 C168,180 175,175 212,160 C249,145 260,140 270,125 C280,110 300,100 328,88 C356,76 380,72 444,60 L444,250 L96,250 Z" fill="url(#cr-area)"/>
        <path className="cr-line" d="M96,240 C120,235 140,220 154,200 C168,180 175,175 212,160 C249,145 260,140 270,125 C280,110 300,100 328,88 C356,76 380,72 444,60" fill="none" stroke="url(#cr-g1)" strokeWidth="3" strokeLinecap="round"/>
        <circle className="cr-glow" cx="444" cy="60" r="12" fill={gradEnd} opacity="0.3" filter="url(#cr-gf)"/>
        <circle className="cr-dot1" cx="212" cy="160" r="0" fill="white" stroke={gradStart} strokeWidth="2"/>
        <circle className="cr-dot2" cx="444" cy="60" r="0" fill="white" stroke={gradEnd} strokeWidth="2"/>
        <g className="cr-label1">
          <rect x="182" y="140" width="60" height="20" rx="6" fill="rgba(252,3,176,0.15)" stroke="rgba(252,3,176,0.3)" strokeWidth="1"/>
          <text x="212" y="154" textAnchor="middle" fontSize="8" fill={gradStart} fontWeight="700">€28k</text>
        </g>
        <g className="cr-label2">
          <rect x="406" y="42" width="60" height="20" rx="6" fill="rgba(4,124,249,0.15)" stroke="rgba(4,124,249,0.3)" strokeWidth="1"/>
          <text x="436" y="56" textAnchor="middle" fontSize="8" fill={gradEnd} fontWeight="700">€48k</text>
        </g>
        <line x1="212" y1="160" x2="212" y2="250" stroke="rgba(252,3,176,0.15)" strokeWidth="1" strokeDasharray="3,3"/>
        <text x="212" y="268" textAnchor="middle" fontSize="7" fill="rgba(252,3,176,0.5)">CRO start</text>
      </svg>
    </div>
  )
}

function SitiwebImmersiveVisual() {
  return (
    <div style={card}>
      <style>{`
        @keyframes im-layer1 { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-6px) translateX(3px)} 100%{transform:translateY(0) translateX(0)} }
        @keyframes im-layer2 { 0%{transform:translateY(0)} 50%{transform:translateY(-10px)} 100%{transform:translateY(0)} }
        @keyframes im-layer3 { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-4px) translateX(-3px)} 100%{transform:translateY(0) translateX(0)} }
        @keyframes im-glow { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes im-cursor { 0%{transform:translate(0,0)} 33%{transform:translate(30px,-20px)} 66%{transform:translate(-20px,20px)} 100%{transform:translate(0,0)} }
        @keyframes im-ripple { 0%{r:0;opacity:0.6} 100%{r:30;opacity:0} }
        .im-l1 { animation: im-layer1 4s ease-in-out infinite; }
        .im-l2 { animation: im-layer2 3s ease-in-out infinite 0.5s; }
        .im-l3 { animation: im-layer3 5s ease-in-out infinite 1s; }
        .im-glow { animation: im-glow 2s ease-in-out infinite; }
        .im-cursor { animation: im-cursor 5s ease-in-out infinite; }
        .im-ripple { animation: im-ripple 2s ease-out infinite 1s; }
      `}</style>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 60%)"}} />
      <svg viewBox="0 0 520 320" style={{width:"90%",maxWidth:480}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="im-g1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={gradStart}/><stop offset="100%" stopColor={gradEnd}/></linearGradient>
          <linearGradient id="im-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a0a2e"/><stop offset="100%" stopColor="#0d1b38"/></linearGradient>
          <filter id="im-blur"><feGaussianBlur stdDeviation="10"/></filter>
        </defs>
        <rect x="60" y="25" width="400" height="255" rx="16" fill="url(#im-bg)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <g className="im-l3" opacity="0.5">
          <ellipse cx="260" cy="140" rx="120" ry="80" fill={gradStart} opacity="0.06" filter="url(#im-blur)"/>
          <ellipse cx="300" cy="160" rx="100" ry="70" fill={gradEnd} opacity="0.08" filter="url(#im-blur)"/>
        </g>
        <g className="im-l2">
          <rect x="120" y="70" width="280" height="160" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
          <rect x="140" y="90" width="180" height="18" rx="4" fill="rgba(255,255,255,0.06)"/>
          <rect x="140" y="115" width="240" height="12" rx="3" fill="rgba(255,255,255,0.04)"/>
          <rect x="140" y="133" width="200" height="12" rx="3" fill="rgba(255,255,255,0.04)"/>
          <rect x="140" y="160" width="100" height="32" rx="16" fill="url(#im-g1)" opacity="0.8"/>
          <rect x="152" y="172" width="76" height="8" rx="4" fill="rgba(255,255,255,0.8)"/>
        </g>
        <g className="im-l1">
          <rect x="80" y="175" width="100" height="70" rx="12" fill="rgba(252,3,176,0.08)" stroke="rgba(252,3,176,0.2)" strokeWidth="1"/>
          <rect x="92" y="188" width="76" height="8" rx="4" fill="rgba(252,3,176,0.3)"/>
          <rect x="92" y="202" width="55" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>
          <rect x="340" y="60" width="100" height="70" rx="12" fill="rgba(4,124,249,0.08)" stroke="rgba(4,124,249,0.2)" strokeWidth="1"/>
          <rect x="352" y="73" width="76" height="8" rx="4" fill="rgba(4,124,249,0.5)"/>
          <rect x="352" y="87" width="55" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>
        </g>
        <g className="im-cursor" transform="translate(230,150)">
          <circle className="im-ripple" cx="0" cy="0" r="0" fill={gradStart} opacity="0"/>
          <polygon points="0,0 0,18 5,14 9,20 11,19 7,13 14,13" fill="white" opacity="0.9"/>
        </g>
        <circle className="im-glow" cx="260" cy="140" r="60" fill="url(#im-g1)" opacity="0.04" filter="url(#im-blur)"/>
        <g transform="translate(80,290)">
          {["Animazioni","Micro-interazioni","Layout evoluti"].map((t,i)=>(
            <g key={i} transform={`translate(${i*130},0)`}>
              <rect x="0" y="0" width="110" height="18" rx="9" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
              <text x="10" y="13" fontSize="8" fill="rgba(255,255,255,0.4)">{t}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

function SitiwebSviluppoVisual() {
  return (
    <div style={card}>
      <style>{`
        @keyframes sv-cursor { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes sv-line { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sv-tag { 0%{transform:scale(1)} 50%{transform:scale(1.08)} 100%{transform:scale(1)} }
        .sv-l1 { animation: sv-line 0.4s ease forwards 0.3s; opacity:0; }
        .sv-l2 { animation: sv-line 0.4s ease forwards 0.6s; opacity:0; }
        .sv-l3 { animation: sv-line 0.4s ease forwards 0.9s; opacity:0; }
        .sv-l4 { animation: sv-line 0.4s ease forwards 1.2s; opacity:0; }
        .sv-l5 { animation: sv-line 0.4s ease forwards 1.5s; opacity:0; }
        .sv-l6 { animation: sv-line 0.4s ease forwards 1.8s; opacity:0; }
        .sv-cursor { animation: sv-cursor 1s ease-in-out infinite 2s; }
        .sv-tag1 { animation: sv-tag 2.5s ease-in-out infinite 0.5s; }
        .sv-tag2 { animation: sv-tag 2.5s ease-in-out infinite 1s; }
        .sv-tag3 { animation: sv-tag 2.5s ease-in-out infinite 1.5s; }
      `}</style>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 50%, rgba(4,124,249,0.08) 0%, transparent 55%)"}} />
      <svg viewBox="0 0 520 320" style={{width:"90%",maxWidth:480}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sv-g1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={gradStart}/><stop offset="100%" stopColor={gradEnd}/></linearGradient>
        </defs>
        <rect x="52" y="30" width="260" height="260" rx="14" fill="rgba(10,12,20,0.9)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
        <rect x="52" y="30" width="260" height="32" rx="14" fill="rgba(255,255,255,0.03)"/>
        <rect x="52" y="48" width="260" height="14" fill="rgba(255,255,255,0.03)"/>
        <rect x="66" y="36" width="70" height="20" rx="4" fill="rgba(255,255,255,0.06)"/>
        <text x="76" y="51" fontSize="8" fill="rgba(255,255,255,0.5)">index.tsx</text>
        <rect x="144" y="40" width="60" height="14" rx="3" fill="rgba(255,255,255,0.03)"/>
        <text x="152" y="51" fontSize="8" fill="rgba(255,255,255,0.25)">styles.css</text>
        {[1,2,3,4,5,6,7,8,9,10].map((n,i)=><text key={i} x="66" y={82+i*18} fontSize="8" fill="rgba(255,255,255,0.15)" textAnchor="end">{n}</text>)}
        <g className="sv-l1" transform="translate(76,80)"><text fontSize="9" fill="#7dd3fc" fontFamily="monospace">{"<"}</text><text x="8" fontSize="9" fill={gradStart} fontFamily="monospace">Hero</text><text x="44" fontSize="9" fill="#7dd3fc" fontFamily="monospace">{"/>"}</text></g>
        <g className="sv-l2" transform="translate(76,98)"><text x="10" fontSize="9" fill="#86efac" fontFamily="monospace">title</text><text x="42" fontSize="9" fill="rgba(255,255,255,0.4)" fontFamily="monospace">=</text><text x="50" fontSize="9" fill="#fde68a" fontFamily="monospace">"Next Level"</text></g>
        <g className="sv-l3" transform="translate(76,116)"><text x="10" fontSize="9" fill="#86efac" fontFamily="monospace">gradient</text><text x="62" fontSize="9" fill="rgba(255,255,255,0.4)" fontFamily="monospace">=</text><text x="70" fontSize="9" fill="#c4b5fd" fontFamily="monospace">{"{brand}"}</text></g>
        <g className="sv-l4" transform="translate(76,134)"><text fontSize="9" fill="#7dd3fc" fontFamily="monospace">{"<"}</text><text x="8" fontSize="9" fill={gradEnd} fontFamily="monospace">Section</text><text x="60" fontSize="9" fill="#7dd3fc" fontFamily="monospace">{"/>"}</text></g>
        <g className="sv-l5" transform="translate(76,152)"><text x="10" fontSize="9" fill="#86efac" fontFamily="monospace">cms</text><text x="34" fontSize="9" fill="rgba(255,255,255,0.4)" fontFamily="monospace">=</text><text x="42" fontSize="9" fill="#fde68a" fontFamily="monospace">"sanity"</text></g>
        <g className="sv-l6" transform="translate(76,170)"><text fontSize="9" fill="#7dd3fc" fontFamily="monospace">{"<"}</text><text x="8" fontSize="9" fill={gradStart} fontFamily="monospace">Footer</text><text x="52" fontSize="9" fill="#7dd3fc" fontFamily="monospace">{"/>"}</text><rect className="sv-cursor" x="64" y="-10" width="2" height="12" fill="white" rx="1"/></g>
        <g className="sv-tag1" transform="translate(340,50)"><rect x="0" y="0" width="70" height="28" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(4,124,249,0.3)" strokeWidth="1"/><text x="14" y="19" fontSize="12">⚛️</text><text x="32" y="19" fontSize="9" fill="rgba(255,255,255,0.6)" fontWeight="600">React</text></g>
        <g className="sv-tag2" transform="translate(330,95)"><rect x="0" y="0" width="80" height="28" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(252,3,176,0.3)" strokeWidth="1"/><text x="14" y="19" fontSize="12">▲</text><text x="30" y="19" fontSize="9" fill="rgba(255,255,255,0.6)" fontWeight="600">Next.js</text></g>
        <g transform="translate(345,140)"><rect x="0" y="0" width="70" height="28" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(34,197,94,0.3)" strokeWidth="1"/><text x="14" y="19" fontSize="12">🎨</text><text x="32" y="19" fontSize="9" fill="rgba(255,255,255,0.6)" fontWeight="600">CSS</text></g>
        <g className="sv-tag3" transform="translate(330,185)"><rect x="0" y="0" width="90" height="28" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(250,204,21,0.3)" strokeWidth="1"/><text x="14" y="19" fontSize="12">🔷</text><text x="32" y="19" fontSize="9" fill="rgba(255,255,255,0.6)" fontWeight="600">TypeScript</text></g>
        <g transform="translate(340,230)"><rect x="0" y="0" width="70" height="28" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(167,139,250,0.3)" strokeWidth="1"/><text x="14" y="19" fontSize="12">🟣</text><text x="32" y="19" fontSize="9" fill="rgba(255,255,255,0.6)" fontWeight="600">Sanity</text></g>
        <rect x="52" y="260" width="260" height="30" fill="rgba(255,255,255,0.02)"/>
        <text x="76" y="279" fontSize="8" fill="rgba(34,197,94,0.6)">✓ Build successful — 0 errors</text>
      </svg>
    </div>
  )
}

export function ValuePropVisual({ visualKey }: { visualKey: string }) {
  switch (visualKey) {
    case "ecommerce-ux":          return <EcommerceUXVisual />
    case "ecommerce-performance": return <EcommercePerformanceVisual />
    case "ecommerce-scalabile":   return <EcommerceScalabileVisual />
    case "cro-analisi":           return <CROAnalisiVisual />
    case "cro-abtest":            return <CROABTestVisual />
    case "cro-crescita":          return <CROCrescitaVisual />
    case "sitiweb-immersive":     return <SitiwebImmersiveVisual />
    case "sitiweb-performance":   return <EcommercePerformanceVisual />
    case "sitiweb-sviluppo":      return <SitiwebSviluppoVisual />
    default:
      return (
        <div style={{...card, alignItems:"center", justifyContent:"center"}}>
          <p style={{color:"rgba(255,255,255,0.2)", fontSize:12}}>Visual: {visualKey}</p>
        </div>
      )
  }
}