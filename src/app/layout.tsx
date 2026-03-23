import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Monu Rajput | Full Stack MERN Developer",
  description:
    "Portfolio of Monu Rajput — Full Stack MERN Developer specializing in MongoDB, Express.js, React, and Node.js. Building modern, scalable web applications.",
  keywords: ["MERN Stack", "Full Stack Developer", "React", "Node.js", "MongoDB", "Portfolio"],
  openGraph: {
    title: "Monu Rajput | Full Stack MERN Developer",
    description: "Building Modern Web Experiences with the MERN Stack",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
