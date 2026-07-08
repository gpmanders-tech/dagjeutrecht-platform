import { RegistrationForm } from '@/components/registration-form';

export const metadata = { title: 'Partner registrieren — Utrecht Incoming' };

export default function RegisterPage() {
  return (
    <main className="bg-incoming-navy text-white min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-incoming-orange uppercase tracking-wide text-sm mb-2">Utrecht Incoming</p>
        <h1 className="font-serif text-4xl mb-3">Als Partner registrieren</h1>
        <p className="text-white/80 mb-10">
          Reiseveranstalter, DMC und Schulreise-Spezialisten — bewerben Sie sich um Zugang zu unseren Partnertarifen.
          Wir prüfen jede Anfrage manuell innerhalb von 2 Werktagen.
        </p>
        <RegistrationForm />
      </div>
    </main>
  );
}
