import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Picked AI Visibility Scanner',
  description: '14-day MVP AI Visibility & GEO Scanner. Audits business brand visibility, citations, and competitor share of voice across ChatGPT (OpenAI), Google Gemini, and Google AI Overviews in English and Estonian.',
  openGraph: {
    title: 'Picked AI Visibility Scanner',
    description: '14-day MVP AI Visibility & GEO Scanner. Audits business brand visibility, citations, and competitor share of voice across ChatGPT (OpenAI), Google Gemini, and Google AI Overviews in English and Estonian.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Picked AI Visibility Scanner',
    description: '14-day MVP AI Visibility & GEO Scanner. Audits business brand visibility, citations, and competitor share of voice across ChatGPT (OpenAI), Google Gemini, and Google AI Overviews in English and Estonian.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <Toaster richColors position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
