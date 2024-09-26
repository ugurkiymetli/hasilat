import React, { useEffect } from "react";
import LastUpdateTime from "./LastUpdateTime";
import GoldTypeCheckbox from "./GoldTypeCheckBox";
import GoldPricesTable from "./GoldPricesTable";
import useGoldPrices from "@/hooks/useGoldPrices";
import { useGoldPricesFilter } from "@/hooks/useGoldPricesFilter";
import { IoIosLogOut } from "react-icons/io";

export const GOLD_TYPE_NAMES: { [key: string]: string } = {
  ALTIN: "Gram (24 Ayar)",
  AYAR22: "Gram (22 Ayar)",
  CEYREK_YENI: "Çeyrek (Yeni)",
  CEYREK_ESKI: "Çeyrek (Eski)",
  YARIM_YENI: "Yarım (Yeni)",
  YARIM_ESKI: "Yarım (Eski)",
  TEK_YENI: "Tam (Yeni)",
  TEK_ESKI: "Tam (Eski)",
  ATA_YENI: "Ata (Yeni)",
  ATA_ESKI: "Ata (Eski)",
  USDTRY: "USD/TRY",
  EURTRY: "EUR/TRY",
};

interface GoldPricesProps {
  onLogout: () => void;
}

const GoldPrices: React.FC<GoldPricesProps> = ({ onLogout }) => {
  const { goldPrices, lastUpdateTime, isLoading, error, fetchGoldPrices } =
    useGoldPrices();
  const { selectedTypes, handleTypeToggle } = useGoldPricesFilter();

  useEffect(() => {
    fetchGoldPrices();
  }, [fetchGoldPrices]);

  const filteredGoldPrices = Object.entries(goldPrices).filter(
    ([key]) => selectedTypes.length === 0 || selectedTypes.includes(key)
  );

  return (
    <div className="w-full max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Gold Prices</h2>
          <LastUpdateTime time={lastUpdateTime} />
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          <IoIosLogOut />
        </button>
      </div>
      {isLoading ? (
        <p className="text-center">Loading gold prices...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
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
      )}
    </div>
  );
};

export default GoldPrices;
