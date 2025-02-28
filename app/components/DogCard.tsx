// app/components/DogCard.tsx
"use client";
import Link from "next/link";
import { Dog } from "./types";

export default function DogCard({ dog }: { dog: Dog }) {
    const borderColor = dog.present ? "border-green-500" : "border-red-500";
    const sexSymbol =
        dog.sex === "male" ? "♂️" : dog.sex === "female" ? "♀️" : "";
    const presentText = dog.present ? "✅ Available" : "❌ Unavailable";

    return (
        <Link
            href={`/dogs/${dog.id}`}
            className={`bg-white w-full max-w-xs mb-11 p-4 border-4 rounded-md shadow-md ${borderColor}`}
        >
            <img
                src={dog.img}
                alt={dog.name}
                className="w-full h-48 object-cover rounded mb-2"
            />
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold uppercase mb-1">
                    {dog.name} {sexSymbol}
                </h2>
                <p className="text-xl font-bold">{dog.age}y/o</p>
            </div>
            <p className="text-gray-600 capitalize">{dog.breed}</p>
            <p className="text-sm mt-1">{presentText}</p>
            <p className="text-sm text-gray-700">
                OWNER: {dog.owner.name} {dog.owner.lastName}
            </p>
        </Link>
    );
}
