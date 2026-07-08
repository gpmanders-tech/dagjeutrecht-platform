import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════
   BUSINESS CONFIG — hidden from customer
══════════════════════════════════════════════════════ */
const MARGIN = 0.10; // 10% markup on all prices — never shown
const VAT_LOW = 0.09;  // 9% BTW (entertainment/food)
const VAT_HIGH = 0.21; // 21% BTW (services)
const WEFACT_WEBHOOK = "https://api.wefact.nl/v2/invoices"; // illustrative

function applyMargin(basePrice) {
  return Math.ceil(basePrice * (1 + MARGIN));
}
function calcVat(total, rate) {
  return +(total * rate).toFixed(2);
}

/* ══════════════════════════════════════════════════════
   PROVIDER DATABASE
   bookable: true  → online boekbaar (iDEAL etc.)
   bookable: false → niet boekbaar, alleen tip tonen
   api: booking system used
   baseprice: NET prijs (voor margin-berekening)
══════════════════════════════════════════════════════ */
const PROVIDERS = {

  // ── INDOOR ACTIVITEITEN (winter-proof) ──────────────
  indoor: [
    {
      id: "pingpong", name: "The Ping Pong Club", icon: "🏓",
      cat: "indoor", tags: ["Groepen", "Teambuilding", "Drank & Eten"],
      desc: "Ping pong tafels, bubbels en boardgames in industrial-cool setting. Perfect voor bedrijfsuitjes. Tafelreservering vereist voor groepen.",
      rating: 4.4, reviews: 759, baseprice: 10, vatRate: VAT_LOW,
      bookable: true, api: "direct", apiLabel: "Direct API",
      bookingNote: "Tafel reserveren via eigen systeem — wij boeken namens jou.",
      groupFriendly: true, minPax: 1, maxPax: 80,
      openingHours: "Wo–Vr 15–23, Za 12–23, Zo 15–23",
      address: "Concordiastraat 80, Utrecht",
      slots: ["15:00", "17:00", "19:00", "21:00"], fullSlots: [],
    },
    {
      id: "jeubar", name: "JEU de Boules Bar Utrecht", icon: "🎳",
      cat: "indoor", tags: ["Jeu de Boules", "Groepen", "Banen reserveren"],
      desc: "Binnenpétanque op meerdere banen, incl. drank & bites. Online baanreservering via eigen systeem. Populair voor bedrijfsuitjes.",
      rating: 4.2, reviews: 1096, baseprice: 12, vatRate: VAT_LOW,
      bookable: true, api: "direct", apiLabel: "Direct API",
      bookingNote: "Baanreservering via jeubarbar.nl — wij reserveren voor u.",
      groupFriendly: true, minPax: 4, maxPax: 60,
      openingHours: "Di–Do 15–23, Vr 15–24, Za 12–24, Zo 12–19",
      address: "Paardenveld 3, Utrecht",
      slots: ["15:00", "16:00", "17:00", "18:00", "19:00", "20:00"], fullSlots: ["17:00"],
    },
    {
      id: "boulesclub", name: "The Boules Club Utrecht", icon: "🥎",
      cat: "indoor", tags: ["Pétanque", "Gracht", "Diner"],
      desc: "Pétanque aan de Oudegracht met bistro-diner arrangement. Groepspakketten: baan + main dish + drankjes. Sfeervolle kelder.",
      rating: 3.9, reviews: 316, baseprice: 28, vatRate: VAT_LOW,
      bookable: true, api: "direct", apiLabel: "Direct API",
      bookingNote: "Arrangement via theboulesclub.nl — inclusief diner.",
      groupFriendly: true, minPax: 4, maxPax: 40,
      openingHours: "Di–Do 15–23, Vr 15–01, Za 13–02, Zo 12–22",
      address: "Oudegracht 83, Utrecht",
      slots: ["16:00", "17:00", "18:00", "19:00", "20:00"], fullSlots: [],
    },
    {
      id: "grandshuffle", name: "The Grand Shuffle", icon: "🏒",
      cat: "indoor", tags: ["Shuffleboard", "Cocktails", "Teambuilding"],
      desc: "Shuffleboard met een moderne twist — bars rondom het speelveld, cocktails en snacks. Fantastisch voor teamuitjes. ★ 4.7/39",
      rating: 4.7, reviews: 39, baseprice: 22, vatRate: VAT_LOW,
      bookable: true, api: "direct", apiLabel: "Direct API",
      bookingNote: "Shuffleboard reservering via thegrandshuffle.nl",
      groupFriendly: true, minPax: 4, maxPax: 50,
      openingHours: "Wo–Do 16–23, Vr 16–01, Za 14–01, Zo 14–20",
      address: "Rijnkade 5, Utrecht",
      slots: ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00"], fullSlots: ["19:00"],
    },
    {
      id: "mooieboules", name: "Mooie Boules Utrecht", icon: "🎯",
      cat: "indoor", tags: ["Boules & Bites", "Karaoke", "Games"],
      desc: "Grootse indoor games-locatie met pétanque, karaoke, arcadegames en QR-bestelservice. Nieuw en populair — reserveer op tijd!",
      rating: 4.6, reviews: 153, baseprice: 15, vatRate: VAT_LOW,
      bookable: true, api: "direct", apiLabel: "Direct API",
      bookingNote: "Reservering via mooieboules.nl",
      groupFriendly: true, minPax: 2, maxPax: 100,
      openingHours: "Ma–Wo 16–23, Do 16–24, Vr 16–01, Za 12–01, Zo 12–23",
      address: "Steenovenweg 1, Utrecht",
      slots: ["16:00", "17:30", "19:00", "20:30"], fullSlots: [],
    },
    {
      id: "doloris", name: "Doloris Anoma Maze Utrecht", icon: "🌀",
      cat: "indoor", tags: ["Kunst Doolhof", "Uniek", "Avontuur"],
      desc: "Het beroemde kunst-doolhof van Utrecht — klimmen, kruipen en verdwalen in een immersieve multi-kamer installatie. 🌀 Uniek in NL!",
      rating: 4.5, reviews: 1312, baseprice: 16, vatRate: VAT_LOW,
      bookable: true, api: "direct", apiLabel: "Direct API",
      bookingNote: "Tickets via dolorisanoma.nl — tijdslot verplicht.",
      groupFriendly: true, minPax: 1, maxPax: 30,
      openingHours: "Ma–Do 10:30–21, Vr 10:30–23, Za 9:30–22:30, Zo 10–19:30",
      address: "2e Daalsedijk 6, Utrecht",
      slots: ["10:30", "12:00", "14:00", "16:00", "18:00", "20:00"], fullSlots: ["14:00"],
    },

    // ── NIET ONLINE BOEKBAAR — alleen TIP ──────────────
    {
      id: "waxfigurenmuseum", name: "Wax Figures Museum Utrecht", icon: "🗿",
      cat: "indoor", tags: ["Niet online boekbaar", "Tip"],
      desc: "Leuk voor een spontaan bezoekje, maar geen online reservering beschikbaar. Gewoon binnenlopen — bekijk de website voor actuele tarieven.",
      rating: 3.8, reviews: 210, baseprice: null, vatRate: null,
      bookable: false, api: null, apiLabel: null,
      tipText: "Gewoon binnenlopen tijdens openingstijden. Geen reservering nodig.",
      externalUrl: "https://www.google.com/maps/search/wax+museum+utrecht",
      groupFriendly: false,
      openingHours: "Zie website voor actuele tijden",
      address: "Utrecht centrum",
      slots: [], fullSlots: [],
    },

    // ── WORKSHOP SERIES (indoor, winter) ────────────────
    {
      id: "keramiek_serie", name: "Keramiek Cursus (4 lessen)", icon: "🏺",
      cat: "indoor", tags: ["Workshop Series", "4 lessen", "Groepen OK"],
      desc: "Vierdelige keramiekcursus bij House of Clay of Clay to Plate — inclusief materiaal, brandsessie en eigen afgewerkte stukken mee naar huis.",
      rating: 4.8, reviews: 109, baseprice: 130, vatRate: VAT_HIGH,
      bookable: true, api: "direct", apiLabel: "Direct API",
      bookingNote: "Reeks van 4 weken. Wij plannen de data in overleg.",
      groupFriendly: true, minPax: 1, maxPax: 12,
      openingHours: "Weekavonden 19:00–22:00",
      address: "Oudegracht aan de Werf, Utrecht",
      slots: ["Maandag 19:00", "Dinsdag 19:00", "Woensdag 19:00", "Donderdag 19:00"], fullSlots: [],
    },
    {
      id: "schilderij_serie", name: "Schildercursus (6 lessen)", icon: "🖌️",
      cat: "indoor", tags: ["Workshop Series", "6 lessen", "Wijn inbegrepen"],
      desc: "Zes avonden schilderen bij GrachtenAtelier — diverse technieken van aquarel tot olieverf. Glas wijn per les inbegrepen. 🍷",
      rating: 4.8, reviews: 659, baseprice: 175, vatRate: VAT_HIGH,
      bookable: true, api: "direct", apiLabel: "Direct API",
      bookingNote: "Reeks 6 weken. Start elke maand. Inclusief materialen & wijn.",
      groupFriendly: true, minPax: 1, maxPax: 16,
      openingHours: "Dinsdag of Donderdag 19:30–22:00",
      address: "Oudegracht aan de Werf 207, Utrecht",
      slots: ["Dinsdag 19:30", "Donderdag 19:30"], fullSlots: [],
    },
    {
      id: "bier_serie", name: "Bierbrouwen Masterclass (3 sessies)", icon: "🍺",
      cat: "indoor", tags: ["Bier", "3 sessies", "Eigen bier thuis"],
      desc: "Driedelige bierbrouwreeks bij De Brakkerij — van graan tot glas. Na sessie 3 neem je 10L zelfgebrouwen bier mee naar huis.",
      rating: 5.0, reviews: 21, baseprice: 185, vatRate: VAT_HIGH,
      bookable: true, api: "direct", apiLabel: "Direct API",
      bookingNote: "3 sessies incl. lunch en tasting. Groepen t/m 12 pers.",
      groupFriendly: true, minPax: 4, maxPax: 12,
      openingHours: "Zaterdagen 10:00–14:00",
      address: "Nieuwegein (nabij Utrecht)", slots: ["Za 10:00"], fullSlots: [],
    },
    {
      id: "koken_serie", name: "Aziatisch Koken (4 lessen)", icon: "🍜",
      cat: "indoor", tags: ["Workshop Series", "Aziatisch", "4 cuisines"],
      desc: "Vier avonden Aziatische keuken met Chopsticks Cooking — Thais, Japans, Vietnamese en dim sum. Inclusief diner na elke les.",
      rating: 4.9, reviews: 448, baseprice: 240, vatRate: VAT_HIGH,
      bookable: true, api: "direct", apiLabel: "Direct API",
      bookingNote: "4 donderdagavonden. Max 8 deelnemers. Inclusief alle ingrediënten.",
      groupFriendly: false, minPax: 2, maxPax: 8,
      openingHours: "Donderdag 18:30–21:30",
      address: "Zonnebaan 50, Utrecht", slots: ["Do 18:30"], fullSlots: [],
    },
  ],

  // ── OVERIGE CATEGORIEEN (verkorte lijst voor UI) ─────
  outdoor: [
    { id:"domtoren", name:"Domtoren", icon:"🗼", cat:"outdoor", tags:["Uitzicht","Gids inbegrepen"], desc:"Beklim 465 treden voor het mooiste uitzicht over Utrecht.", rating:4.5, reviews:9123, baseprice:14, vatRate:VAT_LOW, bookable:true, api:"ticketmaster", apiLabel:"Ticketmaster", groupFriendly:true, slots:["10:00","10:30","11:00","14:00","14:30"], fullSlots:["10:30"] },
    { id:"dagjesuppen", name:"DagjeSuppen.nl", icon:"🏄", cat:"outdoor", tags:["SUP","FareHarbor","Groepen"], desc:"Stand-up paddleboarding door de Utrechtse grachten — via FareHarbor direct te boeken.", rating:4.9, reviews:380, baseprice:22, vatRate:VAT_LOW, bookable:true, api:"fareharbor", apiLabel:"FareHarbor", groupFriendly:true, slots:["09:30","10:00","11:00","14:00","16:00"], fullSlots:[] },
    { id:"kasteel", name:"Kasteel de Haar", icon:"🏰", cat:"outdoor", tags:["Viator","Sprookjes"], desc:"Sprookjeskasteel met tuinen en hertenkamp.", rating:4.7, reviews:23557, baseprice:18, vatRate:VAT_LOW, bookable:true, api:"viator", apiLabel:"Viator", groupFriendly:true, slots:["10:00","11:00","13:00"], fullSlots:[] },
    { id:"kayak", name:"Kayak Utrecht", icon:"🚣", cat:"outdoor", tags:["Kayak","4.9★"], desc:"Beste kayakverhuur van de stad — diverse routes.", rating:4.9, reviews:280, baseprice:17, vatRate:VAT_LOW, bookable:true, api:"direct", apiLabel:"Direct API", groupFriendly:true, slots:["10:00","12:00","14:00","16:00"], fullSlots:[] },
  ],
};

