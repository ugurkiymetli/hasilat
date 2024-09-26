import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
