// app/components/DogList.tsx
"use client";
import type { Dog } from "./types";
import DogCard from "./DogCard";

export default function DogList({ dogs }: { dogs: Dog[] }) {
    return (
        <div className="flex flex-col items-center gap-4">
            {dogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
            ))}
        </div>
    );
}
