import React from "react";

function FooterPage() {
  return (
    <div className="flex flex-col items-center justify-center py-8 bg-stone-50 text-stone-700">
      {/* Brand Name */}
      <div className="text-4xl font-serif font-bold italic">
        Food Villa
      </div>

      {/* Tagline */}
      <p className="text-lg font-semibold text-red-400 tracking-widest mt-1">
        COOKING FOR THE SOUL
      </p>

      {/* Subtitle */}
      <p className="text-gray-500 italic text-sm mt-1">
        Be informed about the latest recipes & workshops.
      </p>

      {/* Footer Links */}
      <div className="flex justify-between w-full max-w-3xl text-sm text-gray-500 mt-4">
        <p className="cursor-pointer hover:text-gray-700">Privacy Policy</p>
        <p>© 2024 YourBrand, All Rights Reserved</p>
      </div>
    </div>
  );
}

export default FooterPage;
