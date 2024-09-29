import React, { useState, useEffect } from "react";
import InventoryInput from "./InventoryInput";
import { currencyFormatter } from "@/utils/currencyFormatter";
import useGoldPrices from "@/hooks/useGoldPrices";
import { GOLD_TYPE_NAMES } from "@/components/GoldPrices";
import Spinner from "../UI/Spinner";

const GoldInventory: React.FC = () => {
  const [totals, setTotals] = useState<{ [key: string]: number }>({});
  const { goldPrices, fetchGoldPrices, isLoading } = useGoldPrices();

  useEffect(() => {
    fetchGoldPrices();
  }, [fetchGoldPrices]);

  useEffect(() => {
    const savedCounts = localStorage.getItem("assetCounts");
    const counts = savedCounts ? JSON.parse(savedCounts) : {};

    if (Object.keys(goldPrices).length > 0) {
      const initialTotals = Object.keys(goldPrices).reduce((acc, key) => {
        const assetType = GOLD_TYPE_NAMES[key] || key;
        const count = counts[assetType] || 0;
        acc[assetType] = count * (Number(goldPrices[key]?.alis) || 0);
        return acc;
      }, {} as { [key: string]: number });

      setTotals(initialTotals);
    }
  }, [goldPrices]);

  const handleTotalChange = (assetType: string, total: number) => {
    const newTotals = { ...totals, [assetType]: total };
    setTotals(newTotals);
  };

  const grandTotal = Object.values(totals).reduce(
    (acc, curr) => acc + (curr || 0),
    0
  );

  const inventoryItems = Object.keys(goldPrices).map((key) => ({
    unitPrice: goldPrices[key].alis,
    assetType: GOLD_TYPE_NAMES[key] || key,
  }));

  return (
    <div className="flex flex-col justify-center items-center p-6 bg-gray-800 rounded-lg shadow-md">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4 text-white">
            Total: {currencyFormatter(grandTotal)}{" "}
            <div className="text-sm text-center text-slate-400">
              (👆 this is buggy sorry 😭)
            </div>
          </h2>
          <div className="w-full max-w-md">
            {inventoryItems.map((item) => (
              <InventoryInput
                key={item.assetType}
                unitPrice={Number(item.unitPrice)}
                assetType={item.assetType}
                onTotalChange={(total) =>
                  handleTotalChange(item.assetType, total)
                }
              />
            ))}
            <InventoryInput
              key="try"
              unitPrice={1}
              assetType="Türk Lirası"
              onTotalChange={(total) => handleTotalChange("try", total)}
              increaseStep={100}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default GoldInventory;
