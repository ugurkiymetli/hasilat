import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center">
      <Link
        href="https://github.com/ugurkiymetli/hasilat"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out"
      >
        View on GitHub
      </Link>
    </footer>
  );
};

export default Footer;
