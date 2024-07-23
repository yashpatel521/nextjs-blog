import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 mt-8 shadow-inner dark:shadow-slate-400">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
