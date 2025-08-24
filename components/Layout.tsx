import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="layout">
      <header>
        <NavBar />
      </header>
      <main className="main-container"> {children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
