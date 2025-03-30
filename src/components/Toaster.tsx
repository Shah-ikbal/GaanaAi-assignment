"use client";
import { useState, useEffect } from "react";

interface ToasterProps {
  message: string;
  type?: "success" | "error" | "warning";
  duration?: number;
  onClose: () => void;
}

const Toaster = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}: ToasterProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-yellow-500";

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 text-white rounded-lg shadow-lg ${bgColor}`}
    >
      {message}
    </div>
  );
};

export default Toaster;
