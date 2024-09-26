"use client";

import React from "react";
import LoginForm from "@/components/Auth/LoginForm";
import GoldPrices from "@/components/GoldPrices";
import { useAdmin } from "@/contexts/AdminContext";

export default function Home() {
  const { isAdmin, login, logout } = useAdmin();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header>
        <h1 className="text-4xl font-bold mb-8 text-center">Hasılat</h1>
      </header>
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {!isAdmin ? (
            <LoginForm onLogin={login} />
          ) : (
            <GoldPrices onLogout={logout} />
          )}
        </div>
      </main>
      <footer className="py-4 text-center bg-gray-900">
        <a
          href="https://github.com/your-github-username/your-repo-name"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
}
