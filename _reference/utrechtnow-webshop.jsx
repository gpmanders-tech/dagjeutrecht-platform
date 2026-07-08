import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   UTRECHTNOW WEBSHOP
   Vervangt de VVV-webshop + bundelt alle Utrechtse productwinkels

   Business regels (zelfde als activiteiten):
   - MARGIN 10% verborgen in klantprijs (basePrice = inkoopprijs)
   - Altijd online betalen
   - WeFact-factuur via checkbox
   - Verzending of afhalen bij UtrechtNow-balie
   - Dropship/affiliate per partner (FC Utrecht fanshop, SchotB, etc.)
═══════════════════════════════════════════════════════════════ */

const MARGIN = 0.10;
const applyMargin = (p) => Math.ceil(p * (1 + MARGIN) * 100) / 100;
const fmt = (n) => n.toLocaleString("nl-NL",{minimumFractionDigits:2,maximumFractionDigits:2});

const SHIPPING = {
  standard: { label:"PostNL Standaard (1-2 dagen)", price: 4.95 },
  express:  { label:"PostNL Vandaag bezorgd (voor 22:00)", price: 9.95 },
  pickup:   { label:"Afhalen UtrechtNow balie (Domplein)", price: 0 },
  free:     { label:"Gratis verzending", threshold: 50 },
};

