// import React, { useState } from "react";

// const colors = [
//   { name: "None", value: "" },

//   { name: "Electric Lilac", value: "#B19CD9" },

//   {
//     name: "Gray",
//     class: "bg-gray-200",
//     selectedClass: "ring-gray-400",
//     value: "#6D7278",
//   },
//   {
//     name: "Blue",
//     class: "bg-blue-600",
//     selectedClass: "ring-blue-400",
//     value: "#2563EB",
//   },
//   {
//     name: "Purple",
//     class: "bg-purple-600",
//     selectedClass: "ring-purple-400",
//     value: "#9333EA",
//   },
//   {
//     name: "Green",
//     class: "bg-green-600",
//     selectedClass: "ring-green-400",
//     value: "#16A34A",
//   },
//   {
//     name: "Red",
//     class: "bg-red-600",
//     selectedClass: "ring-red-400",
//     value: "#DC2626",
//   },
//   {
//     name: "Yellow",
//     class: "bg-yellow-500",
//     selectedClass: "ring-yellow-400",
//     value: "#EAB308",
//   },
//   {
//     name: "Pink",
//     class: "bg-pink-500",
//     selectedClass: "ring-pink-400",
//     value: "#EC4899",
//   },
//   {
//     name: "Teal",
//     class: "bg-teal-500",
//     selectedClass: "ring-teal-400",
//     value: "#14B8A6",
//   },
//   {
//     name: "Orange",
//     class: "bg-orange-500",
//     selectedClass: "ring-orange-400",
//     value: "#F97316",
//   },
//   {
//     name: "Indigo",
//     class: "bg-indigo-600",
//     selectedClass: "ring-indigo-400",
//     value: "#4F46E5",
//   },
// ];

// const ColorPicker = ({ selectedColor, onChange }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleColorSelect = (color) => {
//     onChange(color);
//     setIsOpen(false); // Close the dropdown after selection
//   };

//   return (

//     <div className="relative flex items-center m-2 z-20">
//       <button
//         onClick={handleToggleDropdown}
//         className="hidden sm:block rounded-lg border-2 border-blue-800 px-5 py-2 bg-white text-blue-800 font-medium
// transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:bg-blue-50 hover:text-blue-900"

//         style={{ backgroundColor: selectedColor || "transparent" }}
//       >
//         <span className="">Color Theme</span>
//       </button>
//       {/* <button
//         onClick={handleToggleDropdown}
//         className="sm:hidden rounded-lg border-2 border-blue-800 px-5 py-2 font-bold bg-white text-blue-800"
//         style={{ backgroundColor: selectedColor || "transparent" }}
//       >
//         Color
//       </button> */}
//       {isOpen && (
//         <div className=" absolute top-10 mt-2 bg-white border rounded-3xl shadow-lg z-50">
//           <div className="grid grid-cols-3 gap-4 p-5 bg-white rounded-3xl">
//             {colors.map((color, index) => {
//               const isSelected = selectedColor === color.value;
//               const hoverStyle = {
//                 backgroundColor: color.value,
//                 borderColor: isSelected ? "black" : "gray",
//               };

//               return (
//                 <div
//                   key={index}
//                   onClick={() => handleColorSelect(color.value)}
//                   className={`w-8 h-8 rounded-full cursor-pointer border transition-all duration-300 ease-in-out ${
//                     isSelected
//                       ? "border-blue-800 shadow-lg shadow-blue-500"
//                       : "border-gray-300"
//                   } hover:border-black`}
//                   style={hoverStyle}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ColorPicker;

import { Palette } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

