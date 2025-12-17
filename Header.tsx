import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Header: React.FC = () => {
  const title = useSelector((state: RootState) => state.ui.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <header className="py-3 bg-white border-bottom text-center">
      <h1 className="fw-bold text-pink-600">{title}</h1>
    </header>
  );
};

export default Header;