/* ── PRODUCT DATABASE ──
   supplier = waar wij inkopen/dropshippen
   fulfilment = "dropship" (partner verstuurt) | "stock" (eigen voorraad) | "affiliate" (doorverwijzing met commissie)
*/
const PRODUCTS = [

  // ─── VVV-KLASSIEKERS (Utrecht souvenirs) ───
  { id:"nijntje-knuffel", cat:"nijntje", name:"Nijntje Knuffel 25cm (origineel)", icon:"🐰", basePrice:17.50,
    desc:"De originele Nijntje-knuffel uit het Dick Bruna Huis — hét Utrecht-cadeau.", supplier:"Groeten uit Utrecht", fulfilment:"dropship", stock:48, rating:4.9, tag:"Bestseller" },
  { id:"nijntje-dom", cat:"nijntje", name:"Nijntje × Domtoren T-shirt", icon:"👕", basePrice:22,
    desc:"Exclusief shirt: Nijntje voor de Domtoren. Maten S t/m XXL, ook kindermaten.", supplier:"Groeten uit Utrecht", fulfilment:"dropship", stock:35, rating:4.8 },
  { id:"nijntje-servies", cat:"nijntje", name:"Nijntje Ontbijtset (3-delig)", icon:"🍽️", basePrice:24.50,
    desc:"Bord, kom en beker met klassieke Nijntje-illustraties. Vaatwasserbestendig.", supplier:"Groeten uit Utrecht", fulfilment:"dropship", stock:22, rating:4.9 },
  { id:"dom-schaalmodel", cat:"souvenirs", name:"Domtoren Schaalmodel 30cm", icon:"🗼", basePrice:29,
    desc:"Gedetailleerd model van de Domtoren — handbeschilderd polystone.", supplier:"Official Souvenir Store", fulfilment:"stock", stock:15, rating:4.7, tag:"Populair" },
  { id:"dom-sneeuwbol", cat:"souvenirs", name:"Domtoren Sneeuwbol", icon:"❄️", basePrice:12.50,
    desc:"Klassieke sneeuwbol met Domtoren en grachtenpand.", supplier:"Utrecht Souvenirs", fulfilment:"stock", stock:60, rating:4.5 },
  { id:"utrecht-poster", cat:"souvenirs", name:"Utrecht Vintage Poster A2", icon:"🖼️", basePrice:16,
    desc:"Retro reisposter van de Oudegracht — gedrukt op 200grs mat papier.", supplier:"It's a present!", fulfilment:"dropship", stock:40, rating:4.8 },
  { id:"utrecht-magneten", cat:"souvenirs", name:"Magneten Set Utrecht (5 stuks)", icon:"🧲", basePrice:9.50,
    desc:"Vijf koelkastmagneten: Dom, gracht, Nijntje, fiets en stadswapen.", supplier:"Official Souvenir Store", fulfilment:"stock", stock:120, rating:4.6 },
  { id:"utrecht-monopoly", cat:"souvenirs", name:"Monopoly Utrecht Editie", icon:"🎲", basePrice:39.50,
    desc:"Het beroemde bordspel met Utrechtse straten — van Oudegracht tot Neude.", supplier:"It's a present!", fulfilment:"dropship", stock:18, rating:4.8, tag:"Cadeautip" },
  { id:"utrecht-puzzel", cat:"souvenirs", name:"Puzzel Oudegracht 1000 stukjes", icon:"🧩", basePrice:18.50,
    desc:"Sfeervolle luchtfoto van de Oudegracht — 1000 stukjes, 68×48cm.", supplier:"It's a present!", fulfilment:"dropship", stock:25, rating:4.7 },
  { id:"utrecht-boek", cat:"souvenirs", name:"Boek: Utrecht in 100 Verhalen", icon:"📖", basePrice:24.99,
    desc:"Prachtig fotoboek met de mooiste verhalen uit de stadsgeschiedenis (NL/EN).", supplier:"Eigen inkoop", fulfilment:"stock", stock:30, rating:4.9 },

  // ─── FC UTRECHT FANSHOP ───
  { id:"fcu-thuisshirt", cat:"fcutrecht", name:"FC Utrecht Thuisshirt 2026/27", icon:"⚽", basePrice:79.95,
    desc:"Het officiële thuisshirt — rood-wit met stadswapen. Alle maten, bedrukking mogelijk (+€15).", supplier:"FC Utrecht Fanshop (Galgenwaard)", fulfilment:"dropship", stock:50, rating:4.8, tag:"Officieel" },
  { id:"fcu-sjaal", cat:"fcutrecht", name:"FC Utrecht Sjaal 'Utreg'", icon:"🧣", basePrice:17.95,
    desc:"Klassieke gebreide sjaal — onmisbaar in de Galgenwaard.", supplier:"FC Utrecht Fanshop", fulfilment:"dropship", stock:80, rating:4.9, tag:"Bestseller" },
  { id:"fcu-stadiontour", cat:"fcutrecht", name:"Stadion Galgenwaard Tour (ticket)", icon:"🏟️", basePrice:14.50,
    desc:"Rondleiding door het stadion: kleedkamers, spelerstunnel, dug-out. Di–Za.", supplier:"FC Utrecht", fulfilment:"voucher", stock:999, rating:4.7, isActivity:true },
  { id:"fcu-babypakje", cat:"fcutrecht", name:"FC Utrecht Babyrompertje", icon:"👶", basePrice:19.95,
    desc:"'Geboren Utrechter' — rompertje in clubkleuren, maat 56 t/m 86.", supplier:"FC Utrecht Fanshop", fulfilment:"dropship", stock:25, rating:4.9 },
  { id:"fcu-bal", cat:"fcutrecht", name:"FC Utrecht Voetbal (maat 5)", icon:"⚽", basePrice:24.95,
    desc:"Officiële clubbal met logo — voor in de tuin of het trapveldje.", supplier:"FC Utrecht Fanshop", fulfilment:"dropship", stock:40, rating:4.6 },

  // ─── UTRECHTSE STREEKPRODUCTEN ───
  { id:"bierpakket-utrecht", cat:"food", name:"Utrechts Bierpakket (6 flesjes)", icon:"🍺", basePrice:21.50,
    desc:"Zes speciaalbieren van vandeStreek, De Kromme Haring en Maximus — met proefnotities.", supplier:"Buurtbier.nl / Little Beershop", fulfilment:"dropship", stock:45, rating:4.9, tag:"Cadeautip" },
  { id:"borrelpakket", cat:"food", name:"Utrechts Borrelpakket", icon:"🧀", basePrice:34.50,
    desc:"Lokale kaas, worst, olijven, crackers en 2 Utrechtse bieren in geschenkdoos.", supplier:"SchotB. 1885", fulfilment:"dropship", stock:30, rating:4.9 },
  { id:"kerstpakket", cat:"food", name:"Kerstpakket 'Utrecht Made' (zakelijk)", icon:"🎄", basePrice:42.50,
    desc:"Zakelijk kerstpakket vol Utrechtse producten: bier, thee, chocolade, honing. Vanaf 10 stuks — WeFact-factuur standaard.", supplier:"SchotB. 1885", fulfilment:"dropship", stock:200, rating:4.9, isB2B:true, minQty:10, tag:"Zakelijk" },
  { id:"chocolade-dom", cat:"food", name:"Chocolade Domtoren (handgemaakt)", icon:"🍫", basePrice:14.50,
    desc:"Handgemaakte chocolade Domtoren van het GrachtenAtelier — melk of puur, 250 gram.", supplier:"GrachtenAtelier", fulfilment:"dropship", stock:20, rating:4.8 },
  { id:"theepakket", cat:"food", name:"Utrechtse Theedoos (12 melanges)", icon:"🍵", basePrice:16.50,
    desc:"Twaalf lokale theemelanges met Utrechtse namen — van 'Domtoren Blend' tot 'Oudegracht Ochtend'.", supplier:"SchotB. 1885", fulfilment:"dropship", stock:35, rating:4.7 },
  { id:"stroopwafels", cat:"food", name:"Verse Stroopwafels (blik à 10)", icon:"🧇", basePrice:11.50,
    desc:"Vers gebakken stroopwafels in Utrecht-blik — leuk om te bewaren.", supplier:"Eigen inkoop", fulfilment:"stock", stock:75, rating:4.8 },
  { id:"boerderijbox", cat:"food", name:"Boerderijbox De Haarse Gaard", icon:"🧺", basePrice:27.50,
    desc:"Seizoensbox van de boerderijwinkel bij Kasteel de Haar: kaas, appels, jam en honing.", supplier:"De Haarse Gaard", fulfilment:"dropship", stock:15, rating:4.7 },

  // ─── CADEAUBONNEN ───
  { id:"cadeaubon-25", cat:"cadeaubon", name:"UtrechtNow Cadeaubon €25", icon:"🎟️", basePrice:25, noMargin:true,
    desc:"Te besteden aan alle 180+ activiteiten, hotels en producten op UtrechtNow. Digitaal of fysiek.", supplier:"UtrechtNow", fulfilment:"digital", stock:999, rating:5.0 },
  { id:"cadeaubon-50", cat:"cadeaubon", name:"UtrechtNow Cadeaubon €50", icon:"🎟️", basePrice:50, noMargin:true,
    desc:"Het perfecte cadeau: een dagje Utrecht naar keuze. 2 jaar geldig.", supplier:"UtrechtNow", fulfilment:"digital", stock:999, rating:5.0, tag:"Populair" },
  { id:"cadeaubon-100", cat:"cadeaubon", name:"UtrechtNow Cadeaubon €100", icon:"🎁", basePrice:100, noMargin:true,
    desc:"Compleet dagje uit cadeau: activiteit + lunch + borrel. 2 jaar geldig.", supplier:"UtrechtNow", fulfilment:"digital", stock:999, rating:5.0 },
  { id:"belevenisbox-duo", cat:"cadeaubon", name:"Belevenisbox 'Dagje Utrecht voor 2'", icon:"💝", basePrice:89,
    desc:"Fysieke geschenkdoos met keuze uit 25 activiteiten voor 2 personen — incl. SUP, escape room, rondvaart of workshop.", supplier:"UtrechtNow", fulfilment:"stock", stock:40, rating:4.9, tag:"Cadeautip" },
];