// Prioritized professional colors first
const colors = [
  { name: "None", value: "" },
  {
    name: "Blue",
    class: "bg-blue-600",
    selectedClass: "ring-blue-400",
    value: "#2563EB",
  },
  {
    name: "Indigo",
    class: "bg-indigo-600",
    selectedClass: "ring-indigo-400",
    value: "#4F46E5",
  },
  {
    name: "Purple",
    class: "bg-purple-600",
    selectedClass: "ring-purple-400",
    value: "#9333EA",
  },
  {
    name: "Teal",
    class: "bg-teal-500",
    selectedClass: "ring-teal-400",
    value: "#14B8A6",
  },
  {
    name: "Green",
    class: "bg-green-600",
    selectedClass: "ring-green-400",
    value: "#16A34A",
  },
  {
    name: "Gray",
    class: "bg-gray-200",
    selectedClass: "ring-gray-400",
    value: "#6D7278",
  },
  { name: "Electric Lilac", value: "#B19CD9" },
  {
    name: "Red",
    class: "bg-red-600",
    selectedClass: "ring-red-400",
    value: "#DC2626",
  },
  {
    name: "Yellow",
    class: "bg-yellow-500",
    selectedClass: "ring-yellow-400",
    value: "#EAB308",
  },
  {
    name: "Pink",
    class: "bg-pink-500",
    selectedClass: "ring-pink-400",
    value: "#EC4899",
  },
  {
    name: "Orange",
    class: "bg-orange-500",
    selectedClass: "ring-orange-400",
    value: "#F97316",
  },
];

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown open/close
  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Color selection
  const handleColorSelect = (color) => {
    onChange(color);
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // <div ref={dropdownRef} className="relative flex items-center m-2 z-20">
    //   <button
    //     onClick={handleToggleDropdown}
    //     className="rounded-lg border-2 border-[#002a48] px-5 py-2 bg-white text-[#002a48] font-medium 
    //     transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:bg-blue-50 hover:text-blue-900"
    //     style={{ backgroundColor: selectedColor || "transparent" }}
    //   >
    //     <span>Color Theme</span>
    //   </button>

    //   {isOpen && (
    //     <div className="absolute top-12 mt-1 bg-white border rounded-3xl shadow-lg z-50 w-48">
    //       <div className="grid grid-cols-4 gap-4 p-4 rounded-3xl">
    //         {colors.map((color, index) => {
    //           const isSelected = selectedColor === color.value;
    //           return (
    //             <div
    //               key={index}
    //               onClick={() => handleColorSelect(color.value)}
    //               className={`w-7 h-7 rounded-full cursor-pointer border transition-all duration-200 ease-in-out 
    //                 ${
    //                   isSelected
    //                     ? "border-[#002a48] shadow-md shadow-blue-300"
    //                     : "border-[#002a48]"
    //                 }
    //                 hover:scale-110`}
    //               style={{ backgroundColor: color.value || "white" }}
    //               title={color.name}
    //             />
    //           );
    //         })}
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div ref={dropdownRef} className="relative flex items-center m-2 z-20">
  <button
    onClick={handleToggleDropdown}
    className="rounded-lg border-2 border-[#002a48] px-4 py-2 bg-white text-[#002a48] font-medium 
    transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:bg-blue-50 hover:text-blue-900 flex items-center gap-2"
    style={{ backgroundColor: selectedColor || "transparent" }}
  >
    <Palette size={18} />
    <span className="hidden md:inline">
      Color Theme</span>
  </button>

  {isOpen && (
    <div className="absolute top-12 mt-1 bg-white border rounded-3xl shadow-lg z-50 w-48">
      <div className="grid grid-cols-4 gap-4 p-4 rounded-3xl">
        {colors.map((color, index) => {
          const isSelected = selectedColor === color.value;
          return (
            <div
              key={index}
              onClick={() => handleColorSelect(color.value)}
              className={`w-7 h-7 rounded-full cursor-pointer border transition-all duration-200 ease-in-out 
                ${
                  isSelected
                    ? "border-[#002a48] shadow-md shadow-blue-300"
                    : "border-[#002a48]"
                }
                hover:scale-110`}
              style={{ backgroundColor: color.value || "white" }}
              title={color.name}
            />
          );
        })}
      </div>
    </div>
  )}
</div>
  );
};

export default ColorPicker;
