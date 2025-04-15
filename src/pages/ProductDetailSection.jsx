import React from 'react';

const ProductDetailsSection = ({ item }) => {
  // Split the description into an array for the "PRODUCT DETAILS" section
  const descriptionItems = item.product_details.description
    ? item.product_details.description.split(", ").map(item => item.trim())
    : [];

  // Split the material_and_care into an array for the "MATERIAL & CARE" section
  const materialCareItems = item.product_details.material_and_care
    ? item.product_details.material_and_care.split(". ").map(item => item.trim()).filter(item => item)
    : [];

  // Split the size_and_fit into an array for the "SIZE & FIT" section
  const sizeFitItems = item.product_details.size_and_fit
    ? item.product_details.size_and_fit.split(". ").map(item => item.trim()).filter(item => item)
    : [];

  // Specifications data (derived from the description and other fields)
  const specifications = {
    Fabric: materialCareItems[0]?.split(":")[1] || 'Not specified', // Extract fabric from material_and_care
    Fit: 'Relaxed Fit', // Hardcoded as per the screenshot; adjust if dynamic
    Length: 'Regular', // Hardcoded as per the screenshot; adjust if dynamic
    'Main Trend': 'Typography or Slogan Print', // Hardcoded as per the screenshot; adjust if dynamic
    'Multipack Set': 'Single', // Hardcoded as per the screenshot; adjust if dynamic
    Neck: 'Round Neck', // Hardcoded as per the screenshot; adjust if dynamic
  };

  return (
    <div className="mt-5 px-5">
      {/* PRODUCT DETAILS Section */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">PRODUCT DETAILS</h3>
        <ul className="list-none text-gray-600 text-sm">
          {descriptionItems.map((desc, idx) => (
            <li key={`${item.product_id}-desc-${idx}`} className="mb-1">
              {desc}
            </li>
          ))}
        </ul>
      </div>

      {/* SIZE & FIT Section */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">SIZE & FIT</h3>
        <p className="text-gray-600 text-sm">
          {sizeFitItems.join(' ')}
        </p>
      </div>

      {/* MATERIAL & CARE Section */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">MATERIAL & CARE</h3>
        <ul className="list-none text-gray-600 text-sm">
          {materialCareItems.map((material, idx) => (
            <li key={`${item.product_id}-material-${idx}`} className="mb-1">
              {material}
            </li>
          ))}
        </ul>
      </div>

      {/* SPECIFICATIONS Section */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">SPECIFICATIONS</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">
          {Object.entries(specifications).map(([key, value], idx) => (
            <div key={`${item.product_id}-spec-${idx}`} className="flex flex-col">
              <span className="text-gray-500">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;