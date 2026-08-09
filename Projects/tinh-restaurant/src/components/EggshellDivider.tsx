import React from "react";

interface EggshellDividerProps {
  className?: string;
}

export function EggshellDivider({ className = "" }: EggshellDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full flex items-center justify-center my-12 md:my-20 px-6 ${className}`}
    >
      <div className="relative w-full max-w-4xl flex items-center justify-center">
        {/* Left hairline */}
        <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#B98A45]/40 to-[#B98A45]" />

        {/* Center Eggshell Inlay Mosaic Pattern */}
        <div className="px-4 py-1 flex items-center space-x-2 shrink-0">
          <svg
            width="120"
            height="16"
            viewBox="0 0 120 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#B98A45]"
          >
            {/* Center brass hairline segment */}
            <line x1="0" y1="8" x2="120" y2="8" stroke="#B98A45" strokeWidth="0.75" />

            {/* Tiny eggshell inlay fragments (Khảm vỏ trứng) */}
            {/* Fragment 1 */}
            <polygon points="20,7 24,5 26,8 22,10" fill="#EDE6D8" opacity="0.9" />
            {/* Fragment 2 */}
            <polygon points="32,8 35,6 38,9 34,11" fill="#D9D0C1" opacity="0.7" />
            {/* Fragment 3 */}
            <polygon points="46,5 50,7 48,11 44,9" fill="#EDE6D8" opacity="0.95" />
            {/* Fragment 4 - Center piece */}
            <polygon points="56,7 60,4 64,8 61,12 57,10" fill="#EDE6D8" opacity="1" />
            <polygon points="61,4 65,6 63,8" fill="#B98A45" opacity="0.8" />
            {/* Fragment 5 */}
            <polygon points="72,6 76,8 74,11 70,9" fill="#EDE6D8" opacity="0.95" />
            {/* Fragment 6 */}
            <polygon points="84,8 87,6 90,9 86,11" fill="#D9D0C1" opacity="0.7" />
            {/* Fragment 7 */}
            <polygon points="96,7 100,5 102,8 98,10" fill="#EDE6D8" opacity="0.9" />
          </svg>
        </div>

        {/* Right hairline */}
        <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent via-[#B98A45]/40 to-[#B98A45]" />
      </div>
    </div>
  );
}

export function EggshellUnderline({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative w-48 md:w-64 mx-auto my-3 ${className}`}>
      <svg
        width="100%"
        height="12"
        viewBox="0 0 200 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        {/* Main brass line */}
        <line x1="0" y1="6" x2="200" y2="6" stroke="#B98A45" strokeWidth="0.8" />
        
        {/* Eggshell mosaic inlay bits along underline */}
        <polygon points="70,5 74,3 76,6 72,8" fill="#EDE6D8" opacity="0.9" />
        <polygon points="88,4 93,6 90,9 86,7" fill="#EDE6D8" opacity="1" />
        <polygon points="96,5 100,3 104,7 100,9" fill="#D9D0C1" opacity="0.85" />
        <polygon points="108,6 113,4 115,8 110,9" fill="#EDE6D8" opacity="0.9" />
        <polygon points="126,5 129,3 131,6 128,8" fill="#EDE6D8" opacity="0.8" />
      </svg>
    </div>
  );
}
