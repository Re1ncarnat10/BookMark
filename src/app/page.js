import React from 'react';
import Home from "./Pages/HomePage";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
        <main className="flex-grow overflow-y-auto">
            <Home/>
        </main>
    </div>
  );
}