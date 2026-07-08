import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   UTRECHTNOW — ORDER MANAGEMENT SYSTEM
   
   Flow:
   1. Klant boekt → betaalt bij UtrechtNow → order aangemaakt
   2. UtrechtNow bevestigt bij leverancier (API call)
   3. Klant ontvangt: bevestigingsmail + aparte voucher per onderdeel
   4. Klant kan wijzigen (aantal/tijdstip) zolang leverancier dit toelaat
   5. Bij wijziging: nieuwe voucher verstuurd, leverancier bijgewerkt
═══════════════════════════════════════════════════════════════ */

const MARGIN = 0.10;

// Wijzigingsbeleid per boekingssysteem
const CHANGE_POLICY = {
  "Ticketmaster":  { canChange: true,  deadline: 48, unit: "uur", canChangeTime: true,  canChangeQty: false, note: "Tijdslot wijzigen tot 48u van tevoren. Aantal niet wijzigbaar." },
  "Viator":        { canChange: true,  deadline: 24, unit: "uur", canChangeTime: true,  canChangeQty: true,  note: "Volledig wijzigbaar tot 24u van tevoren." },
  "GetYourGuide":  { canChange: true,  deadline: 24, unit: "uur", canChangeTime: true,  canChangeQty: true,  note: "Volledig wijzigbaar tot 24u van tevoren." },
  "FareHarbor":    { canChange: true,  deadline: 24, unit: "uur", canChangeTime: true,  canChangeQty: true,  note: "Volledig wijzigbaar tot 24u van tevoren (DagjeSuppen)." },
  "Booking.com":   { canChange: true,  deadline: 24, unit: "uur", canChangeTime: false, canChangeQty: false, note: "Datum wijzigbaar. Tijdslot/aantal via hotel zelf." },
  "TheFork":       { canChange: true,  deadline: 24, unit: "uur", canChangeTime: true,  canChangeQty: true,  note: "Reservering aanpasbaar tot 24u van tevoren." },
  "Direct API":    { canChange: true,  deadline: 48, unit: "uur", canChangeTime: true,  canChangeQty: true,  note: "Wijzigbaar tot 48u van tevoren. Afhankelijk van leverancier." },
  "—":             { canChange: false, deadline: 0,  unit: "",    canChangeTime: false, canChangeQty: false, note: "Niet van toepassing (tip-only)." },
};

// Demo leveranciers
const PROVIDERS = [
  { id:"domtoren",   name:"Domtoren",           icon:"🗼", api:"Ticketmaster", price:14, slots:["10:00","11:00","14:00","14:30","15:00"], fullSlots:["14:00"] },
  { id:"domunder",   name:"DOMunder",            icon:"🌿", api:"GetYourGuide", price:12.50, slots:["10:00","11:00","12:00","13:00","15:00"], fullSlots:[] },
  { id:"dagjesuppen",name:"DagjeSuppen.nl",      icon:"🏄", api:"FareHarbor",   price:22, slots:["09:30","10:00","11:00","14:00","16:00"], fullSlots:[] },
  { id:"kasteel",    name:"Kasteel de Haar",     icon:"🏰", api:"Viator",       price:18, slots:["10:00","11:00","13:00","14:00"], fullSlots:[] },
  { id:"speelklok",  name:"Museum Speelklok",    icon:"🎵", api:"Viator",       price:16, slots:["10:00","11:00","13:00","14:00"], fullSlots:[] },
  { id:"grandshuffle",name:"The Grand Shuffle",  icon:"🏒", api:"Direct API",   price:22, slots:["16:00","17:00","18:00","19:00","20:00","21:00"], fullSlots:["19:00"] },
  { id:"pingpong",   name:"The Ping Pong Club",  icon:"🏓", api:"Direct API",   price:10, slots:["15:00","17:00","19:00","21:00"], fullSlots:[] },
  { id:"doloris",    name:"Doloris Anoma Maze",  icon:"🌀", api:"Direct API",   price:16, slots:["10:30","12:00","14:00","16:00","18:00","20:00"], fullSlots:["14:00"] },
  { id:"jeubar",     name:"JEU de Boules Bar",   icon:"🎳", api:"Direct API",   price:12, slots:["15:00","16:00","17:00","18:00","19:00","20:00"], fullSlots:[] },
  { id:"sansiro",    name:"Restaurant San Siro", icon:"🍽️", api:"TheFork",      price:0,  slots:["18:00","18:30","19:00","19:30","20:00","20:30"], fullSlots:["19:00"], isFree:true, freeNote:"Reservering (geen entreegeld)" },
  { id:"kayak",      name:"Kayak Utrecht",       icon:"🚣", api:"Direct API",   price:17, slots:["10:00","12:00","14:00","16:00"], fullSlots:[] },
  { id:"hemel",      name:"Hemel & Aarde",       icon:"⭐", api:"Booking.com",  price:0,  slots:["18:00","18:30","19:00","20:00"], fullSlots:[], isFree:true, freeNote:"Tafelreservering" },
];

function applyMargin(p) { return p ? Math.ceil(p * (1 + MARGIN)) : 0; }
function fmt(n) { return n.toLocaleString("nl-NL",{minimumFractionDigits:2,maximumFractionDigits:2}); }
function fmtDate(d) { return new Date(d).toLocaleDateString("nl-NL",{weekday:"long",year:"numeric",month:"long",day:"numeric"}); }
function orderRef() { return "UN-"+Math.random().toString(36).toUpperCase().slice(2,9); }
function voucherCode(providerId) { return providerId.toUpperCase().slice(0,3)+"-"+Math.random().toString(36).toUpperCase().slice(2,8); }
function hoursUntil(dateStr, timeStr) {
  if (!dateStr || !timeStr) return 9999;
  const dt = new Date(`${dateStr}T${timeStr}:00`);
  return (dt - new Date()) / 36e5;
}

/* ═══════════════════════════════════════════════════════════════
   ORDER STATUS MACHINE
═══════════════════════════════════════════════════════════════ */
const STATUS = {
  PENDING:    { label:"In behandeling", color:"#F59E0B", bg:"#FFF9E6", icon:"⏳" },
  CONFIRMED:  { label:"Bevestigd",       color:"#2D7A4F", bg:"#E8F5E9", icon:"✅" },
  MODIFIED:   { label:"Gewijzigd",       color:"#1565C0", bg:"#E3F2FD", icon:"✏️" },
  CANCELLED:  { label:"Geannuleerd",     color:"#C0392B", bg:"#FDE8E8", icon:"❌" },
};

