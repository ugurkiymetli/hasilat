"use client";

import React, { useState, useEffect } from "react";
import LastUpdateTime from "@/components/GoldPrices/LastUpdateTime";
import GoldPricesTable from "@/components/GoldPrices/GoldPricesTable";
import {
  GOLD_TYPE_NAMES,
  GoldPricesData,
  GoldPricesResponse,
} from "@/types/gold";
import GoldTypeCheckbox from "@/components/GoldPrices/GoldTypeCheckBox";

export default function Home() {
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [goldPrices, setGoldPrices] = useState<GoldPricesData>({});
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for admin status and selected types when the component mounts
    const storedAdminStatus = localStorage.getItem("isAdmin");
    if (storedAdminStatus === "true") {
      setIsAdmin(true);
      fetchGoldPrices();
    } else {
      setIsAdmin(false);
    }

    const storedSelectedTypes = localStorage.getItem("selectedTypes");
    if (storedSelectedTypes) {
      setSelectedTypes(JSON.parse(storedSelectedTypes));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAdmin(true);
        // Store admin status in localStorage
        localStorage.setItem("isAdmin", "true");
        fetchGoldPrices();
      } else {
        alert("Incorrect password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setGoldPrices({});
    // Remove admin status from localStorage
    localStorage.removeItem("isAdmin");
  };

  const fetchGoldPrices = async () => {
    try {
      const response = await fetch("/api/gold-prices");
      if (response.ok) {
        const data: GoldPricesResponse = await response.json();
        setGoldPrices(data.data);
        setLastUpdateTime(data.meta.tarih); // Store the last update time
      } else {
        throw new Error("Failed to fetch gold prices");
      }
    } catch (error) {
      console.error("Error fetching gold prices:", error);
    }
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => {
      const newSelectedTypes = prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type];

      // Save the updated selected types to localStorage
      localStorage.setItem("selectedTypes", JSON.stringify(newSelectedTypes));

      return newSelectedTypes;
    });
  };

  const filteredGoldPrices = Object.entries(goldPrices).filter(
    ([key]) => selectedTypes.length === 0 || selectedTypes.includes(key)
  );

  if (isAdmin === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header>
        <h1 className="text-4xl font-bold mb-8 text-center">Hasılat</h1>
      </header>
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {!isAdmin ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="px-4 py-2 border rounded bg-gray-800 text-gray-200 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Submit"}
              </button>
            </form>
          ) : (
            <div className="w-full max-w-6xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Gold Prices</h2>
                  <LastUpdateTime time={lastUpdateTime} />
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
              {Object.keys(goldPrices).length > 0 ? (
                <>
                  <div className="mb-4 flex flex-wrap gap-4">
                    {Object.keys(goldPrices).map((type) => (
                      <GoldTypeCheckbox
                        key={type}
                        type={type}
                        label={GOLD_TYPE_NAMES[type] || type}
                        checked={selectedTypes.includes(type)}
                        onChange={handleTypeToggle}
                      />
                    ))}
                  </div>
                  <GoldPricesTable prices={filteredGoldPrices} />
                </>
              ) : (
                <p className="text-center">Loading gold prices...</p>
              )}
            </div>
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
