"use client";

import {
  GOLD_TYPE_NAMES,
  GoldPricesData,
  GoldPricesResponse,
} from "@/types/gold";
import { useState, useEffect } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [goldPrices, setGoldPrices] = useState<GoldPricesData>({});
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    // Check localStorage for admin status when the component mounts
    const storedAdminStatus = localStorage.getItem("isAdmin");
    if (storedAdminStatus === "true") {
      setIsAdmin(true);
      fetchGoldPrices();
    } else {
      setIsAdmin(false);
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
      } else {
        throw new Error("Failed to fetch gold prices");
      }
    } catch (error) {
      console.error("Error fetching gold prices:", error);
    }
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
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
    <div className="min-h-screen bg-black text-white p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Hasılat</h1>

        {!isAdmin ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
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
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gold Prices</h2>
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
                    <label key={type} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeToggle(type)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">
                        {GOLD_TYPE_NAMES[type] || type}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full bg-gray-900 border-collapse">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="py-3 px-4 text-left border-b border-gray-700">
                          Type
                        </th>
                        <th className="py-3 px-4 text-right border-b border-gray-700">
                          Buy
                        </th>
                        <th className="py-3 px-4 text-right border-b border-gray-700">
                          Sell
                        </th>
                        <th className="py-3 px-4 text-left border-b border-gray-700">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGoldPrices.map(([key, price]) => (
                        <tr key={key} className="hover:bg-gray-800">
                          <td className="py-2 px-4 border-b border-gray-700">
                            {GOLD_TYPE_NAMES[key] || key}
                          </td>
                          <td className="py-2 px-4 text-right border-b border-gray-700">
                            {price.alis}
                          </td>
                          <td className="py-2 px-4 text-right border-b border-gray-700">
                            {price.satis}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-700">
                            {price.tarih}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="text-center">Loading gold prices...</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
