import { LoginForm } from '@/components/login-form';

export const metadata = { title: 'Login — Utrecht Incoming' };

export default function LoginPage() {
  return (
    <main className="bg-incoming-navy text-white min-h-screen flex items-center">
      <div className="max-w-md mx-auto px-6 py-16 w-full">
        <p className="text-incoming-orange uppercase tracking-wide text-sm mb-2">Utrecht Incoming</p>
        <h1 className="font-serif text-4xl mb-3">Partner-Login</h1>
        <p className="text-white/80 mb-8 text-sm">
          Bei MVP: nur Ihre E-Mail-Adresse. Echte Magic-Link/2FA folgt.
        </p>
        <LoginForm />
        <p className="text-white/70 text-sm mt-6 text-center">
          Noch kein Account?{' '}
          <a href="/registrieren" className="underline text-incoming-orange">Jetzt registrieren</a>
        </p>
      </div>
    </main>
  );
}
