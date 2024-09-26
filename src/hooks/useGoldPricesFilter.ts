import { useState, useEffect } from "react";

export const useGoldPricesFilter = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    const storedTypes = localStorage.getItem("selectedTypes");
    if (storedTypes) {
      setSelectedTypes(JSON.parse(storedTypes));
    }
  }, []);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => {
      const newSelectedTypes = prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type];

      localStorage.setItem("selectedTypes", JSON.stringify(newSelectedTypes));
      return newSelectedTypes;
    });
  };

  return { selectedTypes, handleTypeToggle };
};
