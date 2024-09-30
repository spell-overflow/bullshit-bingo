"use client";

export default function newRoot() {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-background">
      {/* playfield */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-screen-md px-2">
          <div className="mx-5 grid grid-cols-5 grid-rows-5 gap-2 overflow-hidden text-sm">
            {Array.from({ length: 25 }, (_, i) => (
              <div
                key={i}
                className="flex aspect-square min-h-12 items-center justify-center rounded-sm bg-primary"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
