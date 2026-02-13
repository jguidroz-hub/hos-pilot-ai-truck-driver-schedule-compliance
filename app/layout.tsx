import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HOS Pilot - AI Truck Driver Schedule & Compliance',
  description: 'Value Proposition: Solves complex Hours of Service (HOS) compliance and optimizes sleeper berth splits for truck drivers and logistics companies, reducing risks and improving rest planning.

Target Customer: Small to medium-sized trucking companies, independent owner-operators, and fleet managers in the logistics industry.

---
Category: Micro-SaaS
Target Market: Small to medium-sized trucking companies, independent owner-operators, and fleet managers in the logistics industry.
Source Hypothesis ID: 571bbf26-4aa5-4389-b49d-b8b89640b858
Promotion Type: automatic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <nav className="border-b">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
              <a href="/" className="font-bold text-lg">HOS Pilot - AI Truck Driver Schedule & Compliance</a>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-sm hover:text-blue-600">Dashboard</a>
                <a href="/pricing" className="text-sm hover:text-blue-600">Pricing</a>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
