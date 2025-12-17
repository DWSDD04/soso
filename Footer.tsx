import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Footer: React.FC = () => {
  const footerText = useSelector((state: RootState) => state.ui.footerText);

  return (
    <footer className="text-center py-3 bg-white border-top mt-5">
      <p className="mb-0 text-secondary">
        &copy; {new Date().getFullYear()} {footerText}
      </p>
    </footer>
  );
};

export default Footer;
