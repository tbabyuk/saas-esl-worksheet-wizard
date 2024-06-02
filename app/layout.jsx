import { Lora, Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { ClerkProvider } from "@clerk/nextjs";


const lora = Lora({subsets: ["latin"], variable: "--font-lora"});
const roboto = Roboto({subsets: ["latin"], weight: ["100", "300", "400"], variable: "--font-roboto"});

export const metadata = {
  title: "ESL Worksheet Wizard",
  description: "Make fully-customizable worksheets in minutes with our AI-powered tools",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${lora.variable} ${roboto.variable}`}>
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
