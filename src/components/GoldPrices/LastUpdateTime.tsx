import React from "react";

interface LastUpdateTimeProps {
  time: string | null;
}

const LastUpdateTime: React.FC<LastUpdateTimeProps> = ({ time }) => {
  if (!time) return null;

  return <p className="text-sm text-gray-400">Last updated: {time}</p>;
};

export default LastUpdateTime;
