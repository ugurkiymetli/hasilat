import { NextResponse } from "next/server";

const ALLOWED_TYPES = [
  "ALTIN",
  "CEYREK_YENI",
  "CEYREK_ESKI",
  "YARIM_YENI",
  "YARIM_ESKI",
  "TEK_YENI",
  "TEK_ESKI",
  "ATA_YENI",
  "ATA_ESKI",
  "AYAR22",
  "USDTRY",
  "EURTRY",
];

export async function GET() {
  try {
    const response = await fetch(
      "https://canlipiyasalar.haremaltin.com/tmp/altin.json?dil_kodu=tr",
      {
        headers: {
          accept: "*/*",
          "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
          "if-modified-since": "Thu, 26 Sep 2024 08:42:29 GMT",
          "if-none-match": 'W/"66f51e75-1f59"',
          "sec-ch-ua":
            '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          cookie: "PHPSESSID=2eorn96g3i62ve906crnfeh6va",
          Referer: "https://canlipiyasalar.haremaltin.com/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch gold prices");
    }

    const data = await response.json();

    // Filter the data to include only the allowed types
    const filteredData = Object.fromEntries(
      Object.entries(data.data).filter(([key]) => ALLOWED_TYPES.includes(key))
    );

    return NextResponse.json({ meta: data.meta, data: filteredData });
  } catch (error) {
    console.error("Error fetching gold prices:", error);
    return NextResponse.json(
      { error: "Failed to fetch gold prices" },
      { status: 500 }
    );
  }
}