const ALL_PROVIDERS = [...PROVIDERS.indoor, ...PROVIDERS.outdoor];

// Chip colors per API
const CHIP_STYLE = {
  "Ticketmaster": "bg-purple-100 text-purple-800",
  "Viator": "bg-blue-100 text-blue-800",
  "GetYourGuide": "bg-orange-100 text-orange-700",
  "FareHarbor": "bg-yellow-100 text-yellow-800",
  "Booking.com": "bg-blue-100 text-blue-800",
  "Direct API": "bg-green-100 text-green-800",
  null: "bg-gray-100 text-gray-500",
};

/* ══════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════ */
export default function UtrechtNow() {
  const [activeTab, setActiveTab] = useState("indoor");
  const [filterGroup, setFilterGroup] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [lang, setLang] = useState("nl");

  const LANGS = { nl:"NL 🇳🇱", en:"EN 🇬🇧", de:"DE 🇩🇪", fr:"FR 🇫🇷", es:"ES 🇪🇸" };

  const displayProviders = ALL_PROVIDERS
    .filter(p => activeTab === "all" || p.cat === activeTab)
    .filter(p => !filterGroup || p.groupFriendly);

  return (
    <div style={{fontFamily:"'Inter',sans-serif",background:"#F7F3EC",minHeight:"100vh",color:"#1A1612"}}>
      {/* LANG BAR */}
      <div style={{background:"#1E3A4A",padding:"5px 24px",display:"flex",justifyContent:"flex-end",gap:12,fontSize:11}}>
        {Object.entries(LANGS).map(([k,v]) => (
          <button key={k} onClick={()=>setLang(k)} style={{background:"none",border:"none",cursor:"pointer",color:lang===k?"#E8956A":"rgba(247,243,236,.55)",fontWeight:700,fontSize:11}}>{v}</button>
        ))}
        <span style={{color:"rgba(255,255,255,.15)"}}>|</span>
        <button onClick={()=>{ setSelectedProvider({id:"__group__",name:"Groep / Touroperator"}); setBookingOpen(true); }} style={{background:"none",border:"none",cursor:"pointer",color:"#E8956A",fontWeight:700,fontSize:11}}>👥 Groepen &amp; Touroperators</button>
      </div>

      {/* NAV */}
      <nav style={{background:"rgba(30,58,74,.97)",backdropFilter:"blur(10px)",position:"sticky",top:0,zIndex:100,borderBottom:"1px solid rgba(255,255,255,.07)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",gap:12,padding:"12px 24px"}}>
          <span style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:900,color:"#F7F3EC"}}>Utrecht<span style={{color:"#C8753A"}}>Now</span><sup style={{fontSize:9,color:"#E8956A",fontFamily:"Inter,sans-serif"}}>NL</sup></span>
          <div style={{flex:1,display:"flex",gap:2}}>
            {["indoor","outdoor","hotels","restaurants","events","groepen"].map(t => (
              <button key={t} onClick={()=>setActiveTab(t)} style={{background:"none",border:"none",cursor:"pointer",padding:"7px 11px",borderRadius:6,fontSize:13,fontWeight:600,color:activeTab===t?"#F7F3EC":"rgba(247,243,236,.6)",background:activeTab===t?"rgba(255,255,255,.1)":"none"}}>
                {{indoor:"🏠 Indoor",outdoor:"☀️ Buiten",hotels:"🏨 Hotels",restaurants:"🍽️ Eten",events:"🎵 Events",groepen:"👥 Groepen"}[t]}
              </button>
            ))}
          </div>
          <button onClick={()=>{ setSelectedProvider({id:"__group__",name:"Groepsaanvraag"}); setBookingOpen(true); }} style={{background:"rgba(200,117,58,.2)",border:"1px solid rgba(200,117,58,.35)",color:"#E8956A",borderRadius:6,padding:"7px 13px",fontSize:12,fontWeight:700,cursor:"pointer"}}>👥 Groepen & Bedrijven</button>
          <button style={{background:"#C8753A",color:"#fff",border:"none",borderRadius:6,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Plan mijn dag ✦</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{background:"linear-gradient(155deg,rgba(30,58,74,.92),rgba(30,58,74,.7),rgba(200,117,58,.2)),url('https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=1600&q=80') center/cover",minHeight:"42vh",display:"flex",alignItems:"center",padding:"60px 24px 48px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",width:"100%"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(200,117,58,.18)",border:"1px solid rgba(200,117,58,.35)",borderRadius:18,padding:"4px 13px",marginBottom:16}}>
            <span style={{width:6,height:6,background:"#E8956A",borderRadius:"50%",animation:"pulse 2s ease-in-out infinite"}}></span>
            <span style={{fontSize:10,fontWeight:800,color:"#E8956A",letterSpacing:"1.5px",textTransform:"uppercase"}}>Dé nieuwe VVV van Utrecht</span>
          </div>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(40px,5vw,72px)",fontWeight:900,lineHeight:.97,color:"#fff",marginBottom:18}}>Ontdek Utrecht.<br/><em style={{color:"#E8956A",fontStyle:"italic"}}>Boek alles hier.</em></h1>
          <p style={{fontSize:16,color:"rgba(255,255,255,.75)",lineHeight:1.65,maxWidth:500,marginBottom:28}}>180+ aanbieders. Groepen welkom. Betalen via iDEAL — factuur via WeFact. In 5 talen.</p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:32}}>
            <button onClick={()=>setActiveTab("indoor")} style={{background:"#C8753A",color:"#fff",border:"none",borderRadius:10,padding:"13px 24px",fontSize:15,fontWeight:700,cursor:"pointer"}}>🏠 Indoor activiteiten (winter)</button>
            <button onClick={()=>{ setSelectedProvider({id:"__group__",name:"Groepsaanvraag"}); setBookingOpen(true); }} style={{background:"rgba(255,255,255,.1)",color:"#fff",border:"1px solid rgba(255,255,255,.2)",borderRadius:10,padding:"13px 24px",fontSize:15,fontWeight:600,cursor:"pointer"}}>👥 Groep plannen</button>
          </div>
          <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
            {[["180+","Aanbieders"],["8","Boekingsplatformen"],["5","Talen"],["10%","Uw marge* (intern)"]].map(([n,l],i) => (
              <div key={i} style={{textAlign:"center"}}>
                <div style={{fontFamily:"Georgia,serif",fontSize:28,fontWeight:900,color:"#E8956A"}}>{n}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".5px",marginTop:2}}>{l}{l.includes("marge")?" ":""}  </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:8,fontSize:10,color:"rgba(255,255,255,.25)"}}>* 10% servicekosten worden verwerkt in de getoonde prijzen. Niet zichtbaar voor klanten.</div>
        </div>
      </div>

      {/* BOOKING POLICY BANNER */}
      <div style={{background:"#1E3A4A",padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
          <span style={{fontSize:12,color:"rgba(247,243,236,.7)"}}>✅ <strong style={{color:"#E8956A"}}>Alleen online betalen</strong> — geen "op aanvraag"</span>
          <span style={{fontSize:12,color:"rgba(247,243,236,.7)"}}>📄 <strong style={{color:"#E8956A"}}>WeFact factuur</strong> — voor bedrijven &amp; groepen</span>
          <span style={{fontSize:12,color:"rgba(247,243,236,.7)"}}>💳 <strong style={{color:"#E8956A"}}>iDEAL · Creditcard · Apple Pay</strong></span>
          <span style={{fontSize:12,color:"rgba(247,243,236,.7)"}}>🏦 <strong style={{color:"#E8956A"}}>SEPA overboeking</strong> — voor groepen €500+</span>
        </div>
        <a href="tel:+31302000000" style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:900,color:"#fff",textDecoration:"none"}}>📞 +31 (0)30 200 0000</a>
      </div>

      {/* CAT NAV + FILTERS */}
      <div style={{background:"#fff",borderBottom:"1px solid #E8E2D8",position:"sticky",top:57,zIndex:90,boxShadow:"0 2px 8px rgba(30,58,74,.06)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",gap:8,overflowX:"auto",whiteSpace:"nowrap"}}>
          {[["all","Alles"],["indoor","🏠 Indoor (winter)"],["outdoor","☀️ Buiten"],["series","📚 Workshop-reeksen"]].map(([k,l]) => (
            <button key={k} onClick={()=>setActiveTab(k)} style={{border:"none",background:"none",padding:"13px 16px",fontSize:13,fontWeight:600,color:activeTab===k?"#1E3A4A":"#6B7A85",borderBottom:activeTab===k?"3px solid #C8753A":"3px solid transparent",cursor:"pointer",whiteSpace:"nowrap"}}>
              {l}
            </button>
          ))}
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8,padding:"8px 0"}}>
            <label style={{fontSize:12,fontWeight:600,color:"#6B7A85",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
              <input type="checkbox" checked={filterGroup} onChange={e=>setFilterGroup(e.target.checked)} style={{accentColor:"#6A1B9A"}}/>
              <span>👥 Groepsvriendelijk</span>
            </label>
          </div>
        </div>
      </div>

      {/* INDOOR SPOTLIGHT */}
      {(activeTab === "indoor" || activeTab === "all") && (
        <div style={{background:"linear-gradient(135deg,#1E3A4A,#2C526A)",padding:"48px 0"}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:28}}>
              <div>
                <div style={{fontSize:10,fontWeight:800,letterSpacing:"3px",color:"#C8753A",textTransform:"uppercase",marginBottom:6}}>Perfecte winteractiviteiten</div>
                <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(24px,3vw,38px)",fontWeight:900,color:"#fff",marginBottom:8}}>Indoor Utrecht — altijd leuk, ook in de regen</h2>
                <p style={{fontSize:14,color:"rgba(247,243,236,.65)",maxWidth:540,lineHeight:1.65}}>Shuffleboard, pétanque, ping pong, keramiek, bierbrouwen, het kunst-doolhof — voor individuen én groepen. Alles online betaalbaar. Tips voor niet-boekbare plekken.</p>
              </div>
              <button onClick={()=>setActiveTab("series")} style={{background:"rgba(200,117,58,.2)",border:"1px solid rgba(200,117,58,.35)",color:"#E8956A",borderRadius:8,padding:"9px 16px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>📚 Workshop-reeksen →</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:18}}>
              {PROVIDERS.indoor.map(p => <ProviderCard key={p.id} p={p} onBook={pr=>{ setSelectedProvider(pr); setBookingOpen(true); }}/>)}
            </div>
          </div>
        </div>
      )}

      {/* ALL / OUTDOOR */}
      {(activeTab === "outdoor" || activeTab === "all") && (
        <div style={{padding:"48px 0"}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
            <div style={{fontSize:10,fontWeight:800,letterSpacing:"3px",color:"#C8753A",textTransform:"uppercase",marginBottom:6}}>Buiten in Utrecht</div>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(24px,3vw,38px)",fontWeight:900,color:"#1E3A4A",marginBottom:28}}>Activiteiten — lente t/m herfst</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:18}}>
              {PROVIDERS.outdoor.map(p => <ProviderCard key={p.id} p={p} onBook={pr=>{ setSelectedProvider(pr); setBookingOpen(true); }}/>)}
            </div>
          </div>
        </div>
      )}

      {/* WORKSHOP SERIES */}
      {activeTab === "series" && (
        <div style={{padding:"48px 0"}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
            <div style={{fontSize:10,fontWeight:800,letterSpacing:"3px",color:"#C8753A",textTransform:"uppercase",marginBottom:6}}>Leer iets nieuws</div>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(24px,3vw,38px)",fontWeight:900,color:"#1E3A4A",marginBottom:8}}>Workshop-reeksen — meerdere sessies</h2>
            <p style={{fontSize:14,color:"#6B7A85",maxWidth:540,lineHeight:1.65,marginBottom:28}}>Van keramiek tot bierbrouwen — leer een vak in een serie van 3–6 sessies. Inclusief materialen. Online betaalbaar als pakket, factuur via WeFact beschikbaar.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:18}}>
              {PROVIDERS.indoor.filter(p=>p.tags.some(t=>t.includes("Series")||t.includes("serie")||t.includes("lessen")||t.includes("sessies"))).map(p => <ProviderCard key={p.id} p={p} onBook={pr=>{ setSelectedProvider(pr); setBookingOpen(true); }}/>)}
            </div>
          </div>
        </div>
      )}

      {/* GROUPS SECTION */}
      <div style={{background:"#1E3A4A",padding:"56px 0"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          <div style={{fontSize:10,fontWeight:800,letterSpacing:"3px",color:"#C8753A",textTransform:"uppercase",marginBottom:6}}>Van 10 tot 500 personen</div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(24px,3vw,38px)",fontWeight:900,color:"#fff",marginBottom:8}}>Groepen &amp; Touroperators</h2>
          <p style={{fontSize:14,color:"rgba(247,243,236,.65)",maxWidth:560,lineHeight:1.65,marginBottom:32}}>Compleet geregeld — activiteiten, diner, transport, overnachting. Online betaalbaar. Automatisch factuur via WeFact met BTW-splitsing.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:18}}>
            {[
              {ico:"🏢",t:"Bedrijfsuitje",d:"Teambuilding + activiteit + diner. BTW-factuur op bedrijfsnaam.",p:"v.a. €49 p.p. · 10–500 pers."},
              {ico:"🎓",t:"Schoolreis",d:"Educatieve routes langs Domtoren, DOMunder, musea. Inclusief gids.",p:"v.a. €18 p.p. · 10–200 leerl."},
              {ico:"💍",t:"Vrijgezellendag",d:"SUP, shuffleboard, wijn, escape room — volledig op maat.",p:"v.a. €35 p.p. · 6–30 pers."},
              {ico:"🌍",t:"Touroperators & DMC",d:"Nettoprijzen (na marge), API-koppeling, white-label. Dedicated AM.",p:"Nettoprijzen op aanvraag"},
              {ico:"📊",t:"MICE & Congressen",d:"Pre/post-congressprogramma, galادinner, teambuilding.",p:"Maatwerk offerte"},
              {ico:"🎒",t:"Schoolreis (winter)",d:"Indoor routes: Doloris Maze, Ping Pong, keramiek, Speelklok.",p:"v.a. €22 p.p. · winterpakket"},
            ].map((g,i) => (
              <div key={i} onClick={()=>{ setSelectedProvider({id:"__group__",name:g.t}); setBookingOpen(true); }} style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",borderRadius:13,padding:22,cursor:"pointer",transition:"all .2s"}} onMouseOver={e=>{e.currentTarget.style.background="rgba(255,255,255,.12)"}} onMouseOut={e=>{e.currentTarget.style.background="rgba(255,255,255,.07)"}}>
                <div style={{fontSize:28,marginBottom:9}}>{g.ico}</div>
                <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:5}}>{g.t}</div>
                <div style={{fontSize:12,color:"rgba(247,243,236,.58)",lineHeight:1.6,marginBottom:9}}>{g.d}</div>
                <div style={{fontSize:12,fontWeight:700,color:"#E8956A"}}>{g.p}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PAYMENT INFO */}
      <div style={{padding:"48px 0",background:"#fff"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:36}}>
            <div>
              <div style={{fontSize:10,fontWeight:800,letterSpacing:"3px",color:"#C8753A",textTransform:"uppercase",marginBottom:6}}>Betalen</div>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(22px,3vw,36px)",fontWeight:900,color:"#1E3A4A",marginBottom:12}}>Altijd online betalen</h2>
              <p style={{fontSize:14,color:"#6B7A85",lineHeight:1.7,marginBottom:18}}>"Op aanvraag" bestaat niet bij UtrechtNow. Iedere boeking wordt direct online afgerekend. Geen betaling = geen reservering.</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {["🏦 iDEAL","💳 Visa/MC","💳 Amex","🍎 Apple Pay","🤖 Google Pay","🅿️ PayPal","📄 Factuur (WeFact)","🏢 SEPA (groepen €500+)","🎟️ Cadeaubon UtrechtNow"].map(m => (
                  <span key={m} style={{background:"#F7F3EC",border:"1.5px solid #E8E2D8",borderRadius:7,padding:"6px 11px",fontSize:11,fontWeight:700,color:"#1E3A4A"}}>{m}</span>
                ))}
              </div>
            </div>
            <div style={{background:"#1E3A4A",borderRadius:14,padding:24,color:"#fff"}}>
              <h3 style={{fontFamily:"Georgia,serif",fontSize:20,marginBottom:8}}>🔗 WeFact Koppeling</h3>
              <p style={{fontSize:12,color:"rgba(247,243,236,.65)",lineHeight:1.65,marginBottom:14}}>Na elke groepsboeking of B2B-bestelling maakt UtrechtNow automatisch een factuur aan in WeFact — inclusief BTW-splitsing, projectcode en bedrijfsgegevens.</p>
              {["Automatische factuurcreatie na betaling","BTW 9% en 21% correct gesplitst per post","Debiteurenbeheer en automatische herinneringen","Export naar Exact, Twinfield, Snelstart","Nettofacturen voor touroperators (minus marge)","Cadeaubonnen als apart factuurproduct","Groepskorting automatisch berekend"].map(f => (
                <div key={f} style={{display:"flex",alignItems:"center",gap:7,fontSize:11,color:"rgba(247,243,236,.78)",marginBottom:5}}>
                  <span style={{color:"#E8956A",fontWeight:900}}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {bookingOpen && selectedProvider && (
        <BookingModal
          provider={selectedProvider === null ? null : ALL_PROVIDERS.find(p=>p.id===selectedProvider.id) || selectedProvider}
          onClose={()=>{ setBookingOpen(false); setSelectedProvider(null); }}
        />
      )}

      {/* CHATBOT */}
      <div id="chat-bubble" style={{position:"fixed",bottom:22,right:22,zIndex:600}}>
        <div style={{position:"absolute",bottom:"100%",right:0,background:"#1E3A4A",color:"#fff",fontSize:11,fontWeight:700,padding:"5px 11px",borderRadius:7,whiteSpace:"nowrap",marginBottom:7,opacity:0,transition:"opacity .2s",pointerEvents:"none"}} className="chat-label">Chat met Utrecht Expert AI 🤖</div>
        <div onClick={()=>setChatOpen(o=>!o)} style={{width:56,height:56,background:"#C8753A",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:"0 6px 18px rgba(200,117,58,.45)",border:"3px solid #fff",cursor:"pointer"}}>💬</div>
        <div style={{position:"absolute",top:2,right:2,width:13,height:13,background:"#2D7A4F",borderRadius:"50%",border:"2px solid #fff"}}></div>
      </div>
      {chatOpen && <ChatBox onClose={()=>setChatOpen(false)}/>}

      {/* FOOTER */}
      <footer style={{background:"#1A1612",padding:"48px 24px 24px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:36,marginBottom:24}}>
          <div>
            <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:900,color:"#F7F3EC",marginBottom:8}}>Utrecht<span style={{color:"#C8753A"}}>Now</span></div>
            <div style={{fontSize:12,color:"rgba(247,243,236,.45)",lineHeight:1.65,marginBottom:14,maxWidth:260}}>Dé digitale VVV van Utrecht. 180+ aanbieders, 8 boekingsplatformen, 5 talen, voor individuen én groepen. Altijd online betalen.</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {[["Viator","#E8F4FD","#1565C0"],["GetYourGuide","#FFF3E0","#E65100"],["Ticketmaster","#F3E5F5","#6A1B9A"],["FareHarbor","#FFF8E1","#F57F17"],["Booking.com","#E3F2FD","#1565C0"],["WeFact","#E8F5E9","#2D7A4F"],["TheFork","#E8F5E9","#2D7A4F"]].map(([l,bg,c]) => (
                <span key={l} style={{fontSize:8,fontWeight:900,padding:"2px 6px",borderRadius:3,textTransform:"uppercase",background:bg,color:c}}>{l}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:10,fontWeight:900,textTransform:"uppercase",letterSpacing:1,color:"rgba(247,243,236,.28)",marginBottom:12}}>Indoor activiteiten</div>
            {["Ping Pong Club","JEU de Boules Bar","The Grand Shuffle","Mooie Boules","Doloris Maze","Workshop-reeksen"].map(l => <div key={l} style={{fontSize:12,color:"rgba(247,243,236,.45)",marginBottom:6,cursor:"pointer"}}>{l}</div>)}
          </div>
          <div>
            <div style={{fontSize:10,fontWeight:900,textTransform:"uppercase",letterSpacing:1,color:"rgba(247,243,236,.28)",marginBottom:12}}>Groepen</div>
            {["Bedrijfsuitjes","Schoolreizen","Vrijgezellendag","Touroperators","MICE & Congres","Winterpakketten"].map(l => <div key={l} style={{fontSize:12,color:"rgba(247,243,236,.45)",marginBottom:6,cursor:"pointer"}}>{l}</div>)}
          </div>
          <div>
            <div style={{fontSize:10,fontWeight:900,textTransform:"uppercase",letterSpacing:1,color:"rgba(247,243,236,.28)",marginBottom:12}}>Info</div>
            {["Over UtrechtNow","FAQ","Blog","Contacteer ons","Leverancier worden?","Partnerportal"].map(l => <div key={l} style={{fontSize:12,color:"rgba(247,243,236,.45)",marginBottom:6,cursor:"pointer"}}>{l}</div>)}
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:18,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <span style={{fontSize:11,color:"rgba(247,243,236,.25)"}}>© 2026 UtrechtNow · KvK 12345678 · Prijzen incl. 10% servicekosten (niet apart zichtbaar)</span>
          <span style={{fontSize:11,color:"rgba(247,243,236,.25)"}}>Prototype — alle boekingen zijn illustratief</span>
        </div>
      </footer>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PROVIDER CARD
══════════════════════════════════════════════════════ */
function ProviderCard({ p, onBook }) {
  const displayPrice = p.bookable && p.baseprice ? applyMargin(p.baseprice) : null;
  const isTipOnly = !p.bookable;

  return (
    <div style={{background:"#fff",borderRadius:13,padding:18,border:"2px solid transparent",transition:"all .2s",cursor:"pointer",position:"relative",overflow:"hidden",boxShadow:"0 3px 12px rgba(30,58,74,.07)"}}
      onClick={()=>onBook(p)}
      onMouseOver={e=>{e.currentTarget.style.borderColor="#1E3A4A";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(30,58,74,.13)"}}
      onMouseOut={e=>{e.currentTarget.style.borderColor="transparent";e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 3px 12px rgba(30,58,74,.07)"}}
    >
      {/* TIP ONLY BADGE */}
      {isTipOnly && (
        <div style={{position:"absolute",top:0,right:0,background:"#6B7A85",color:"#fff",fontSize:8,fontWeight:900,padding:"4px 10px 4px 14px",clipPath:"polygon(8px 0,100% 0,100% 100%,0 100%)",textTransform:"uppercase",letterSpacing:".5px",zIndex:1}}>TIP</div>
      )}
      {p.groupFriendly && !isTipOnly && (
        <div style={{position:"absolute",top:0,right:0,background:"#6A1B9A",color:"#fff",fontSize:8,fontWeight:900,padding:"4px 10px 4px 14px",clipPath:"polygon(8px 0,100% 0,100% 100%,0 100%)",textTransform:"uppercase",letterSpacing:".5px",zIndex:1}}>GROEPEN</div>
      )}

      <div style={{display:"flex",alignItems:"flex-start",gap:11,marginBottom:8}}>
        <div style={{width:42,height:42,borderRadius:9,background:"#1E3A4A",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{p.icon}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:14,fontWeight:700,color:"#1E3A4A",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div>
          <div style={{fontSize:9,fontWeight:700,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>{p.cat === "indoor" ? "🏠 Indoor" : p.cat === "outdoor" ? "☀️ Buiten" : "📚 Reeks"}</div>
        </div>
        <div style={{fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>
          <span style={{color:"#F59E0B"}}>★</span> {p.rating} <span style={{color:"#6B7A85",fontSize:10}}>({p.reviews?.toLocaleString()})</span>
        </div>
      </div>

      <div style={{fontSize:12,color:"#6B7A85",lineHeight:1.5,marginBottom:9,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.desc}</div>

      {/* TAGS */}
      <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:9}}>
        {p.tags?.slice(0,3).map(t => (
          <span key={t} style={{fontSize:9,background:"#F2EDE6",color:"#2C526A",borderRadius:3,padding:"2px 5px",fontWeight:600}}>{t}</span>
        ))}
      </div>

      {/* TIP ONLY INFO */}
      {isTipOnly && (
        <div style={{background:"#F2EDE6",border:"1px solid #E8E2D8",borderRadius:7,padding:"9px 11px",marginBottom:9,fontSize:11}}>
          <div style={{fontWeight:700,color:"#6B7A85",marginBottom:3}}>💡 Tip — niet online boekbaar</div>
          <div style={{color:"#6B7A85",lineHeight:1.55}}>{p.tipText}</div>
          {p.externalUrl && <a href={p.externalUrl} target="_blank" rel="noopener" style={{color:"#C8753A",fontSize:10,fontWeight:700,textDecoration:"none"}} onClick={e=>e.stopPropagation()}>Bekijk op kaart →</a>}
        </div>
      )}

      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{fontSize:11,color:"#6B7A85"}}>
          {displayPrice ? <>v.a. <strong style={{fontSize:15,color:"#1A1612"}}>€{displayPrice}</strong> p.p.</> : isTipOnly ? <em style={{color:"#6B7A85"}}>Gratis tip</em> : <strong>Gratis</strong>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          {p.apiLabel && (
            <span style={{fontSize:8,fontWeight:900,letterSpacing:".3px",textTransform:"uppercase",padding:"2px 5px",borderRadius:3,
              ...(p.apiLabel==="Ticketmaster"?{background:"#F3E5F5",color:"#6A1B9A"}:
                 p.apiLabel==="Viator"?{background:"#E8F4FD",color:"#1565C0"}:
                 p.apiLabel==="FareHarbor"?{background:"#FFF8E1",color:"#F57F17"}:
                 p.apiLabel==="GetYourGuide"?{background:"#FFF3E0",color:"#E65100"}:
                 {background:"#E8F5E9",color:"#2D7A4F"})
            }}>{p.apiLabel}</span>
          )}
          {!isTipOnly && (
            <button style={{background:"#C8753A",color:"#fff",border:"none",borderRadius:6,padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>
              {p.baseprice ? "Boek" : "Reserveer"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   BOOKING MODAL — full flow with margin + WeFact
══════════════════════════════════════════════════════ */
function BookingModal({ provider, onClose }) {
  const [step, setStep] = useState(0); // 0=date, 1=slots, 2=details, 3=payment, 4=success
  const [date, setDate] = useState("");
  const [time, setTime] = useState(null);
  const [tickets, setTickets] = useState(2);
  const [wantInvoice, setWantInvoice] = useState(false);
  const [payMethod, setPayMethod] = useState(null);
  const [form, setForm] = useState({ name:"", email:"", phone:"", company:"", vat:"", project:"", notes:"", lang:"nl" });
  const isGroup = provider?.id === "__group__";
  const isBookable = provider?.bookable !== false && !isGroup;

  const displayPrice = provider?.baseprice ? applyMargin(provider.baseprice) : 0;
  const subtotal = displayPrice * tickets;
  const vatAmount = subtotal ? calcVat(subtotal, provider?.vatRate || VAT_LOW) : 0;
  const total = subtotal;
  const groupDiscount = tickets >= 10 ? +(subtotal * 0.05).toFixed(2) : 0; // 5% groepskorting zichtbaar, margin blijft verborgen
  const finalTotal = +(total - groupDiscount).toFixed(2);

  // Internal margin tracking (never shown to customer)
  const internalNet = provider?.baseprice ? provider.baseprice * tickets : 0;
  const internalMargin = +(finalTotal - internalNet - calcVat(finalTotal, provider?.vatRate||VAT_LOW)).toFixed(2);

  const today = new Date().toISOString().split("T")[0];
  const bookingRef = `UN-${Math.random().toString(36).toUpperCase().slice(2,8)}`;

  if (!provider) return null;

  const steps = isGroup
    ? ["Aanvraag","Gegevens","Betaling","Bevestiging"]
    : ["Datum","Tijdslot","Gegevens","Betaling","Bevestiging"];

  return (
    <div style={{position:"fixed",inset:0,zIndex:700,background:"rgba(26,22,18,.65)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div style={{background:"#fff",borderRadius:20,width:"100%",maxWidth:640,maxHeight:"92vh",overflowY:"auto",padding:32,position:"relative",boxShadow:"0 32px 80px rgba(30,58,74,.22)"}}>
        <button onClick={onClose} style={{position:"absolute",top:16,right:16,width:32,height:32,borderRadius:"50%",background:"#E8E2D8",border:"none",fontSize:17,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>

        <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:900,color:"#1E3A4A",marginBottom:3}}>
          {provider.icon || (isGroup ? "👥" : "📍")} {provider.name}
        </div>
        <div style={{fontSize:12,color:"#6B7A85",marginBottom:20}}>
          {isGroup ? "Groepsaanvraag — offerte + WeFact factuur" : provider.desc?.substring(0,80)+"…"}
        </div>

        {/* STEPS */}
        <div style={{display:"flex",borderBottom:"2px solid #E8E2D8",marginBottom:24}}>
          {steps.map((s,i) => (
            <div key={s} style={{flex:1,textAlign:"center",padding:"9px 4px",fontSize:9,fontWeight:900,textTransform:"uppercase",letterSpacing:".4px",color:step===i?"#1E3A4A":step>i?"#2D7A4F":"#6B7A85",borderBottom:step===i?"2px solid #C8753A":step>i?"2px solid #2D7A4F":"2px solid transparent",marginBottom:-2}}>
              {step>i?"✓ ":""}{s}
            </div>
          ))}
        </div>

        {/* GROUP FORM */}
        {isGroup && step === 0 && <GroupRequestForm form={form} setForm={setForm} onNext={()=>setStep(1)}/>}
        {isGroup && step === 1 && <GroupDetailsForm form={form} setForm={setForm} wantInvoice={wantInvoice} setWantInvoice={setWantInvoice} onBack={()=>setStep(0)} onNext={()=>setStep(2)}/>}
        {isGroup && step === 2 && (
          <GroupPayment wantInvoice={wantInvoice} onBack={()=>setStep(1)} onPay={m=>{ setPayMethod(m); setStep(3); }}/>
        )}
        {isGroup && step === 3 && <SuccessScreen ref={bookingRef} isGroup={true} wantInvoice={wantInvoice} onClose={onClose}/>}

        {/* INDIVIDUAL FLOW */}
        {!isGroup && step === 0 && (
          <div>
            <div style={{fontSize:11,fontWeight:700,marginBottom:5,color:"#1A1612"}}>Bezoekdatum</div>
            <input type="date" value={date} min={today} onChange={e=>setDate(e.target.value)} style={{border:"2px solid #E8E2D8",borderRadius:8,padding:"10px 14px",fontSize:14,fontFamily:"Inter,sans-serif",outline:"none",width:"100%",marginBottom:14,background:"#F7F3EC"}}/>
            {provider.groupFriendly && (
              <div style={{background:"rgba(106,27,154,.06)",border:"1px solid rgba(106,27,154,.18)",borderRadius:8,padding:"10px 13px",fontSize:11,color:"#6A1B9A",marginBottom:14}}>
                👥 <strong>Groepsvriendelijk</strong> — Kies 10+ tickets voor groepskorting (5%) + WeFact-factuur optie.
              </div>
            )}
            <div style={{fontSize:11,color:"#6B7A85",marginBottom:14}}>
              Beschikbaarheid via <strong>{provider.apiLabel}</strong>
              {provider.api === "fareharbor" && " (FareHarbor real-time)"}
              {provider.api === "ticketmaster" && " (Ticketmaster Discovery API)"}
              {provider.api === "viator" && " (Viator Experiences API)"}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:18}}>
              <button onClick={onClose} style={{background:"#E8E2D8",color:"#1A1612",border:"none",borderRadius:7,padding:"9px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Annuleren</button>
              <button onClick={()=>setStep(1)} style={{background:"#1E3A4A",color:"#fff",border:"none",borderRadius:7,padding:"9px 22px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Volgende →</button>
            </div>
          </div>
        )}

        {!isGroup && step === 1 && (
          <div>
            <div style={{border:"2px solid #E8E2D8",borderRadius:12,padding:16}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:11,marginBottom:10}}>
                <div style={{width:38,height:38,borderRadius:8,background:"#1E3A4A",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{provider.icon}</div>
                <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:"#1E3A4A"}}>{provider.name}</div><div style={{fontSize:10,color:"#6B7A85"}}>{provider.apiLabel} · {date||"datum niet gekozen"}</div></div>
                <div style={{fontSize:13,fontWeight:700,color:"#C8753A"}}>€{displayPrice}/p.p.</div>
              </div>
              <div style={{fontSize:10,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".5px",marginBottom:7}}>Beschikbare tijden:</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
                {provider.slots?.map(s => (
                  <div key={s} onClick={()=>provider.fullSlots?.includes(s)?null:setTime(s)}
                    style={{border:`1.5px solid ${time===s?"#1E3A4A":provider.fullSlots?.includes(s)?"#E8E2D8":"#E8E2D8"}`,borderRadius:5,padding:"5px 11px",fontSize:11,fontWeight:700,cursor:provider.fullSlots?.includes(s)?"default":"pointer",background:time===s?"#1E3A4A":provider.fullSlots?.includes(s)?"#F2EDE6":"#fff",color:time===s?"#fff":provider.fullSlots?.includes(s)?"#aaa":"#1A1612",textDecoration:provider.fullSlots?.includes(s)?"line-through":"none",opacity:provider.fullSlots?.includes(s)?.4:1}}>
                    {s}{provider.fullSlots?.includes(s)?" vol":""}
                  </div>
                ))}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:9}}>
                <span style={{fontSize:12,fontWeight:700}}>Tickets:</span>
                <button onClick={()=>setTickets(t=>Math.max(1,t-1))} style={{width:26,height:26,borderRadius:"50%",border:"1.5px solid #1E3A4A",background:"#fff",color:"#1E3A4A",fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>−</button>
                <span style={{fontSize:15,fontWeight:700,minWidth:22,textAlign:"center",color:tickets>=10?"#6A1B9A":"inherit"}}>{tickets}</span>
                <button onClick={()=>setTickets(t=>Math.min(200,t+1))} style={{width:26,height:26,borderRadius:"50%",border:"1.5px solid #1E3A4A",background:"#fff",color:"#1E3A4A",fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>+</button>
                <span style={{fontSize:11,color:"#6B7A85",marginLeft:6}}>personen</span>
                {tickets >= 10 && <span style={{background:"rgba(106,27,154,.1)",color:"#6A1B9A",borderRadius:3,padding:"2px 6px",fontSize:9,fontWeight:800,textTransform:"uppercase"}}>👥 Groepsprijs</span>}
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:18}}>
              <button onClick={()=>setStep(0)} style={{background:"#E8E2D8",color:"#1A1612",border:"none",borderRadius:7,padding:"9px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>← Terug</button>
              <button onClick={()=>setStep(2)} style={{background:"#1E3A4A",color:"#fff",border:"none",borderRadius:7,padding:"9px 22px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Gegevens →</button>
            </div>
          </div>
        )}

        {!isGroup && step === 2 && (
          <div>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
              <div style={{display:"flex",gap:9}}>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
                  <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Voornaam</label>
                  <input value={form.name.split(" ")[0]||""} onChange={e=>setForm(f=>({...f,name:e.target.value+" "+(f.name.split(" ")[1]||"")}))} placeholder="Jan" style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
                </div>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
                  <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Achternaam</label>
                  <input placeholder="de Vries" style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:3}}>
                <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>E-mailadres</label>
                <input type="email" placeholder="jan@email.nl" style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
              </div>
              <div style={{display:"flex",gap:9}}>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
                  <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Telefoonnummer</label>
                  <input type="tel" placeholder="+31 6 …" style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
                </div>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
                  <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Taal tickets</label>
                  <select style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}>
                    <option>Nederlands</option><option>English</option><option>Deutsch</option><option>Français</option><option>Español</option>
                  </select>
                </div>
              </div>

              {/* WEFACT CHECKBOX */}
              <div style={{background:"#F7F3EC",border:"1.5px solid #E8E2D8",borderRadius:9,padding:"12px 14px"}}>
                <label style={{display:"flex",alignItems:"flex-start",gap:9,cursor:"pointer"}}>
                  <input type="checkbox" checked={wantInvoice} onChange={e=>setWantInvoice(e.target.checked)} style={{accentColor:"#2D7A4F",marginTop:2,width:16,height:16}}/>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:"#1E3A4A"}}>📄 Factuur ontvangen via WeFact</div>
                    <div style={{fontSize:11,color:"#6B7A85",lineHeight:1.55,marginTop:2}}>Vink aan voor een factuur op bedrijfsnaam met BTW-specificatie — geschikt voor BTW-aftrek.</div>
                  </div>
                </label>
                {wantInvoice && (
                  <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
                    <div style={{display:"flex",gap:9}}>
                      <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
                        <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Bedrijfsnaam</label>
                        <input placeholder="Bedrijf BV" style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
                      </div>
                      <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
                        <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>BTW-nummer</label>
                        <input placeholder="NL123456789B01" style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
                      </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:3}}>
                      <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Projectcode (optioneel)</label>
                      <input placeholder="PROJECT-2026" style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <button onClick={()=>setStep(1)} style={{background:"#E8E2D8",color:"#1A1612",border:"none",borderRadius:7,padding:"9px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>← Terug</button>
              <button onClick={()=>setStep(3)} style={{background:"#1E3A4A",color:"#fff",border:"none",borderRadius:7,padding:"9px 22px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Naar betaling →</button>
            </div>
          </div>
        )}

        {!isGroup && step === 3 && (
          <div>
            {/* PRICE SUMMARY — margin verborgen */}
            <table style={{width:"100%",borderCollapse:"collapse",marginBottom:14}}>
              <tbody>
                <tr><td style={{padding:"8px 0",fontSize:13,borderBottom:"1px solid #E8E2D8"}}>{provider.name}<br/><span style={{fontSize:10,color:"#6B7A85"}}>{time||"—"} · {tickets}× · {provider.apiLabel}</span></td><td style={{padding:"8px 0",fontSize:13,fontWeight:700,textAlign:"right",borderBottom:"1px solid #E8E2D8"}}>€{subtotal.toFixed(2)}</td></tr>
                {groupDiscount > 0 && <tr><td style={{padding:"8px 0",fontSize:12,color:"#2D7A4F",borderBottom:"1px solid #E8E2D8"}}>Groepskorting 5% (10+ pers.)</td><td style={{padding:"8px 0",fontSize:12,fontWeight:700,textAlign:"right",borderBottom:"1px solid #E8E2D8",color:"#2D7A4F"}}>−€{groupDiscount.toFixed(2)}</td></tr>}
                {wantInvoice && <tr><td style={{padding:"8px 0",fontSize:11,color:"#6B7A85",borderBottom:"1px solid #E8E2D8"}}>BTW {(provider.vatRate===VAT_HIGH?"21%":"9%")} (incl.)</td><td style={{padding:"8px 0",fontSize:11,textAlign:"right",borderBottom:"1px solid #E8E2D8",color:"#6B7A85"}}>€{calcVat(finalTotal,provider.vatRate||VAT_LOW).toFixed(2)}</td></tr>}
                <tr style={{fontWeight:900,color:"#1E3A4A"}}><td style={{paddingTop:12,fontSize:15}}>Totaal</td><td style={{paddingTop:12,fontSize:17,textAlign:"right"}}>€{finalTotal.toFixed(2)}</td></tr>
              </tbody>
            </table>

            {wantInvoice && (
              <div style={{background:"rgba(45,122,79,.07)",border:"1px solid rgba(45,122,79,.18)",borderRadius:8,padding:"10px 13px",fontSize:11,color:"#2D7A4F",marginBottom:14}}>
                📄 <strong>WeFact factuur</strong> wordt automatisch aangemaakt en verstuurd naar uw e-mailadres na betaling.
              </div>
            )}

            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
              {[["🏦 iDEAL","ideal"],["💳 Creditcard (Visa / Mastercard / Amex)","card"],["🍎 Apple Pay / Google Pay","wallet"],wantInvoice?["🏢 SEPA Overboeking (factuur vooraf)","sepa"]:null].filter(Boolean).map(([label,key]) => (
                <button key={key} onClick={()=>{ setPayMethod(key); setStep(4); }}
                  style={{background:key==="sepa"?"#E8E2D8":"#1E3A4A",color:key==="sepa"?"#1A1612":"#fff",border:"none",borderRadius:9,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                  {label} {key!=="sepa"?`— €${finalTotal.toFixed(2)}`:"— Betaling na ontvangst factuur"}
                </button>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"flex-start"}}>
              <button onClick={()=>setStep(2)} style={{background:"#E8E2D8",color:"#1A1612",border:"none",borderRadius:7,padding:"9px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>← Terug</button>
            </div>
          </div>
        )}

        {!isGroup && step === 4 && <SuccessScreen bookingRef={bookingRef} isGroup={false} wantInvoice={wantInvoice} provider={provider} tickets={tickets} total={finalTotal} time={time} onClose={onClose}/>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GROUP REQUEST FORM
══════════════════════════════════════════════════════ */
function GroupRequestForm({ form, setForm, onNext }) {
  return (
    <div>
      <div style={{background:"rgba(106,27,154,.06)",border:"1px solid rgba(106,27,154,.15)",borderRadius:9,padding:"12px 14px",fontSize:12,color:"#6A1B9A",marginBottom:18,lineHeight:1.65}}>
        👥 <strong>Groeps- of zakelijke boeking</strong> — Wij stellen een compleet programma samen. Na betaling of akkoord factuur ontvangt u automatisch een WeFact-factuur op bedrijfsnaam.
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
        <div style={{display:"flex",gap:9}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
            <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Contactpersoon</label>
            <input placeholder="Naam" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
            <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Organisatie</label>
            <input placeholder="Bedrijf / school" value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))} style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
          </div>
        </div>
        <div style={{display:"flex",gap:9}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
            <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>E-mailadres</label>
            <input type="email" placeholder="email@bedrijf.nl" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
            <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Telefoon</label>
            <input type="tel" placeholder="+31 6 …" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
          </div>
        </div>
        <div style={{display:"flex",gap:9}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
            <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Aantal personen</label>
            <input type="number" placeholder="bv. 30" min={2} max={500} style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
            <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Gewenste datum</label>
            <input type="date" style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:3}}>
          <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Type & wensen</label>
          <select style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none",marginBottom:7}}>
            <option>Bedrijfsuitje</option><option>Schoolreis</option><option>Vrijgezellendag</option><option>Verjaardag/Familie</option><option>Touroperator</option><option>MICE/Congres</option><option>Winterpakket</option>
          </select>
          <textarea placeholder="Beschrijf uw wensen: activiteiten, diner, overnachting, indoor/buiten, budget…" rows={3} style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:12,fontFamily:"Inter,sans-serif",outline:"none",resize:"none"}}/>
        </div>
        <div style={{display:"flex",gap:9}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
            <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Budget p.p.</label>
            <select style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}>
              <option>€20–40</option><option>€40–60</option><option>€60–100</option><option>€100–150</option><option>€150+</option><option>Op aanvraag</option>
            </select>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
            <label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Taal</label>
            <select style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}>
              <option>Nederlands</option><option>English</option><option>Deutsch</option><option>Français</option><option>Español</option>
            </select>
          </div>
        </div>
      </div>
      <button onClick={onNext} style={{width:"100%",background:"#1E3A4A",color:"#fff",border:"none",borderRadius:9,padding:13,fontSize:14,fontWeight:700,cursor:"pointer"}}>Verder naar betaalopties →</button>
    </div>
  );
}

function GroupDetailsForm({ form, setForm, wantInvoice, setWantInvoice, onBack, onNext }) {
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
        <div style={{background:"#F7F3EC",border:"1.5px solid #E8E2D8",borderRadius:9,padding:"12px 14px"}}>
          <label style={{display:"flex",alignItems:"flex-start",gap:9,cursor:"pointer"}}>
            <input type="checkbox" checked={wantInvoice} onChange={e=>setWantInvoice(e.target.checked)} style={{accentColor:"#2D7A4F",marginTop:2,width:16,height:16}}/>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:"#1E3A4A"}}>📄 Factuur ontvangen via WeFact</div>
              <div style={{fontSize:11,color:"#6B7A85",lineHeight:1.55,marginTop:2}}>Zakelijke factuur op bedrijfsnaam met BTW-splitsing — voor BTW-aftrek en boekhouding.</div>
            </div>
          </label>
          {wantInvoice && (
            <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
              <div style={{display:"flex",gap:9}}>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}><label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Bedrijfsnaam</label><input placeholder="Bedrijf BV" style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/></div>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}><label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>BTW-nummer</label><input placeholder="NL…B01" style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/></div>
              </div>
              <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}><label style={{fontSize:9,fontWeight:900,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Projectcode</label><input placeholder="PROJECT-2026" style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/></div>
            </div>
          )}
        </div>
        <div style={{background:"rgba(30,58,74,.04)",border:"1px solid #E8E2D8",borderRadius:9,padding:"12px 14px",fontSize:11,color:"#6B7A85",lineHeight:1.65}}>
          ⏱️ <strong style={{color:"#1E3A4A"}}>Wat gebeurt er na het indienen?</strong><br/>
          Wij sturen binnen 2 uur een offerte. Na akkoord volgt betaallink of SEPA-factuur via WeFact.
          Alle ingeboekte activiteiten worden tegelijkertijd bevestigd bij de leveranciers.
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <button onClick={onBack} style={{background:"#E8E2D8",color:"#1A1612",border:"none",borderRadius:7,padding:"9px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>← Terug</button>
        <button onClick={onNext} style={{background:"#1E3A4A",color:"#fff",border:"none",borderRadius:7,padding:"9px 22px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Betalingsoptie →</button>
      </div>
    </div>
  );
}

function GroupPayment({ wantInvoice, onBack, onPay }) {
  return (
    <div>
      <div style={{background:"#F7F3EC",borderRadius:10,padding:"14px 18px",marginBottom:18}}>
        <div style={{fontSize:12,fontWeight:700,color:"#1E3A4A",marginBottom:7}}>🔒 Betaalopties voor groepen</div>
        <div style={{fontSize:12,color:"#6B7A85",lineHeight:1.65}}>Na betaling of akkoord: wij boeken direct bij alle leveranciers en sturen alle ticketbevestigingen per e-mail.</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
        <button onClick={()=>onPay("ideal")} style={{background:"#1E3A4A",color:"#fff",border:"none",borderRadius:9,padding:13,fontSize:14,fontWeight:700,cursor:"pointer"}}>🏦 Betaal direct via iDEAL</button>
        <button onClick={()=>onPay("card")} style={{background:"#2C526A",color:"#fff",border:"none",borderRadius:9,padding:13,fontSize:14,fontWeight:700,cursor:"pointer"}}>💳 Creditcard (Visa / Mastercard)</button>
        <button onClick={()=>onPay("sepa")} style={{background:"#E8E2D8",color:"#1A1612",border:"none",borderRadius:9,padding:13,fontSize:14,fontWeight:700,cursor:"pointer"}}>🏢 Betaling na ontvangst WeFact-factuur (SEPA)</button>
        <button onClick={()=>onPay("offerte")} style={{background:"#E8E2D8",color:"#1A1612",border:"none",borderRadius:9,padding:13,fontSize:14,fontWeight:700,cursor:"pointer"}}>📋 Eerst offerte ontvangen, daarna betalen</button>
      </div>
      <div style={{display:"flex",justifyContent:"flex-start"}}><button onClick={onBack} style={{background:"#E8E2D8",color:"#1A1612",border:"none",borderRadius:7,padding:"9px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>← Terug</button></div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SUCCESS SCREEN
══════════════════════════════════════════════════════ */
function SuccessScreen({ bookingRef, isGroup, wantInvoice, provider, tickets, total, time, onClose }) {
  const ref = bookingRef || `${isGroup?"GRP":"UN"}-${Math.random().toString(36).toUpperCase().slice(2,8)}`;
  return (
    <div style={{textAlign:"center",padding:"14px 0"}}>
      <div style={{width:64,height:64,background:"#2D7A4F",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 16px"}}>{isGroup?"📋":"✓"}</div>
      <div style={{fontFamily:"Georgia,serif",fontSize:24,color:"#1E3A4A",marginBottom:7}}>{isGroup?"Aanvraag ontvangen!":"Boeking bevestigd! 🎉"}</div>
      <div style={{fontSize:12,color:"#6B7A85",lineHeight:1.7,maxWidth:380,margin:"0 auto 18px"}}>
        {isGroup ? "Wij nemen binnen 2 uur contact op met een volledige offerte en bevestiging van alle activiteiten." : `Uw boeking bij ${provider?.name} is bevestigd. Tickets worden verstuurd naar uw e-mailadres.`}
      </div>
      <div style={{background:"#F7F3EC",borderRadius:9,padding:"12px 20px",display:"inline-block",fontSize:11,color:"#6B7A85",marginBottom:14}}>
        Referentienummer<strong style={{color:"#1E3A4A",fontSize:16,fontFamily:"monospace",display:"block",marginTop:3}}>{ref}</strong>
      </div>
      {wantInvoice && (
        <div style={{background:"rgba(45,122,79,.07)",border:"1px solid rgba(45,122,79,.18)",borderRadius:8,padding:"10px 13px",fontSize:11,color:"#2D7A4F",marginBottom:14,maxWidth:420,margin:"0 auto 14px"}}>
          📄 <strong>WeFact factuur</strong> wordt automatisch aangemaakt en verstuurd per e-mail. BTW-specificatie bijgevoegd.
        </div>
      )}
      <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginTop:14}}>
        <button onClick={onClose} style={{background:"#1E3A4A",color:"#fff",border:"none",borderRadius:7,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Klaar</button>
        <button style={{background:"#E8E2D8",color:"#1A1612",border:"none",borderRadius:7,padding:"10px 20px",fontSize:13,fontWeight:600,cursor:"pointer"}}>📱 Voeg toe aan Wallet</button>
        {isGroup && <button style={{background:"#E8E2D8",color:"#1A1612",border:"none",borderRadius:7,padding:"10px 20px",fontSize:13,fontWeight:600,cursor:"pointer"}}>📥 Download offerte PDF</button>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   CHATBOT
══════════════════════════════════════════════════════ */
function ChatBox({ onClose }) {
  const [msgs, setMsgs] = useState([{ from:"bot", text:"Hallo! 👋 Ik ben de Utrecht Expert AI. Vraag me over activiteiten, groepen, WeFact-facturen of boekingen!" }]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); }, [msgs]);

  async function send() {
    const q = inp.trim(); if (!q) return;
    setMsgs(m=>[...m,{from:"user",text:q}]); setInp(""); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:350,
        system:`Je bent de AI-chatbot van UtrechtNow — dé digitale VVV van Utrecht. Je helpt met: activiteiten (Domtoren/Ticketmaster, DagjeSuppen/FareHarbor, Kasteel de Haar/Viator), binnenactiviteiten (The Ping Pong Club, JEU de Boules Bar, The Grand Shuffle, Mooie Boules, Doloris Anoma Maze, workshop-reeksen), groepsarrangementen, WeFact-facturen, betaalmethoden en tips. Altijd online betalen — geen op aanvraag. 10% servicekosten verwerkt in prijs (nooit vermelden). Max 3 zinnen. Taal van gebruiker.`,
        messages:[...msgs.filter(m=>m.from!="system").map(m=>({role:m.from==="user"?"user":"assistant",content:m.text})),{role:"user",content:q}]
      })});
      const d = await res.json();
      setMsgs(m=>[...m,{from:"bot",text:d.content?.[0]?.text||"Fout — probeer opnieuw."}]);
    } catch { setMsgs(m=>[...m,{from:"bot",text:"Even geduld — probeer opnieuw."}]); }
    setLoading(false);
  }

  const QUICKQ = ["🏠 Indoor activiteiten winter","👥 Groepsarrangement 30 pers","📄 WeFact factuur","🏄 DagjeSuppen boeken"];

  return (
    <div style={{position:"fixed",bottom:90,right:22,zIndex:600,width:340,background:"#fff",borderRadius:18,boxShadow:"0 24px 60px rgba(30,58,74,.22)",border:"1px solid #E8E2D8",overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <div style={{background:"#1E3A4A",padding:"13px 16px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:32,height:32,background:"#C8753A",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🏛️</div>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>Utrecht Expert AI</div><div style={{fontSize:10,color:"#E8956A"}}>🟢 Online — Direct antwoord</div></div>
        <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(247,243,236,.45)",fontSize:19,cursor:"pointer"}}>×</button>
      </div>
      <div style={{flex:1,padding:13,maxHeight:300,overflowY:"auto",display:"flex",flexDirection:"column",gap:8}}>
        {msgs.map((m,i) => (
          <div key={i} style={{maxWidth:"83%",fontSize:12,lineHeight:1.55,padding:"8px 12px",borderRadius:10,alignSelf:m.from==="user"?"flex-end":"flex-start",background:m.from==="user"?"#1E3A4A":"#F2EDE6",color:m.from==="user"?"#fff":"#1A1612",borderBottomRightRadius:m.from==="user"?3:10,borderBottomLeftRadius:m.from==="bot"?3:10}}>{m.text}</div>
        ))}
        {loading && <div style={{background:"#F2EDE6",padding:"8px 14px",borderRadius:10,borderBottomLeftRadius:3,alignSelf:"flex-start"}}><span style={{color:"#6B7A85",fontSize:12}}>…</span></div>}
        <div ref={endRef}/>
      </div>
      {msgs.length <= 2 && (
        <div style={{padding:"6px 10px",display:"flex",flexWrap:"wrap",gap:5,borderTop:"1px solid #E8E2D8"}}>
          {QUICKQ.map(q=><span key={q} onClick={()=>{setInp(q);setTimeout(()=>send(),50)}} style={{background:"#F2EDE6",border:"1px solid #E8E2D8",borderRadius:12,padding:"3px 9px",fontSize:10,fontWeight:600,color:"#1E3A4A",cursor:"pointer"}}>{q}</span>)}
        </div>
      )}
      <div style={{padding:"10px 12px",borderTop:"1px solid #E8E2D8",display:"flex",gap:7}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Stel een vraag…" style={{flex:1,border:"1.5px solid #E8E2D8",borderRadius:18,padding:"7px 12px",fontSize:12,fontFamily:"Inter,sans-serif",outline:"none"}}/>
        <button onClick={send} style={{background:"#C8753A",color:"#fff",border:"none",borderRadius:18,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>→</button>
      </div>
    </div>
  );
}
