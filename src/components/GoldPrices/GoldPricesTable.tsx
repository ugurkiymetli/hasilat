import React from "react";
import { GoldPrice } from "@/types/gold";
import { GOLD_TYPE_NAMES } from ".";
import { currencyFormatter } from "@/utils/currencyFormatter";

interface GoldPricesTableProps {
  prices: [string, GoldPrice][];
}

const GoldPricesTable: React.FC<GoldPricesTableProps> = ({ prices }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-gray-900 border-collapse">
        <thead>
          <tr className="bg-gray-800">
            <th className="py-3 px-4 text-left border-b border-gray-700">
              Code
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
          {prices.map(([key, price]) => (
            <tr key={key} className="hover:bg-gray-800">
              <td className="py-2 px-4 border-b border-gray-700">
                {GOLD_TYPE_NAMES[key] || key}
              </td>
              <td className="py-2 px-4 text-right border-b border-gray-700">
                {currencyFormatter(Number(price.alis))}
              </td>
              <td className="py-2 px-4 text-right border-b border-gray-700">
                {currencyFormatter(Number(price.satis))}
              </td>
              <td className="py-2 px-4 border-b border-gray-700">
                {price.tarih}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoldPricesTable;