const CATEGORIES = [
  { id:"all",       label:"Alles",                icon:"🛍️" },
  { id:"nijntje",   label:"Nijntje / Miffy",      icon:"🐰" },
  { id:"souvenirs", label:"Utrecht Souvenirs",    icon:"🗼" },
  { id:"fcutrecht", label:"FC Utrecht",           icon:"⚽" },
  { id:"food",      label:"Streekproducten",      icon:"🧀" },
  { id:"cadeaubon", label:"Cadeaubonnen",         icon:"🎟️" },
];

const FULFILMENT_LABEL = {
  dropship: { label:"Verzonden door partner", icon:"📦", color:"#1565C0", bg:"#E3F2FD" },
  stock:    { label:"Eigen voorraad — snel",  icon:"⚡", color:"#2D7A4F", bg:"#E8F5E9" },
  digital:  { label:"Direct per e-mail",       icon:"📧", color:"#6A1B9A", bg:"#F3E5F5" },
  voucher:  { label:"Voucher per e-mail",      icon:"🎟️", color:"#C8753A", bg:"#FFF3E0" },
};

export default function Webshop() {
  const [cat, setCat] = useState("all");
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("shop"); // shop | checkout | success
  const [shipMethod, setShipMethod] = useState("standard");
  const [customer, setCustomer] = useState({ name:"", email:"", address:"", zip:"", city:"", wantInvoice:false, company:"", vat:"" });
  const [orderRef, setOrderRef] = useState(null);
  const [search, setSearch] = useState("");

  // Persistent cart
  useEffect(() => { (async()=>{ try { const r = await window.storage.get("utrechtnow:shopcart"); if(r) setCart(JSON.parse(r.value)); } catch{} })(); }, []);
  const saveCart = async (c) => { setCart(c); try { await window.storage.set("utrechtnow:shopcart", JSON.stringify(c)); } catch{} };

  const priceOf = (p) => p.noMargin ? p.basePrice : applyMargin(p.basePrice);

  const addToCart = (p) => {
    const exists = cart.find(i => i.id === p.id);
    if (exists) saveCart(cart.map(i => i.id===p.id ? {...i, qty: i.qty+1} : i));
    else saveCart([...cart, { id:p.id, name:p.name, icon:p.icon, price: priceOf(p), qty: p.minQty||1, fulfilment:p.fulfilment, supplier:p.supplier, isB2B:p.isB2B, minQty:p.minQty||1 }]);
  };
  const updateQty = (id, d) => saveCart(cart.map(i => i.id===id ? {...i, qty: Math.max(i.minQty||1, i.qty+d)} : i).filter(i=>i.qty>0));
  const removeItem = (id) => saveCart(cart.filter(i=>i.id!==id));

  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const onlyDigital = cart.length>0 && cart.every(i=>["digital","voucher"].includes(i.fulfilment));
  const shipCost = onlyDigital ? 0 : (subtotal >= SHIPPING.free.threshold ? 0 : SHIPPING[shipMethod].price);
  const total = subtotal + shipCost;
  const hasB2B = cart.some(i=>i.isB2B);

  const filtered = PRODUCTS.filter(p =>
    (cat==="all"||p.cat===cat) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()))
  );

  const handlePay = () => {
    setOrderRef("SHOP-"+Math.random().toString(36).toUpperCase().slice(2,8));
    saveCart([]);
    setView("success");
  };

  /* ─── SUCCESS ─── */
  if (view === "success") return (
    <div style={{fontFamily:"Inter,sans-serif",background:"#F7F3EC",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:"#fff",borderRadius:20,padding:40,maxWidth:480,textAlign:"center",boxShadow:"0 16px 48px rgba(30,58,74,.14)"}}>
        <div style={{width:68,height:68,background:"#2D7A4F",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 18px"}}>✓</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:900,color:"#1E3A4A",marginBottom:8}}>Bestelling geplaatst!</div>
        <div style={{fontSize:13,color:"#6B7A85",lineHeight:1.7,marginBottom:18}}>
          U ontvangt per e-mail een bevestiging met track &amp; trace.
          {customer.wantInvoice && <><br/>📄 De WeFact-factuur volgt binnen enkele minuten.</>}
        </div>
        <div style={{background:"#F7F3EC",borderRadius:10,padding:"14px 22px",display:"inline-block",fontSize:12,color:"#6B7A85",marginBottom:20}}>
          Bestelnummer<strong style={{color:"#1E3A4A",fontSize:18,fontFamily:"monospace",display:"block",marginTop:4}}>{orderRef}</strong>
        </div>
        <button onClick={()=>setView("shop")} style={{display:"block",width:"100%",background:"#1E3A4A",color:"#fff",border:"none",borderRadius:9,padding:13,fontSize:14,fontWeight:700,cursor:"pointer"}}>← Verder winkelen</button>
      </div>
    </div>
  );

  /* ─── CHECKOUT ─── */
  if (view === "checkout") return (
    <div style={{fontFamily:"Inter,sans-serif",background:"#F7F3EC",minHeight:"100vh",padding:24}}>
      <div style={{maxWidth:980,margin:"0 auto"}}>
        <button onClick={()=>setView("shop")} style={{background:"#E8E2D8",border:"none",borderRadius:8,padding:"9px 16px",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:18}}>← Terug naar shop</button>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:28,fontWeight:900,color:"#1E3A4A",marginBottom:20}}>Afrekenen</h1>
        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:20}}>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {/* GEGEVENS */}
            <div style={{background:"#fff",borderRadius:14,padding:22,boxShadow:"0 2px 8px rgba(30,58,74,.07)"}}>
              <div style={{fontWeight:700,color:"#1E3A4A",marginBottom:14,fontSize:14}}>👤 Gegevens &amp; bezorgadres</div>
              <div style={{display:"flex",flexDirection:"column",gap:11}}>
                <div style={{display:"flex",gap:10}}>
                  <Inp label="Volledige naam *" v={customer.name} set={v=>setCustomer(c=>({...c,name:v}))} ph="Jan de Vries"/>
                  <Inp label="E-mailadres *" v={customer.email} set={v=>setCustomer(c=>({...c,email:v}))} ph="jan@email.nl" type="email"/>
                </div>
                {!onlyDigital && (
                  <>
                    <Inp label="Straat + huisnummer *" v={customer.address} set={v=>setCustomer(c=>({...c,address:v}))} ph="Oudegracht 1"/>
                    <div style={{display:"flex",gap:10}}>
                      <Inp label="Postcode *" v={customer.zip} set={v=>setCustomer(c=>({...c,zip:v}))} ph="3511 AB"/>
                      <Inp label="Plaats *" v={customer.city} set={v=>setCustomer(c=>({...c,city:v}))} ph="Utrecht"/>
                    </div>
                  </>
                )}
                {/* WEFACT */}
                <div style={{background:"#F7F3EC",border:"1.5px solid #E8E2D8",borderRadius:9,padding:14}}>
                  <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
                    <input type="checkbox" checked={customer.wantInvoice||hasB2B} onChange={e=>setCustomer(c=>({...c,wantInvoice:e.target.checked}))} disabled={hasB2B} style={{width:16,height:16,accentColor:"#2D7A4F"}}/>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:"#1E3A4A"}}>📄 Factuur via WeFact {hasB2B && <span style={{fontSize:10,background:"#FFF3E0",color:"#C8753A",borderRadius:3,padding:"1px 6px",marginLeft:4}}>verplicht bij zakelijke producten</span>}</div>
                      <div style={{fontSize:11,color:"#6B7A85"}}>BTW-factuur op bedrijfsnaam (kerstpakketten altijd met factuur)</div>
                    </div>
                  </label>
                  {(customer.wantInvoice||hasB2B) && (
                    <div style={{display:"flex",gap:10,marginTop:12}}>
                      <Inp label="Bedrijfsnaam *" v={customer.company} set={v=>setCustomer(c=>({...c,company:v}))} ph="Bedrijf BV"/>
                      <Inp label="BTW-nummer" v={customer.vat} set={v=>setCustomer(c=>({...c,vat:v}))} ph="NL…B01"/>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* VERZENDING */}
            {!onlyDigital && (
              <div style={{background:"#fff",borderRadius:14,padding:22,boxShadow:"0 2px 8px rgba(30,58,74,.07)"}}>
                <div style={{fontWeight:700,color:"#1E3A4A",marginBottom:6,fontSize:14}}>📦 Verzendmethode</div>
                {subtotal >= SHIPPING.free.threshold && <div style={{fontSize:12,color:"#2D7A4F",fontWeight:700,marginBottom:10}}>🎉 Gratis verzending (bestelling boven €{SHIPPING.free.threshold})</div>}
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {["standard","express","pickup"].map(k=>(
                    <label key={k} style={{display:"flex",alignItems:"center",gap:10,border:`2px solid ${shipMethod===k?"#1E3A4A":"#E8E2D8"}`,borderRadius:9,padding:"11px 14px",cursor:"pointer",background:shipMethod===k?"rgba(30,58,74,.03)":"#fff"}}>
                      <input type="radio" checked={shipMethod===k} onChange={()=>setShipMethod(k)} style={{accentColor:"#1E3A4A"}}/>
                      <span style={{flex:1,fontSize:13,fontWeight:600}}>{SHIPPING[k].label}</span>
                      <span style={{fontWeight:700,fontSize:13,color:"#1E3A4A"}}>{subtotal>=SHIPPING.free.threshold&&k!=="express"?"Gratis":SHIPPING[k].price===0?"Gratis":`€${fmt(SHIPPING[k].price)}`}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            {/* BETALEN */}
            <div style={{background:"#fff",borderRadius:14,padding:22,boxShadow:"0 2px 8px rgba(30,58,74,.07)"}}>
              <div style={{fontWeight:700,color:"#1E3A4A",marginBottom:12,fontSize:14}}>💳 Betaling</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {[["🏦 iDEAL","#1E3A4A"],["💳 Creditcard","#2C526A"],["🍎 Apple Pay / Google Pay","#1A1612"],...((customer.wantInvoice||hasB2B)?[["🏢 Op rekening via WeFact-factuur (zakelijk)","light"]]:[])].map(([l,bg])=>(
                  <button key={l} onClick={handlePay} disabled={!customer.name||!customer.email}
                    style={{background:bg==="light"?"#E8E2D8":bg,color:bg==="light"?"#1A1612":"#fff",border:"none",borderRadius:9,padding:"13px 18px",fontSize:14,fontWeight:700,cursor:customer.name&&customer.email?"pointer":"not-allowed",opacity:customer.name&&customer.email?1:.5,display:"flex",justifyContent:"space-between"}}>
                    <span>{l}</span><span>€ {fmt(total)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* SUMMARY */}
          <div style={{background:"#fff",borderRadius:14,padding:20,boxShadow:"0 2px 8px rgba(30,58,74,.07)",height:"fit-content",position:"sticky",top:16}}>
            <div style={{fontWeight:700,color:"#1E3A4A",marginBottom:12,fontSize:14}}>🛒 Bestelling ({cart.length})</div>
            {cart.map(i=>(
              <div key={i.id} style={{display:"flex",gap:8,padding:"8px 0",borderBottom:"1px solid #F2EDE6",fontSize:12}}>
                <span style={{fontSize:17}}>{i.icon}</span>
                <div style={{flex:1}}><div style={{fontWeight:700,color:"#1E3A4A"}}>{i.name}</div><div style={{fontSize:10,color:"#6B7A85"}}>{i.qty}× €{fmt(i.price)}</div></div>
                <span style={{fontWeight:700}}>€{fmt(i.price*i.qty)}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0 3px",fontSize:12,color:"#6B7A85"}}><span>Subtotaal</span><span>€{fmt(subtotal)}</span></div>
            {!onlyDigital && <div style={{display:"flex",justifyContent:"space-between",padding:"3px 0",fontSize:12,color:"#6B7A85"}}><span>Verzending</span><span>{shipCost===0?"Gratis":`€${fmt(shipCost)}`}</span></div>}
            <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0 0",fontWeight:900,fontSize:16,color:"#1E3A4A",borderTop:"2px solid #E8E2D8",marginTop:6}}><span>Totaal</span><span>€ {fmt(total)}</span></div>
            <div style={{fontSize:10,color:"#aaa",marginTop:4}}>Incl. BTW en servicekosten</div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── SHOP ─── */
  return (
    <div style={{fontFamily:"Inter,sans-serif",background:"#F7F3EC",minHeight:"100vh"}}>
      {/* NAV */}
      <nav style={{background:"rgba(30,58,74,.97)",padding:"12px 24px",display:"flex",alignItems:"center",gap:14,position:"sticky",top:0,zIndex:100}}>
        <span style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:900,color:"#F7F3EC"}}>Utrecht<span style={{color:"#C8753A"}}>Now</span> <span style={{fontSize:12,color:"rgba(247,243,236,.5)",fontFamily:"Inter,sans-serif",fontWeight:600}}>· Webshop</span></span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Zoek product…" style={{background:"rgba(255,255,255,.09)",border:"1px solid rgba(255,255,255,.12)",color:"#F7F3EC",borderRadius:18,padding:"8px 14px",fontSize:13,width:220,outline:"none"}}/>
        <div style={{marginLeft:"auto"}}>
          <button onClick={()=>cart.length&&setView("checkout")} style={{background:cart.length?"#C8753A":"rgba(255,255,255,.1)",color:"#fff",border:"none",borderRadius:8,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:cart.length?"pointer":"default"}}>
            🛒 Winkelwagen ({cart.reduce((s,i)=>s+i.qty,0)}) {subtotal>0&&`· €${fmt(subtotal)}`}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{background:"linear-gradient(135deg,#1E3A4A,#2C526A)",padding:"36px 24px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{fontSize:10,fontWeight:800,letterSpacing:"3px",color:"#C8753A",textTransform:"uppercase",marginBottom:6}}>De Utrecht Webshop</div>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:900,color:"#fff",marginBottom:8}}>Alles van Utrecht, thuisbezorgd</h1>
          <p style={{fontSize:14,color:"rgba(247,243,236,.65)",maxWidth:560,lineHeight:1.65,marginBottom:16}}>Nijntje, FC Utrecht merchandise, streekproducten, cadeaubonnen en zakelijke kerstpakketten — uit één winkelwagen, met één betaling. Gratis verzending vanaf €50.</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {["📦 1-2 dagen levertijd","🏪 Of afhalen op Domplein","📄 WeFact-factuur mogelijk","🎁 Cadeauverpakking gratis"].map(t=>(
              <span key={t} style={{background:"rgba(255,255,255,.1)",borderRadius:6,padding:"5px 11px",fontSize:11,fontWeight:600,color:"rgba(247,243,236,.85)"}}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div style={{background:"#fff",borderBottom:"1px solid #E8E2D8",position:"sticky",top:57,zIndex:90}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px",display:"flex",gap:0,overflowX:"auto"}}>
          {CATEGORIES.map(c=>(
            <button key={c.id} onClick={()=>setCat(c.id)} style={{border:"none",background:"none",padding:"13px 16px",fontSize:13,fontWeight:600,color:cat===c.id?"#1E3A4A":"#6B7A85",borderBottom:cat===c.id?"3px solid #C8753A":"3px solid transparent",cursor:"pointer",whiteSpace:"nowrap"}}>
              {c.icon} {c.label} ({c.id==="all"?PRODUCTS.length:PRODUCTS.filter(p=>p.cat===c.id).length})
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:16}}>
          {filtered.map(p => {
            const inCart = cart.find(i=>i.id===p.id);
            const ff = FULFILMENT_LABEL[p.fulfilment];
            return (
              <div key={p.id} style={{background:"#fff",borderRadius:13,padding:18,boxShadow:"0 3px 12px rgba(30,58,74,.07)",position:"relative",display:"flex",flexDirection:"column",border:`2px solid ${inCart?"#2D7A4F":"transparent"}`,transition:"all .15s"}}>
                {p.tag && <div style={{position:"absolute",top:0,right:0,background:p.tag==="Zakelijk"?"#6A1B9A":"#C8753A",color:"#fff",fontSize:8,fontWeight:900,padding:"4px 10px 4px 14px",clipPath:"polygon(8px 0,100% 0,100% 100%,0 100%)",textTransform:"uppercase",letterSpacing:".5px"}}>{p.tag}</div>}
                <div style={{fontSize:42,textAlign:"center",margin:"6px 0 12px"}}>{p.icon}</div>
                <div style={{fontSize:13,fontWeight:700,color:"#1E3A4A",marginBottom:4,lineHeight:1.3}}>{p.name}</div>
                <div style={{fontSize:11,color:"#6B7A85",lineHeight:1.55,marginBottom:10,flex:1}}>{p.desc}</div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10,alignItems:"center"}}>
                  <span style={{fontSize:9,fontWeight:800,background:ff.bg,color:ff.color,padding:"2px 7px",borderRadius:3}}>{ff.icon} {ff.label}</span>
                  <span style={{fontSize:10,color:"#F59E0B",fontWeight:700}}>★ {p.rating}</span>
                </div>
                <div style={{fontSize:9,color:"#aaa",marginBottom:10}}>Leverancier: {p.supplier} {p.stock<25&&p.stock<900&&<span style={{color:"#C0392B",fontWeight:700}}>· Nog {p.stock} op voorraad</span>}</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div>
                    <span style={{fontSize:18,fontWeight:900,color:"#1E3A4A"}}>€{fmt(priceOf(p))}</span>
                    {p.minQty>1 && <div style={{fontSize:9,color:"#6A1B9A",fontWeight:700}}>Min. {p.minQty} stuks (zakelijk)</div>}
                  </div>
                  {inCart ? (
                    <div style={{display:"flex",alignItems:"center",gap:7}}>
                      <button onClick={()=>updateQty(p.id,-1)} style={{width:26,height:26,borderRadius:"50%",border:"1.5px solid #2D7A4F",background:"#fff",color:"#2D7A4F",fontSize:14,cursor:"pointer",lineHeight:1}}>−</button>
                      <span style={{fontWeight:800,fontSize:14,minWidth:18,textAlign:"center"}}>{inCart.qty}</span>
                      <button onClick={()=>updateQty(p.id,1)} style={{width:26,height:26,borderRadius:"50%",border:"1.5px solid #2D7A4F",background:"#2D7A4F",color:"#fff",fontSize:14,cursor:"pointer",lineHeight:1}}>+</button>
                    </div>
                  ) : (
                    <button onClick={()=>addToCart(p)} style={{background:"#C8753A",color:"#fff",border:"none",borderRadius:7,padding:"8px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>+ Winkelwagen</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* PARTNER BANNER */}
        <div style={{marginTop:32,background:"#fff",borderRadius:14,padding:"22px 26px",boxShadow:"0 2px 8px rgba(30,58,74,.07)"}}>
          <div style={{fontWeight:700,color:"#1E3A4A",marginBottom:6,fontSize:14}}>🤝 Onze winkelpartners</div>
          <div style={{fontSize:12,color:"#6B7A85",lineHeight:1.7,marginBottom:12}}>Producten worden geleverd door lokale Utrechtse winkels en partners. Dropship rechtstreeks van de partner, of uit eigen UtrechtNow-voorraad.</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {["Groeten uit Utrecht (★4.9)","FC Utrecht Fanshop Galgenwaard","SchotB. 1885 — Utrecht Made","Buurtbier.nl (600 NL bieren)","Little Beershop","It's a present!","Official Souvenir Store","GrachtenAtelier","De Haarse Gaard boerderijwinkel"].map(s=>(
              <span key={s} style={{background:"#F7F3EC",border:"1.5px solid #E8E2D8",borderRadius:7,padding:"6px 12px",fontSize:11,fontWeight:600,color:"#1E3A4A"}}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Inp({ label, v, set, ph, type="text" }) {
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
      <label style={{fontSize:9,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>{label}</label>
      <input type={type} value={v} onChange={e=>set(e.target.value)} placeholder={ph}
        style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
    </div>
  );
}