/* ═══════════════════════════════════════════════════════════════
   VOUCHER RENDERER (HTML email template)
═══════════════════════════════════════════════════════════════ */
function generateVoucherHtml(order, item) {
  const provider = PROVIDERS.find(p => p.id === item.providerId);
  const policy = CHANGE_POLICY[item.api];
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px}
  .voucher{background:#fff;max-width:600px;margin:0 auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.12)}
  .v-header{background:linear-gradient(135deg,#1E3A4A,#2C526A);padding:28px;text-align:center}
  .v-logo{font-size:24px;font-weight:900;color:#F7F3EC;letter-spacing:-0.5px}
  .v-logo span{color:#C8753A}
  .v-subtitle{font-size:12px;color:rgba(247,243,236,.6);margin-top:4px;text-transform:uppercase;letter-spacing:2px}
  .v-hero{background:#F7F3EC;padding:24px;text-align:center;border-bottom:2px dashed #E8E2D8}
  .v-icon{font-size:52px;margin-bottom:8px}
  .v-name{font-size:22px;font-weight:700;color:#1E3A4A;margin-bottom:4px}
  .v-code{background:#1E3A4A;color:#E8956A;font-family:monospace;font-size:22px;font-weight:900;padding:8px 20px;border-radius:8px;letter-spacing:3px;display:inline-block;margin:12px 0}
  .v-body{padding:24px}
  .v-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #F2EDE6;font-size:14px}
  .v-row:last-child{border-bottom:none}
  .v-label{color:#6B7A85;font-weight:600}
  .v-value{color:#1A1612;font-weight:700;text-align:right}
  .v-footer{background:#1E3A4A;padding:20px;text-align:center;font-size:11px;color:rgba(247,243,236,.5)}
  .v-policy{background:#FFF9E6;border:1px solid #F59E0B;border-radius:8px;padding:12px;margin:16px 0;font-size:12px;color:#856404}
  .v-qr{width:80px;height:80px;background:#E8E2D8;border-radius:8px;margin:12px auto;display:flex;align-items:center;justify-content:center;font-size:28px}
</style></head>
<body>
<div class="voucher">
  <div class="v-header">
    <div class="v-logo">Utrecht<span>Now</span></div>
    <div class="v-subtitle">Uw Voucher</div>
  </div>
  <div class="v-hero">
    <div class="v-icon">${item.icon}</div>
    <div class="v-name">${item.name}</div>
    <div class="v-code">${item.voucherCode}</div>
    <div style="font-size:11px;color:#6B7A85">Toon dit aan de ingang</div>
    <div class="v-qr">📱</div>
  </div>
  <div class="v-body">
    <div class="v-row"><span class="v-label">Boeking</span><span class="v-value">${order.ref}</span></div>
    <div class="v-row"><span class="v-label">Op naam van</span><span class="v-value">${order.customer.name}</span></div>
    <div class="v-row"><span class="v-label">Datum</span><span class="v-value">${fmtDate(item.date)}</span></div>
    <div class="v-row"><span class="v-label">Tijdstip</span><span class="v-value">${item.time}</span></div>
    <div class="v-row"><span class="v-label">Aantal personen</span><span class="v-value">${item.qty} persoon${item.qty>1?"en":""}</span></div>
    <div class="v-row"><span class="v-label">Adres</span><span class="v-value">Utrecht, Nederland</span></div>
    <div class="v-row"><span class="v-label">Boekingssysteem</span><span class="v-value">${item.api}</span></div>
    ${item.amount > 0 ? `<div class="v-row"><span class="v-label">Betaald</span><span class="v-value" style="color:#2D7A4F">€${fmt(item.amount)} ✓</span></div>` : `<div class="v-row"><span class="v-label">Status</span><span class="v-value" style="color:#2D7A4F">${item.freeNote||"Gratis"} ✓</span></div>`}
    ${item.isModified ? `<div style="background:#E3F2FD;border-radius:6px;padding:8px 10px;font-size:12px;color:#1565C0;margin-top:8px">✏️ Gewijzigde voucher — vervangt eerder verstuurde voucher</div>` : ""}
    <div class="v-policy">⏱️ <strong>Wijzigingsbeleid (${item.api}):</strong> ${policy.note}</div>
  </div>
  <div class="v-footer">
    UtrechtNow · KvK 12345678 · info@utrechtnow.nl · +31 (0)30 200 0000<br/>
    Voucher ${item.voucherCode} · Aangemaakt ${new Date().toLocaleDateString("nl-NL")}
  </div>
</div>
</body></html>`;
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════════ */
export default function OrderManagement() {
  const [view, setView] = useState("booking"); // booking | dashboard | order | voucher
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [modifyItem, setModifyItem] = useState(null);
  const [notification, setNotification] = useState(null);

  // Load from storage
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("utrechtnow:orders");
        if (res) setOrders(JSON.parse(res.value));
      } catch {}
    })();
  }, []);

  // Save to storage
  const saveOrders = async (newOrders) => {
    setOrders(newOrders);
    try { await window.storage.set("utrechtnow:orders", JSON.stringify(newOrders)); } catch {}
  };

  const notify = (msg, type="success") => {
    setNotification({msg, type});
    setTimeout(() => setNotification(null), 3500);
  };

  const handleNewOrder = (order) => {
    const withStorage = { ...order, createdAt: new Date().toISOString() };
    saveOrders([withStorage, ...orders]);
    setSelectedOrder(withStorage);
    setView("order");
    notify(`Boeking ${order.ref} aangemaakt! Vouchers verstuurd naar ${order.customer.email}`);
  };

  const handleModify = (orderId, itemIdx, newTime, newQty) => {
    const updated = orders.map(o => {
      if (o.ref !== orderId) return o;
      const items = o.items.map((item, i) => {
        if (i !== itemIdx) return item;
        return {
          ...item,
          time: newTime,
          qty: newQty,
          isModified: true,
          modifiedAt: new Date().toISOString(),
          voucherCode: voucherCode(item.providerId), // nieuwe voucher bij wijziging
          amount: item.providerId && PROVIDERS.find(p=>p.id===item.providerId)?.price
            ? Math.ceil(PROVIDERS.find(p=>p.id===item.providerId).price * (1+MARGIN) * newQty)
            : item.amount,
        };
      });
      return { ...o, items, status:"MODIFIED", modifiedAt: new Date().toISOString() };
    });
    saveOrders(updated);
    setSelectedOrder(updated.find(o => o.ref === orderId));
    setModifyItem(null);
    notify("Wijziging opgeslagen! Nieuwe voucher verstuurd naar klant.");
  };

  const handleCancel = (orderId, itemIdx) => {
    const updated = orders.map(o => {
      if (o.ref !== orderId) return o;
      const items = o.items.map((item, i) => {
        if (i !== itemIdx) return item;
        return { ...item, cancelled: true, cancelledAt: new Date().toISOString() };
      });
      const allCancelled = items.every(i => i.cancelled);
      return { ...o, items, status: allCancelled ? "CANCELLED" : "MODIFIED" };
    });
    saveOrders(updated);
    setSelectedOrder(updated.find(o => o.ref === orderId));
    notify("Onderdeel geannuleerd. Klant geïnformeerd per e-mail.", "warning");
  };

  return (
    <div style={{fontFamily:"Inter,sans-serif",background:"#F7F3EC",minHeight:"100vh",color:"#1A1612"}}>

      {/* NOTIFICATION */}
      {notification && (
        <div style={{position:"fixed",top:16,right:16,zIndex:999,background:notification.type==="warning"?"#FFF9E6":"#E8F5E9",border:`1.5px solid ${notification.type==="warning"?"#F59E0B":"#2D7A4F"}`,borderRadius:10,padding:"12px 18px",fontSize:13,fontWeight:600,color:notification.type==="warning"?"#856404":"#2D7A4F",boxShadow:"0 4px 16px rgba(0,0,0,.12)",maxWidth:380,animation:"slideIn .3s ease"}}>
          {notification.type==="warning"?"⚠️":"✅"} {notification.msg}
        </div>
      )}

      {/* NAV */}
      <nav style={{background:"rgba(30,58,74,.97)",padding:"12px 24px",display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:900,color:"#F7F3EC",marginRight:8}}>Utrecht<span style={{color:"#C8753A"}}>Now</span></span>
        <span style={{fontSize:11,color:"rgba(247,243,236,.4)",marginRight:8}}>|</span>
        {[["booking","➕ Nieuwe boeking"],["dashboard","📋 Mijn boekingen"],].map(([k,l])=>(
          <button key={k} onClick={()=>setView(k)} style={{background:view===k?"rgba(255,255,255,.12)":"none",border:"none",color:view===k?"#fff":"rgba(247,243,236,.6)",padding:"7px 13px",borderRadius:6,fontSize:13,fontWeight:600,cursor:"pointer"}}>{l}</button>
        ))}
        {selectedOrder && (
          <button onClick={()=>setView("order")} style={{background:view==="order"?"rgba(255,255,255,.12)":"none",border:"none",color:view==="order"?"#fff":"rgba(247,243,236,.6)",padding:"7px 13px",borderRadius:6,fontSize:13,fontWeight:600,cursor:"pointer"}}>
            📄 {selectedOrder.ref}
          </button>
        )}
        <div style={{marginLeft:"auto",fontSize:11,color:"rgba(247,243,236,.4)"}}>Persistente opslag actief 💾</div>
      </nav>

      {/* VIEWS */}
      <div style={{maxWidth:1100,margin:"0 auto",padding:"24px 20px"}}>
        {view === "booking" && <BookingFlow onComplete={handleNewOrder} />}
        {view === "dashboard" && <Dashboard orders={orders} onSelect={o=>{setSelectedOrder(o);setView("order")}} />}
        {view === "order" && selectedOrder && (
          <OrderDetail
            order={selectedOrder}
            onModify={(itemIdx)=>setModifyItem({orderId:selectedOrder.ref, itemIdx})}
            onCancel={handleCancel}
            onVoucher={(item)=>{setSelectedVoucher({order:selectedOrder,item});setView("voucher")}}
          />
        )}
        {view === "voucher" && selectedVoucher && (
          <VoucherView
            order={selectedVoucher.order}
            item={selectedVoucher.item}
            onBack={()=>setView("order")}
          />
        )}
      </div>

      {/* MODIFY MODAL */}
      {modifyItem && (
        <ModifyModal
          order={orders.find(o=>o.ref===modifyItem.orderId)}
          itemIdx={modifyItem.itemIdx}
          onSave={(newTime,newQty)=>handleModify(modifyItem.orderId,modifyItem.itemIdx,newTime,newQty)}
          onClose={()=>setModifyItem(null)}
        />
      )}

      <style>{`@keyframes slideIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BOOKING FLOW — customer-facing checkout
═══════════════════════════════════════════════════════════════ */
function BookingFlow({ onComplete }) {
  const [step, setStep] = useState(0);
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name:"", email:"", phone:"", wantInvoice:false, company:"", vat:"" });
  const [payMethod, setPayMethod] = useState(null);

  const totalAmount = cart.reduce((s,i) => s + (i.amount||0), 0);
  const canProceed = cart.length > 0;

  const addToCart = (provider, date, time, qty) => {
    const amount = provider.isFree ? 0 : Math.ceil(provider.price * (1+MARGIN) * qty);
    const item = {
      providerId: provider.id,
      name: provider.name,
      icon: provider.icon,
      api: provider.api,
      date, time, qty, amount,
      isFree: !!provider.isFree,
      freeNote: provider.freeNote,
      voucherCode: voucherCode(provider.id),
      isModified: false,
      cancelled: false,
      policy: CHANGE_POLICY[provider.api],
    };
    setCart(c => [...c.filter(i=>i.providerId!==provider.id), item]);
  };

  const handlePay = () => {
    const order = {
      ref: orderRef(),
      status: "CONFIRMED",
      customer,
      items: cart,
      total: totalAmount,
      payMethod,
      paidAt: new Date().toISOString(),
      emailSentAt: new Date().toISOString(),
    };
    onComplete(order);
  };

  return (
    <div>
      <div style={{marginBottom:24}}>
        <div style={{fontSize:10,fontWeight:800,letterSpacing:"3px",color:"#C8753A",textTransform:"uppercase",marginBottom:6}}>Nieuwe boeking</div>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:28,fontWeight:900,color:"#1E3A4A",marginBottom:4}}>Activiteiten kiezen &amp; afrekenen</h1>
        <p style={{fontSize:13,color:"#6B7A85"}}>Klant betaalt bij UtrechtNow. Wij bevestigen bij leveranciers. Klant ontvangt vouchers per e-mail.</p>
      </div>

      {/* STEP TABS */}
      <div style={{display:"flex",borderBottom:"2px solid #E8E2D8",marginBottom:24}}>
        {["🛒 Selecteer","👤 Gegevens","💳 Betalen"].map((s,i)=>(
          <div key={s} style={{padding:"10px 20px",fontSize:13,fontWeight:700,color:step===i?"#1E3A4A":"#6B7A85",borderBottom:step===i?"2px solid #C8753A":"2px solid transparent",marginBottom:-2,cursor:i<=step?"pointer":"default"}} onClick={()=>i<step&&setStep(i)}>{s}</div>
        ))}
      </div>

      {step === 0 && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:20}}>
          {/* PROVIDER PICKER */}
          <div>
            <div style={{fontWeight:700,color:"#1E3A4A",marginBottom:14,fontSize:14}}>Voeg activiteiten toe aan de boeking:</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {PROVIDERS.map(p => <ProviderRow key={p.id} provider={p} cart={cart} onAdd={addToCart} onRemove={id=>setCart(c=>c.filter(i=>i.providerId!==id))} />)}
            </div>
          </div>
          {/* CART */}
          <div>
            <Cart cart={cart} onRemove={id=>setCart(c=>c.filter(i=>i.providerId!==id))} />
            {canProceed && (
              <button onClick={()=>setStep(1)} style={{width:"100%",background:"#1E3A4A",color:"#fff",border:"none",borderRadius:10,padding:"14px",fontSize:14,fontWeight:700,cursor:"pointer",marginTop:12}}>
                Naar klantgegevens →
              </button>
            )}
          </div>
        </div>
      )}

      {step === 1 && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:20}}>
          <div style={{background:"#fff",borderRadius:14,padding:24,boxShadow:"0 2px 8px rgba(30,58,74,.07)"}}>
            <div style={{fontWeight:700,color:"#1E3A4A",marginBottom:16,fontSize:15}}>Klantgegevens</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div style={{display:"flex",gap:10}}>
                <Field label="Volledige naam *" value={customer.name} onChange={v=>setCustomer(c=>({...c,name:v}))} placeholder="Jan de Vries"/>
                <Field label="E-mailadres *" value={customer.email} onChange={v=>setCustomer(c=>({...c,email:v}))} placeholder="jan@email.nl" type="email"/>
              </div>
              <div style={{display:"flex",gap:10}}>
                <Field label="Telefoon" value={customer.phone} onChange={v=>setCustomer(c=>({...c,phone:v}))} placeholder="+31 6…" type="tel"/>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
                  <label style={{fontSize:10,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Taal vouchers</label>
                  <select style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}>
                    <option>Nederlands</option><option>English</option><option>Deutsch</option><option>Français</option>
                  </select>
                </div>
              </div>

              {/* WEFACT TOGGLE */}
              <div style={{background:"#F7F3EC",border:"1.5px solid #E8E2D8",borderRadius:9,padding:"14px"}}>
                <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",marginBottom:customer.wantInvoice?12:0}}>
                  <input type="checkbox" checked={customer.wantInvoice} onChange={e=>setCustomer(c=>({...c,wantInvoice:e.target.checked}))} style={{width:16,height:16,accentColor:"#2D7A4F"}}/>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:"#1E3A4A"}}>📄 Factuur ontvangen via WeFact</div>
                    <div style={{fontSize:11,color:"#6B7A85"}}>Zakelijke factuur met BTW-specificatie voor uw boekhouding</div>
                  </div>
                </label>
                {customer.wantInvoice && (
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    <div style={{display:"flex",gap:10}}>
                      <Field label="Bedrijfsnaam" value={customer.company} onChange={v=>setCustomer(c=>({...c,company:v}))} placeholder="Bedrijf BV"/>
                      <Field label="BTW-nummer" value={customer.vat} onChange={v=>setCustomer(c=>({...c,vat:v}))} placeholder="NL…B01"/>
                    </div>
                    <Field label="Projectcode (optioneel)" value={customer.project||""} onChange={v=>setCustomer(c=>({...c,project:v}))} placeholder="PROJECT-2026"/>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Cart cart={cart} readonly />
            <button onClick={()=>setStep(2)} disabled={!customer.name||!customer.email} style={{width:"100%",background:customer.name&&customer.email?"#1E3A4A":"#ccc",color:"#fff",border:"none",borderRadius:10,padding:"14px",fontSize:14,fontWeight:700,cursor:customer.name&&customer.email?"pointer":"default",marginTop:12}}>
              Naar betaling →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:20}}>
          <div style={{background:"#fff",borderRadius:14,padding:24,boxShadow:"0 2px 8px rgba(30,58,74,.07)"}}>
            <div style={{fontWeight:700,color:"#1E3A4A",marginBottom:6,fontSize:15}}>Betaling</div>
            <div style={{fontSize:12,color:"#6B7A85",marginBottom:18,lineHeight:1.65}}>
              Na betaling bevestigen wij direct bij alle leveranciers. U ontvangt per e-mail:
              <ul style={{marginTop:8,paddingLeft:18}}>
                <li>Bevestigingsoverzicht (totaaloverzicht alle activiteiten)</li>
                <li>Per activiteit een aparte voucher met unieke vouchercode</li>
                {customer.wantInvoice && <li>WeFact-factuur met BTW-specificatie</li>}
              </ul>
            </div>

            {/* PAYMENT OPTIONS */}
            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              {[
                ["ideal","🏦 iDEAL","#1E3A4A"],
                ["card","💳 Creditcard (Visa / Mastercard / Amex)","#2C526A"],
                ["applepay","🍎 Apple Pay","#1A1612"],
                ["googlepay","🤖 Google Pay","#2D7A4F"],
                ...(customer.wantInvoice ? [["sepa","🏢 Betalen na ontvangst factuur (SEPA)","#E8E2D8:color:#1A1612"]] : []),
              ].map(([k,l,bg]) => {
                const isLight = bg.includes("E8E2D8");
                return (
                  <button key={k} onClick={()=>{setPayMethod(k);handlePay();}}
                    style={{background:isLight?"#E8E2D8":bg,color:isLight?"#1A1612":"#fff",border:`2px solid ${payMethod===k?"#C8753A":"transparent"}`,borderRadius:9,padding:"13px 18px",fontSize:14,fontWeight:700,cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span>{l}</span>
                    <span style={{fontSize:16,fontWeight:900}}>€ {fmt(totalAmount)}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <Cart cart={cart} readonly total={totalAmount} customer={customer}/>
        </div>
      )}
    </div>
  );
}

/* ─── PROVIDER ROW (add to cart) ─── */
function ProviderRow({ provider, cart, onAdd, onRemove }) {
  const inCart = cart.find(i=>i.providerId===provider.id);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(null);
  const [qty, setQty] = useState(2);

  return (
    <div style={{background:"#fff",borderRadius:11,border:`2px solid ${inCart?"#2D7A4F":"#E8E2D8"}`,overflow:"hidden",transition:"border-color .15s"}}>
      <div style={{padding:"13px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}} onClick={()=>!inCart&&setOpen(o=>!o)}>
        <span style={{fontSize:22}}>{provider.icon}</span>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:700,color:"#1E3A4A"}}>{provider.name}</div>
          <div style={{fontSize:10,color:"#6B7A85"}}>{provider.api} · {provider.isFree ? provider.freeNote||"Gratis" : `€${applyMargin(provider.price)} p.p.`}</div>
        </div>
        {inCart ? (
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{background:"#E8F5E9",color:"#2D7A4F",borderRadius:5,padding:"3px 9px",fontSize:11,fontWeight:800}}>✅ {inCart.time} · {inCart.qty}×</span>
            <button onClick={e=>{e.stopPropagation();onRemove(provider.id);}} style={{background:"#FDE8E8",color:"#C0392B",border:"none",borderRadius:5,padding:"3px 9px",fontSize:11,fontWeight:800,cursor:"pointer"}}>✕ Remove</button>
          </div>
        ) : (
          <span style={{fontSize:18,color:"#C8753A",transform:open?"rotate(45deg)":"none",display:"inline-block",transition:"transform .2s"}}>+</span>
        )}
      </div>
      {open && !inCart && (
        <div style={{padding:"0 16px 16px",borderTop:"1px solid #F2EDE6"}}>
          <div style={{display:"flex",gap:10,marginTop:12,alignItems:"flex-end",flexWrap:"wrap"}}>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              <label style={{fontSize:9,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Datum</label>
              <input type="date" value={date} min={new Date().toISOString().split("T")[0]} onChange={e=>setDate(e.target.value)} style={{border:"1.5px solid #E8E2D8",borderRadius:7,padding:"7px 10px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none"}}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              <label style={{fontSize:9,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Tijdstip</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {provider.slots.map(s=>(
                  <button key={s} disabled={provider.fullSlots.includes(s)} onClick={()=>setTime(s)}
                    style={{border:`1.5px solid ${time===s?"#1E3A4A":provider.fullSlots.includes(s)?"#E8E2D8":"#E8E2D8"}`,borderRadius:5,padding:"5px 9px",fontSize:11,fontWeight:700,cursor:provider.fullSlots.includes(s)?"not-allowed":"pointer",background:time===s?"#1E3A4A":"#fff",color:time===s?"#fff":provider.fullSlots.includes(s)?"#ccc":"#1A1612",opacity:provider.fullSlots.includes(s)?.45:1}}>
                    {s}{provider.fullSlots.includes(s)?" vol":""}
                  </button>
                ))}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              <label style={{fontSize:9,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>Personen</label>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{width:26,height:26,borderRadius:"50%",border:"1.5px solid #1E3A4A",background:"#fff",color:"#1E3A4A",fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>−</button>
                <span style={{fontSize:15,fontWeight:700,minWidth:20,textAlign:"center"}}>{qty}</span>
                <button onClick={()=>setQty(q=>q+1)} style={{width:26,height:26,borderRadius:"50%",border:"1.5px solid #1E3A4A",background:"#fff",color:"#1E3A4A",fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>+</button>
              </div>
            </div>
            <button disabled={!time} onClick={()=>{onAdd(provider,date,time,qty);setOpen(false);}}
              style={{background:time?"#C8753A":"#ccc",color:"#fff",border:"none",borderRadius:8,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:time?"pointer":"not-allowed"}}>
              + Toevoegen
            </button>
          </div>
          {!provider.isFree && (
            <div style={{marginTop:8,fontSize:11,color:"#6B7A85"}}>
              Totaal: <strong style={{color:"#1E3A4A"}}>€{fmt(applyMargin(provider.price)*qty)}</strong> ({qty}× €{applyMargin(provider.price)})
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── CART ─── */
function Cart({ cart, onRemove, readonly, total, customer }) {
  const sum = total ?? cart.reduce((s,i)=>s+(i.amount||0),0);
  return (
    <div style={{background:"#fff",borderRadius:14,padding:20,boxShadow:"0 2px 8px rgba(30,58,74,.07)",position:"sticky",top:16}}>
      <div style={{fontWeight:700,color:"#1E3A4A",marginBottom:14,fontSize:14}}>🛒 Boekingoverzicht {cart.length>0&&`(${cart.length})`}</div>
      {cart.length === 0 && <div style={{fontSize:12,color:"#aaa",textAlign:"center",padding:"20px 0"}}>Nog geen activiteiten geselecteerd</div>}
      {cart.map(item=>(
        <div key={item.providerId} style={{display:"flex",alignItems:"flex-start",gap:9,padding:"9px 0",borderBottom:"1px solid #F2EDE6"}}>
          <span style={{fontSize:18,flexShrink:0}}>{item.icon}</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12,fontWeight:700,color:"#1E3A4A",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.name}</div>
            <div style={{fontSize:10,color:"#6B7A85"}}>{item.date} · {item.time} · {item.qty}×</div>
            <div style={{fontSize:9,color:"#6B7A85"}}>{item.api}</div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:13,fontWeight:700,color:"#1E3A4A"}}>{item.amount>0?`€${fmt(item.amount)}`:item.freeNote||"Gratis"}</div>
            {!readonly && <button onClick={()=>onRemove(item.providerId)} style={{background:"none",border:"none",color:"#C0392B",cursor:"pointer",fontSize:11,fontWeight:700,marginTop:2}}>✕</button>}
          </div>
        </div>
      ))}
      {sum > 0 && (
        <>
          <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0 4px",fontWeight:900,fontSize:15,color:"#1E3A4A",borderTop:"2px solid #E8E2D8",marginTop:4}}>
            <span>Totaal</span>
            <span>€ {fmt(sum)}</span>
          </div>
          <div style={{fontSize:10,color:"#6B7A85"}}>Incl. servicekosten · {customer?.wantInvoice?"WeFact factuur volgt":"Geen factuur"}</div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════════ */
function Dashboard({ orders, onSelect }) {
  return (
    <div>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:10,fontWeight:800,letterSpacing:"3px",color:"#C8753A",textTransform:"uppercase",marginBottom:4}}>Overzicht</div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:900,color:"#1E3A4A"}}>Alle boekingen ({orders.length})</h2>
      </div>

      {/* STATS */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
        {[
          ["Totaal","📋",orders.length,"#1E3A4A"],
          ["Bevestigd","✅",orders.filter(o=>o.status==="CONFIRMED").length,"#2D7A4F"],
          ["Gewijzigd","✏️",orders.filter(o=>o.status==="MODIFIED").length,"#1565C0"],
          ["Omzet","💶","€"+fmt(orders.reduce((s,o)=>s+(o.total||0),0)),"#C8753A"],
        ].map(([l,i,v,c])=>(
          <div key={l} style={{background:"#fff",borderRadius:11,padding:"16px 18px",boxShadow:"0 2px 8px rgba(30,58,74,.07)"}}>
            <div style={{fontSize:22,marginBottom:5}}>{i}</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:900,color:c}}>{v}</div>
            <div style={{fontSize:11,color:"#6B7A85",marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div style={{background:"#fff",borderRadius:14,padding:"48px 24px",textAlign:"center",color:"#aaa"}}>
          <div style={{fontSize:36,marginBottom:12}}>📭</div>
          <div style={{fontSize:14,fontWeight:600}}>Nog geen boekingen</div>
          <div style={{fontSize:12,marginTop:6}}>Maak een eerste boeking aan via "Nieuwe boeking"</div>
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {orders.map(order => {
          const st = STATUS[order.status];
          return (
            <div key={order.ref} onClick={()=>onSelect(order)}
              style={{background:"#fff",borderRadius:12,padding:"16px 20px",boxShadow:"0 2px 8px rgba(30,58,74,.07)",cursor:"pointer",display:"flex",alignItems:"center",gap:14,transition:"all .15s",border:"2px solid transparent"}}
              onMouseOver={e=>e.currentTarget.style.borderColor="#1E3A4A"}
              onMouseOut={e=>e.currentTarget.style.borderColor="transparent"}>
              <div style={{width:42,height:42,background:st.bg,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{st.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                  <span style={{fontWeight:800,color:"#1E3A4A",fontSize:14}}>{order.ref}</span>
                  <span style={{background:st.bg,color:st.color,borderRadius:4,padding:"2px 7px",fontSize:10,fontWeight:800}}>{st.label}</span>
                  {order.customer.wantInvoice && <span style={{background:"#E8F5E9",color:"#2D7A4F",borderRadius:4,padding:"2px 7px",fontSize:10,fontWeight:800}}>📄 WeFact</span>}
                </div>
                <div style={{fontSize:13,color:"#1E3A4A",fontWeight:600}}>{order.customer.name}</div>
                <div style={{fontSize:11,color:"#6B7A85"}}>{order.customer.email} · {order.items?.length} activiteit{order.items?.length!==1?"en":""}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:900,fontSize:16,color:"#1E3A4A"}}>€ {fmt(order.total||0)}</div>
                <div style={{fontSize:11,color:"#6B7A85"}}>{new Date(order.paidAt).toLocaleDateString("nl-NL")}</div>
              </div>
              <span style={{color:"#C8753A",fontSize:16}}>›</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ORDER DETAIL
═══════════════════════════════════════════════════════════════ */
function OrderDetail({ order, onModify, onCancel, onVoucher }) {
  const st = STATUS[order.status];
  const activeItems = order.items?.filter(i=>!i.cancelled) || [];
  const totalPaid = order.total || 0;

  return (
    <div>
      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#1E3A4A,#2C526A)",borderRadius:16,padding:"24px 28px",marginBottom:20,color:"#fff"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:10,fontWeight:800,letterSpacing:"2px",color:"#E8956A",textTransform:"uppercase",marginBottom:4}}>Boekingsdetail</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:28,fontWeight:900,marginBottom:6}}>{order.ref}</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <span style={{background:st.bg,color:st.color,borderRadius:5,padding:"4px 10px",fontSize:11,fontWeight:800}}>{st.icon} {st.label}</span>
              {order.customer.wantInvoice && <span style={{background:"rgba(45,122,79,.2)",color:"#86EFAC",borderRadius:5,padding:"4px 10px",fontSize:11,fontWeight:800}}>📄 WeFact factuur verstuurd</span>}
              <span style={{background:"rgba(255,255,255,.12)",color:"rgba(247,243,236,.8)",borderRadius:5,padding:"4px 10px",fontSize:11,fontWeight:600}}>💳 {({ideal:"iDEAL",card:"Creditcard",applepay:"Apple Pay",googlepay:"Google Pay",sepa:"SEPA"}[order.payMethod])||order.payMethod}</span>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"Georgia,serif",fontSize:32,fontWeight:900,color:"#E8956A"}}>€ {fmt(totalPaid)}</div>
            <div style={{fontSize:11,color:"rgba(247,243,236,.5)"}}>Betaald op {new Date(order.paidAt).toLocaleDateString("nl-NL")}</div>
          </div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:20}}>
        <div>
          {/* EMAIL CONFIRMATION PREVIEW */}
          <div style={{background:"#fff",borderRadius:14,padding:20,marginBottom:16,boxShadow:"0 2px 8px rgba(30,58,74,.07)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:36,height:36,background:"#E8F5E9",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>📧</div>
              <div>
                <div style={{fontWeight:700,color:"#1E3A4A",fontSize:14}}>E-mail verstuurd naar {order.customer.email}</div>
                <div style={{fontSize:11,color:"#6B7A85"}}>Bevestigingsoverzicht + {activeItems.length} voucher{activeItems.length!==1?"s":""} · {new Date(order.emailSentAt).toLocaleString("nl-NL")}</div>
              </div>
              <button style={{marginLeft:"auto",background:"#E8F5E9",color:"#2D7A4F",border:"none",borderRadius:7,padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>↻ Opnieuw versturen</button>
            </div>
            <div style={{background:"#F7F3EC",borderRadius:8,padding:"10px 14px",fontSize:11,color:"#6B7A85",lineHeight:1.65}}>
              <strong style={{color:"#1E3A4A"}}>Ontvangen door klant:</strong><br/>
              ① Bevestigingsoverzicht (totaaloverzicht alle geboekte activiteiten)<br/>
              {activeItems.map((item,i) => (
                <span key={i}>② Voucher #{i+1} — <strong style={{color:"#1E3A4A"}}>{item.name}</strong> · code: <code style={{background:"#E8E2D8",padding:"1px 5px",borderRadius:3,fontWeight:700}}>{item.voucherCode}</code><br/></span>
              ))}
              {order.customer.wantInvoice && <span>③ WeFact-factuur met BTW-specificatie<br/></span>}
            </div>
          </div>

          {/* ITEMS */}
          <div style={{fontWeight:700,color:"#1E3A4A",marginBottom:12,fontSize:14}}>Geboekte activiteiten</div>
          {order.items?.map((item, idx) => {
            const policy = CHANGE_POLICY[item.api];
            const hrs = hoursUntil(item.date, item.time);
            const canChange = !item.cancelled && policy.canChange && hrs > policy.deadline;
            const almostDeadline = !item.cancelled && policy.canChange && hrs > 0 && hrs < policy.deadline * 2;

            return (
              <div key={idx} style={{background:item.cancelled?"#F9F0F0":"#fff",borderRadius:12,padding:"16px 18px",marginBottom:10,boxShadow:"0 2px 8px rgba(30,58,74,.07)",border:`2px solid ${item.isModified&&!item.cancelled?"#1565C0":item.cancelled?"#C0392B":"#F2EDE6"}`,opacity:item.cancelled?.6:1}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                  <span style={{fontSize:26,flexShrink:0}}>{item.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                      <span style={{fontWeight:700,color:"#1E3A4A",fontSize:14}}>{item.name}</span>
                      {item.cancelled && <span style={{background:"#FDE8E8",color:"#C0392B",borderRadius:4,padding:"2px 7px",fontSize:10,fontWeight:800}}>❌ Geannuleerd</span>}
                      {item.isModified && !item.cancelled && <span style={{background:"#E3F2FD",color:"#1565C0",borderRadius:4,padding:"2px 7px",fontSize:10,fontWeight:800}}>✏️ Gewijzigd</span>}
                    </div>
                    <div style={{display:"flex",gap:16,fontSize:12,color:"#6B7A85",flexWrap:"wrap"}}>
                      <span>📅 {fmtDate(item.date)}</span>
                      <span>🕐 {item.time}</span>
                      <span>👥 {item.qty} persoon{item.qty!==1?"en":""}</span>
                      <span style={{fontWeight:700,color:"#1E3A4A"}}>{item.amount>0?`€ ${fmt(item.amount)}`:item.freeNote||"Gratis"}</span>
                    </div>
                    <div style={{marginTop:6,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                      <span style={{fontSize:9,fontWeight:800,background:"#F3E5F5",color:"#6A1B9A",padding:"2px 6px",borderRadius:3,textTransform:"uppercase"}}>{item.api}</span>
                      <code style={{fontSize:10,background:"#F7F3EC",border:"1px solid #E8E2D8",borderRadius:3,padding:"1px 6px",color:"#1E3A4A",fontWeight:700}}>{item.voucherCode}</code>
                      {almostDeadline && <span style={{fontSize:10,fontWeight:700,color:"#856404",background:"#FFF9E6",borderRadius:3,padding:"2px 7px"}}>⚠️ Wijzigen mogelijk t/m {policy.deadline}u voor aanvang</span>}
                    </div>
                    <div style={{marginTop:5,fontSize:10,color:"#aaa"}}>{policy.note}</div>
                  </div>
                  {/* ACTIONS */}
                  {!item.cancelled && (
                    <div style={{display:"flex",flexDirection:"column",gap:6,flexShrink:0}}>
                      <button onClick={()=>onVoucher(item)} style={{background:"#1E3A4A",color:"#fff",border:"none",borderRadius:7,padding:"7px 12px",fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                        🎟️ Voucher bekijken
                      </button>
                      {canChange ? (
                        <button onClick={()=>onModify(idx)} style={{background:"#E3F2FD",color:"#1565C0",border:"1.5px solid #1565C0",borderRadius:7,padding:"7px 12px",fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                          ✏️ Wijzigen
                        </button>
                      ) : (
                        <div style={{fontSize:9,color:"#aaa",textAlign:"center",maxWidth:100,lineHeight:1.4}}>
                          {item.cancelled ? "" : hrs <= 0 ? "Activiteit voorbij" : `Wijziging niet meer mogelijk (deadline ${policy.deadline}u)`}
                        </div>
                      )}
                      {canChange && (
                        <button onClick={()=>onCancel(order.ref,idx)} style={{background:"#FDE8E8",color:"#C0392B",border:"1.5px solid #C0392B",borderRadius:7,padding:"7px 12px",fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                          ✕ Annuleren
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* SIDEBAR */}
        <div>
          {/* CUSTOMER */}
          <div style={{background:"#fff",borderRadius:14,padding:18,marginBottom:14,boxShadow:"0 2px 8px rgba(30,58,74,.07)"}}>
            <div style={{fontWeight:700,color:"#1E3A4A",marginBottom:12,fontSize:13}}>👤 Klantgegevens</div>
            {[["Naam",order.customer.name],["E-mail",order.customer.email],["Telefoon",order.customer.phone||"—"],...(order.customer.wantInvoice?[["Bedrijf",order.customer.company||"—"],["BTW",order.customer.vat||"—"]]:[])]
              .map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #F2EDE6",fontSize:12}}>
                  <span style={{color:"#6B7A85",fontWeight:600}}>{l}</span>
                  <span style={{fontWeight:700,color:"#1E3A4A",textAlign:"right",maxWidth:"60%",wordBreak:"break-all"}}>{v}</span>
                </div>
              ))}
          </div>

          {/* PAYMENT */}
          <div style={{background:"#fff",borderRadius:14,padding:18,boxShadow:"0 2px 8px rgba(30,58,74,.07)"}}>
            <div style={{fontWeight:700,color:"#1E3A4A",marginBottom:12,fontSize:13}}>💳 Betaling</div>
            <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #F2EDE6",fontSize:12}}>
              <span style={{color:"#6B7A85",fontWeight:600}}>Methode</span>
              <span style={{fontWeight:700,color:"#1E3A4A"}}>{({ideal:"iDEAL",card:"Creditcard",applepay:"Apple Pay",googlepay:"Google Pay",sepa:"SEPA"}[order.payMethod])||"—"}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #F2EDE6",fontSize:12}}>
              <span style={{color:"#6B7A85",fontWeight:600}}>Status</span>
              <span style={{fontWeight:800,color:"#2D7A4F"}}>✅ Betaald</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",fontSize:14,fontWeight:900,color:"#1E3A4A",marginTop:4}}>
              <span>Totaal</span>
              <span>€ {fmt(totalPaid)}</span>
            </div>
            {order.customer.wantInvoice && (
              <div style={{marginTop:10,background:"#E8F5E9",borderRadius:7,padding:"8px 10px",fontSize:11,color:"#2D7A4F",fontWeight:600}}>
                📄 WeFact-factuur verstuurd naar {order.customer.email}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MODIFY MODAL
═══════════════════════════════════════════════════════════════ */
function ModifyModal({ order, itemIdx, onSave, onClose }) {
  const item = order.items[itemIdx];
  const provider = PROVIDERS.find(p=>p.id===item.providerId);
  const policy = CHANGE_POLICY[item.api];
  const [newTime, setNewTime] = useState(item.time);
  const [newQty, setNewQty] = useState(item.qty);
  const hrs = hoursUntil(item.date, item.time);

  const newAmount = provider && !provider.isFree ? Math.ceil(provider.price * (1+MARGIN) * newQty) : item.amount;
  const diff = newAmount - item.amount;

  return (
    <div style={{position:"fixed",inset:0,zIndex:800,background:"rgba(26,22,18,.65)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:"#fff",borderRadius:18,width:"100%",maxWidth:520,padding:32,boxShadow:"0 32px 80px rgba(30,58,74,.22)"}}>
        <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:900,color:"#1E3A4A",marginBottom:4}}>{item.icon} {item.name} wijzigen</div>
        <div style={{fontSize:12,color:"#6B7A85",marginBottom:6}}>Boeking {order.ref} · Huidige tijd: {item.time} · {item.qty} personen</div>

        {/* DEADLINE WARNING */}
        <div style={{background:"#FFF9E6",border:"1px solid #F59E0B",borderRadius:8,padding:"10px 13px",fontSize:12,color:"#856404",marginBottom:18}}>
          ⏱️ {policy.note}<br/>
          <strong>Nog {Math.floor(hrs)} uur</strong> tot activiteit. Deadline: {policy.deadline} uur van tevoren.
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {/* TIJDSTIP */}
          {policy.canChangeTime && (
            <div>
              <div style={{fontSize:11,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px",marginBottom:8}}>Nieuw tijdstip</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {provider?.slots.map(s=>(
                  <button key={s} disabled={provider.fullSlots.includes(s)&&s!==item.time} onClick={()=>setNewTime(s)}
                    style={{border:`2px solid ${newTime===s?"#1E3A4A":"#E8E2D8"}`,borderRadius:7,padding:"8px 14px",fontSize:13,fontWeight:700,cursor:provider.fullSlots.includes(s)&&s!==item.time?"not-allowed":"pointer",background:newTime===s?"#1E3A4A":"#fff",color:newTime===s?"#fff":provider.fullSlots.includes(s)&&s!==item.time?"#ccc":"#1A1612",opacity:provider.fullSlots.includes(s)&&s!==item.time?.4:1}}>
                    {s}{provider.fullSlots.includes(s)&&s!==item.time?" vol":""}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AANTAL */}
          {policy.canChangeQty && (
            <div>
              <div style={{fontSize:11,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px",marginBottom:8}}>Aantal personen</div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <button onClick={()=>setNewQty(q=>Math.max(1,q-1))} style={{width:36,height:36,borderRadius:"50%",border:"2px solid #1E3A4A",background:"#fff",color:"#1E3A4A",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>−</button>
                <span style={{fontSize:22,fontWeight:900,minWidth:32,textAlign:"center"}}>{newQty}</span>
                <button onClick={()=>setNewQty(q=>q+1)} style={{width:36,height:36,borderRadius:"50%",border:"2px solid #1E3A4A",background:"#fff",color:"#1E3A4A",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>+</button>
                <span style={{fontSize:12,color:"#6B7A85"}}>personen</span>
              </div>
            </div>
          )}

          {/* PRICE DIFF */}
          {diff !== 0 && (
            <div style={{background:diff>0?"#FDE8E8":"#E8F5E9",borderRadius:8,padding:"10px 14px",fontSize:13,fontWeight:700,color:diff>0?"#C0392B":"#2D7A4F"}}>
              {diff>0?`↑ Meerprijs: +€${fmt(diff)} (wordt achteraf verrekend)`:
                      `↓ Terugbetaling: -€${fmt(Math.abs(diff))} (via oorspronkelijke betaalmethode)`}
            </div>
          )}

          {/* INFO */}
          <div style={{background:"#F7F3EC",borderRadius:8,padding:"10px 14px",fontSize:11,color:"#6B7A85",lineHeight:1.65}}>
            Na wijziging: klant ontvangt <strong style={{color:"#1E3A4A"}}>automatisch een nieuwe voucher</strong> per e-mail.
            De oude voucher vervalt direct. Wij informeren {item.api} over de wijziging.
          </div>
        </div>

        <div style={{display:"flex",justifyContent:"space-between",marginTop:22}}>
          <button onClick={onClose} style={{background:"#E8E2D8",color:"#1A1612",border:"none",borderRadius:8,padding:"11px 20px",fontSize:13,fontWeight:600,cursor:"pointer"}}>Annuleren</button>
          <button onClick={()=>onSave(newTime,newQty)} style={{background:"#1565C0",color:"#fff",border:"none",borderRadius:8,padding:"11px 22px",fontSize:13,fontWeight:700,cursor:"pointer"}}>
            ✏️ Wijziging opslaan &amp; nieuwe voucher versturen
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VOUCHER VIEW (preview van wat klant ontvangt)
═══════════════════════════════════════════════════════════════ */
function VoucherView({ order, item, onBack }) {
  const policy = CHANGE_POLICY[item.api];
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <button onClick={onBack} style={{background:"#E8E2D8",border:"none",borderRadius:8,padding:"9px 16px",fontSize:13,fontWeight:600,cursor:"pointer"}}>← Terug</button>
        <div>
          <div style={{fontSize:10,fontWeight:800,letterSpacing:"2px",color:"#C8753A",textTransform:"uppercase"}}>Voucher preview</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:900,color:"#1E3A4A"}}>Dit ontvangt de klant per e-mail</div>
        </div>
        <button style={{marginLeft:"auto",background:"#1E3A4A",color:"#fff",border:"none",borderRadius:8,padding:"9px 16px",fontSize:12,fontWeight:700,cursor:"pointer"}}>
          📧 Opnieuw versturen
        </button>
      </div>

      {/* VOUCHER CARD */}
      <div style={{maxWidth:560,margin:"0 auto",background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:"0 8px 32px rgba(30,58,74,.14)"}}>
        {/* HEADER */}
        <div style={{background:"linear-gradient(135deg,#1E3A4A,#2C526A)",padding:"24px",textAlign:"center"}}>
          <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:900,color:"#F7F3EC"}}>Utrecht<span style={{color:"#C8753A"}}>Now</span></div>
          <div style={{fontSize:10,color:"rgba(247,243,236,.5)",marginTop:3,textTransform:"uppercase",letterSpacing:"2px"}}>Uw Voucher</div>
        </div>

        {/* HERO */}
        <div style={{background:"#F7F3EC",padding:"24px",textAlign:"center",borderBottom:"2px dashed #E8E2D8"}}>
          <div style={{fontSize:52,marginBottom:8}}>{item.icon}</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:"#1E3A4A",marginBottom:4}}>{item.name}</div>
          <div style={{background:"#1E3A4A",color:"#E8956A",fontFamily:"monospace",fontSize:22,fontWeight:900,padding:"8px 20px",borderRadius:8,letterSpacing:"3px",display:"inline-block",margin:"12px 0"}}>{item.voucherCode}</div>
          <div style={{fontSize:11,color:"#6B7A85",marginBottom:12}}>Toon dit aan de ingang · ook als QR-code</div>
          {/* QR PLACEHOLDER */}
          <div style={{width:80,height:80,background:"#E8E2D8",borderRadius:8,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>📱</div>
        </div>

        {/* DETAILS */}
        <div style={{padding:"20px 24px"}}>
          {[
            ["Boeking",order.ref],
            ["Op naam van",order.customer.name],
            ["Datum",fmtDate(item.date)],
            ["Tijdstip",item.time],
            ["Aantal",`${item.qty} persoon${item.qty!==1?"en":""}`],
            ["Betaald",item.amount>0?`€${fmt(item.amount)} ✓`:item.freeNote||"Gratis ✓"],
            ["Boekingssysteem",item.api],
          ].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid #F2EDE6",fontSize:13}}>
              <span style={{color:"#6B7A85",fontWeight:600}}>{l}</span>
              <span style={{fontWeight:700,color:"#1E3A4A",textAlign:"right"}}>{v}</span>
            </div>
          ))}
          {item.isModified && (
            <div style={{background:"#E3F2FD",borderRadius:7,padding:"9px 12px",fontSize:12,color:"#1565C0",fontWeight:600,margin:"12px 0"}}>
              ✏️ Gewijzigde voucher — vervangt eerder verstuurde voucher
            </div>
          )}
          <div style={{background:"#FFF9E6",border:"1px solid #F59E0B",borderRadius:8,padding:"11px 13px",marginTop:14,fontSize:12,color:"#856404"}}>
            ⏱️ <strong>Wijzigingsbeleid ({item.api}):</strong> {policy.note}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{background:"#1E3A4A",padding:"16px 20px",textAlign:"center",fontSize:10,color:"rgba(247,243,236,.45)"}}>
          UtrechtNow · KvK 12345678 · info@utrechtnow.nl · +31 (0)30 200 0000<br/>
          Voucher {item.voucherCode} · Aangemaakt {new Date().toLocaleDateString("nl-NL")}
        </div>
      </div>

      {/* MULTI-VOUCHER INFO */}
      {order.items?.filter(i=>!i.cancelled).length > 1 && (
        <div style={{maxWidth:560,margin:"16px auto 0",background:"#fff",borderRadius:12,padding:"16px 20px",boxShadow:"0 2px 8px rgba(30,58,74,.07)"}}>
          <div style={{fontWeight:700,color:"#1E3A4A",marginBottom:10,fontSize:13}}>📧 Alle vouchers in deze boeking</div>
          {order.items.filter(i=>!i.cancelled).map((it,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid #F2EDE6",fontSize:12}}>
              <span style={{fontSize:18}}>{it.icon}</span>
              <div style={{flex:1}}><strong style={{color:"#1E3A4A"}}>{it.name}</strong> · {it.time}</div>
              <code style={{background:"#F7F3EC",border:"1px solid #E8E2D8",borderRadius:3,padding:"1px 6px",fontWeight:700,fontSize:11,color:it.voucherCode===item.voucherCode?"#C8753A":"#1E3A4A"}}>{it.voucherCode}</code>
              {it.isModified && <span style={{fontSize:9,background:"#E3F2FD",color:"#1565C0",padding:"2px 5px",borderRadius:3,fontWeight:800}}>NIEUW</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── FIELD HELPER ─── */
function Field({ label, value, onChange, placeholder, type="text" }) {
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
      <label style={{fontSize:9,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".4px"}}>{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{border:"2px solid #E8E2D8",borderRadius:7,padding:"8px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none",transition:"border-color .15s"}}
        onFocus={e=>e.target.style.borderColor="#1E3A4A"} onBlur={e=>e.target.style.borderColor="#E8E2D8"}/>
    </div>
  );
}
