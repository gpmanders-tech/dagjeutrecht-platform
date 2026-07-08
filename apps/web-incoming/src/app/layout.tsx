import '@utrecht/ui/styles';

export const metadata = {
  title: 'Utrecht Incoming — Partner Portal',
  description: 'B2B-Portal für Reiseveranstalter — Nettopreise, Gruppenanfragen, Vouchers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-incoming-navy text-white">{children}</body>
    </html>
  );
}
