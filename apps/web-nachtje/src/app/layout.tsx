import '@utrecht/ui/styles';

export const metadata = {
  title: 'Nachtje Utrecht — hotel + activiteit-arrangementen',
  description: 'Overnacht in Utrecht en boek hotel, activiteit en diner in één pakket.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
