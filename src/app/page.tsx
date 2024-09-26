"use client";

import React from "react";
import LoginForm from "@/components/Auth/LoginForm";
import GoldPrices from "@/components/GoldPrices";
import { useAdmin } from "@/contexts/AdminContext";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Spinner from "@/components/UI/Spinner";
import GoldInventory from "@/components/GoldInventory";

export default function Home() {
  const { isAdmin, isLoading, login, logout } = useAdmin();
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header title="Hasılat" />
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {isLoading ? (
            <Spinner />
          ) : isAdmin ? (
            <>
              <GoldPrices onLogout={logout} />
              <GoldInventory />
            </>
          ) : (
            <LoginForm onLogin={login} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
