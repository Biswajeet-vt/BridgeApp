import { useState, useEffect } from "react";

export default function Carousel({ slides ,time }: any) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length); // Loop back to the first slide
    }, time); // Change slide every 1 second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [slides.length]);

  return (
    <div className="overflow-hidden relative">
      {/* Slides Container */}
      <div
        className={`flex transition ease-out duration-500`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s: any, index: number) => (
          <img key={index} src={s} className="w-full h-full object-cover" alt={`Slide ${index + 1}`} />
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3.5 py-14 flex justify-center gap-3 w-full">
        {slides.map((_: any, i: number) => (
          <div
            onClick={() => setCurrent(i)}
            key={`circle-${i}`}
            className={`rounded-full w-2 h-2 cursor-pointer ${
              i === current ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}






