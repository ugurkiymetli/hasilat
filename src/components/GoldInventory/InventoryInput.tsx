import { currencyFormatter } from "@/utils/currencyFormatter";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface InventoryInputProps {
  unitPrice: number;
  assetType: string;
  onTotalChange: (total: number) => void;
}

const InventoryInput: React.FC<InventoryInputProps> = ({
  unitPrice,
  assetType,
  onTotalChange,
}) => {
  const [count, setCount] = useState(() => {
    const savedCounts = localStorage.getItem("assetCounts");
    const counts = savedCounts ? JSON.parse(savedCounts) : {};
    return counts[assetType] || 0;
  });

  const totalAmount = count * unitPrice;

  useEffect(() => {
    onTotalChange(totalAmount);
    const savedCounts = localStorage.getItem("assetCounts");
    const counts = savedCounts ? JSON.parse(savedCounts) : {};
    counts[assetType] = count;
    localStorage.setItem("assetCounts", JSON.stringify(counts));
  }, [count, totalAmount]);

  const handleDecrease = () => {
    if (count > 0) {
      setCount((prev: number) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setCount((prev: number) => prev + 1);
  };

  return (
    <div className="flex items-center justify-between p-4 mb-4 bg-gray-700 rounded-lg shadow-sm border border-gray-600">
      <div className="flex-1">
        <strong
          title={`Birim fiyat: ${currencyFormatter(unitPrice)}`}
          className="text-white"
        >
          {assetType}
        </strong>{" "}
        - x{count} - {currencyFormatter(totalAmount)}
      </div>
      <div className="flex items-center">
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
          onClick={handleIncrease}
        >
          <FaPlus />
        </button>
        <button
          className="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
          onClick={handleDecrease}
          disabled={count === 0}
        >
          <FaMinus />
        </button>
      </div>
    </div>
  );
};

export default InventoryInput;
