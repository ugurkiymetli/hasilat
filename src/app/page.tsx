"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

export default function Home() {
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(
    Boolean(localStorage.getItem("admin") ?? false)
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAdmin(true);
        localStorage.setItem("admin", "true");
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

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("admin");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <h1 className="text-4xl font-bold text-center">Hasılat</h1>
        </div>

        {!isAdmin ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="px-4 py-2 border rounded"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Submit"}
            </button>
          </form>
        ) : (
          <p className="max-w-2xl text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod, nisi vel consectetur interdum, nisl nunc egestas nunc,
            vitae tincidunt nisl nunc euismod nunc. Sed euismod, nisi vel
            consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl
            nunc euismod nunc.
          </p>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/ugurkiymetli"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          ugurkiymetli
        </a>
        {isAdmin ? (
          <button
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            onClick={logout}
          >
            <IoIosLogOut />
            logout
          </button>
        ) : null}
      </footer>
    </div>
  );
}
