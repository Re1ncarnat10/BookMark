import React from 'react';
import { Header } from './Components/NavBar';
import { Footer } from './Components/Footer';
import Home from "./Pages/HomePage";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <main className="flex-grow overflow-y-auto">
            <Home/>
        </main>
        <Footer/>
    </div>
  );
}