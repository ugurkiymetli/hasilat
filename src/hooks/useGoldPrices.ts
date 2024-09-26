import { useState, useCallback } from "react";
import { GoldPricesData, GoldPricesResponse } from "@/types/gold";

const useGoldPrices = () => {
  const [goldPrices, setGoldPrices] = useState<GoldPricesData>({});
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGoldPrices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/gold-prices");
      if (!response.ok) {
        throw new Error("Failed to fetch gold prices");
      }
      const data: GoldPricesResponse = await response.json();
      setGoldPrices(data.data);
      setLastUpdateTime(data.meta.tarih);
    } catch (error) {
      setError("Error fetching gold prices");
      console.error("Error fetching gold prices:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { goldPrices, lastUpdateTime, isLoading, error, fetchGoldPrices };
};

export default useGoldPrices;
