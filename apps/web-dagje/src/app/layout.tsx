import '@utrecht/ui/styles';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { ChatWidget } from '../components/chat-widget';

export const metadata = {
  title: 'DagjeUtrecht.nl - stel je dag Utrecht zelf samen',
  description:
    'Team-uitjes, studentenclubjes, schoolgroepen, gezinnen en vrijgezellenfeesten. Kies uit voorbeeldprogramma\'s of stel zelf samen met onze AI-gids.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-screen bg-white text-canal-900 flex flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <ChatWidget />
      </body>
    </html>
  );
}
