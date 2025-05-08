// import Image from "next/image";

// const countries = [
//   { id: "us", name: "United States", flag: "/flags/us.png" },
//   { id: "ca", name: "Canada", flag: "/flags/ca.png" },
//   { id: "uk", name: "United Kingdom", flag: "/flags/uk.png" },
//   { id: "de", name: "Germany", flag: "/flags/de.png" },
//   { id: "au", name: "Australia", flag: "/flags/au.png" },
//   { id: "fr", name: "France", flag: "/flags/fr.png" },
//   { id: "nl", name: "Netherlands", flag: "/flags/nl.png" },
//   { id: "ie", name: "Ireland", flag: "/flags/ie.png" },
//   { id: "sg", name: "Singapore", flag: "/flags/sg.png" },
// ];

// export default function CountrySelection({ onBack, onSelectCountry }) {
//   return (
//     <div className="min-h-screen bg-[#fefcf9] flex flex-col">
//       <main className="flex-1 flex flex-col items-center px-4 py-10">
//         <div className="max-w-3xl text-center mb-10">
//           <h1 className="text-3xl md:text-4xl font-bold text-[#002a48] leading-snug mb-2">
//             For Which country to tailor your resume to its specific
//             requirements.
//           </h1>
//           <p className="text-md md:text-lg text-[#002a48] ">
//             Select the country to tailor your resume to its specific
//             requirements.
//           </p>
//         </div>

//         <div className="bg-[#fefcf9] rounded-t-3xl py-10 px-4 w-full max-w-6xl">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {countries.map((country) => (
//               <button
//                 key={country.id}
//                 onClick={() => onSelectCountry(country.id)}
//                 className="p-5 rounded-2xl shadow-sm border border-gray-200 bg-white hover:shadow-md flex flex-col items-center transition-all"
//               >
//                 <Image
//                   src={country.flag}
//                   alt={country.name}
//                   width={48}
//                   height={30}
//                   className="mb-4"
//                 />
//                 <span className="text-[#002a48] font-semibold text-lg mb-2">
//                   {country.name}
//                 </span>
//                 <span className="text-xl text-gray-500">→</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
import Image from "next/image";

const countries = [
  { id: "us", name: "United States", flag: "/flags/us.png" },
  { id: "ca", name: "Canada", flag: "/flags/ca.png" },
  { id: "in", name: "India", flag: "/flags/in.png" },
  { id: "uk", name: "United Kingdom", flag: "/flags/uk.png" },
  { id: "de", name: "Germany", flag: "/flags/de.png" },
  { id: "au", name: "Australia", flag: "/flags/au.png" },
  { id: "fr", name: "France", flag: "/flags/fr.png" },
  { id: "nl", name: "Netherlands", flag: "/flags/nl.png" },
  { id: "ie", name: "Ireland", flag: "/flags/ie.png" },
  { id: "sg", name: "Singapore", flag: "/flags/sg.png" },
];

export default function CountrySelection({ onBack, onSelectCountry }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex flex-col">
      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <div className="max-w-3xl text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#002a48] hover:text-orange-500 leading-snug mb-2">
            For which country to tailor your resume to its specific
            requirements.
          </h1>
          <p className="text-md md:text-lg text-[#002a48] hover:text-orange-500 ">
            Select the country to tailor your resume to its specific
            requirements.
          </p>
        </div>

        <div className="py-10 px-4 w-full max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              ...countries.filter((c) => ["us", "ca", "in"].includes(c.id)),
              ...countries.filter((c) => !["us", "ca", "in"].includes(c.id)),
            ].map((country) => (
              <button
                key={country.id}
                onClick={() => onSelectCountry(country.id)}
                className="p-5 rounded-2xl shadow-md border border-gray-200 bg-white hover:bg-[#002a48] hover:text-white hover:shadow-xl flex flex-col items-center transition-all duration-200 group"
              >
                <Image
                  src={country.flag}
                  alt={country.name}
                  width={48}
                  height={30}
                  className="mb-4 transition-transform duration-200 group-hover:scale-105"
                />
                <span className="text-[#002a48] group-hover:text-white font-semibold text-lg mb-2 transition-colors duration-200">
                  {country.name}
                </span>
                <span className="text-xl text-gray-400 group-hover:text-orange-400 transition-colors duration-200">
                  →
                </span>
              </button>
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={onBack}
              className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700 
              font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
