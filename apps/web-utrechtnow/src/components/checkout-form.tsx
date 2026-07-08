'use client';

import { useState, useTransition } from 'react';
import { Button, Input } from '@utrecht/ui';
import { startPayment } from '@/app/actions/pay';

export function CheckoutForm({ orderId, locale }: { orderId: string; locale: string }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [wantInvoice, setWantInvoice] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await startPayment({
        orderId,
        email,
        firstName,
        lastName,
        phone,
        wantInvoice,
        companyName: wantInvoice ? companyName : undefined,
        vatNumber: wantInvoice ? vatNumber : undefined,
        projectCode: wantInvoice ? projectCode : undefined,
        locale,
      });
      if ('error' in result) setError(result.error);
      else window.location.href = result.checkoutUrl;
    });
  }

  return (
    <form onSubmit={submit} className="space-y-4 bg-white rounded-2xl p-6 border border-canal-100 shadow-soft">
      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Voornaam *" value={firstName} onChange={setFirstName} required />
        <Field label="Achternaam *" value={lastName} onChange={setLastName} required />
      </div>
      <Field label="E-mailadres *" type="email" value={email} onChange={setEmail} required />
      <Field label="Telefoonnummer" type="tel" value={phone} onChange={setPhone} />

      <label className="flex items-center gap-2 text-sm text-canal-800 mt-4 cursor-pointer">
        <input
          type="checkbox"
          checked={wantInvoice}
          onChange={(e) => setWantInvoice(e.target.checked)}
          className="rounded"
        />
        📄 Factuur ontvangen via WeFact
      </label>

      {wantInvoice && (
        <div className="space-y-3 pl-6 border-l-2 border-terracotta-300">
          <Field label="Bedrijfsnaam *" value={companyName} onChange={setCompanyName} required />
          <Field label="BTW-nummer" value={vatNumber} onChange={setVatNumber} />
          <Field label="Projectcode" value={projectCode} onChange={setProjectCode} />
        </div>
      )}

      {error && <p className="text-sm text-red-700 bg-red-50 rounded p-2">{error}</p>}

      <Button type="submit" variant="accent" size="lg" className="w-full" disabled={pending}>
        {pending ? 'Bezig…' : 'Betalen'}
      </Button>
      <p className="text-xs text-canal-500 text-center">
        Beveiligde betaling · iDEAL · Creditcard · Apple/Google Pay · PayPal
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm text-canal-700 block mb-1">{label}</label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
    </div>
  );
}
