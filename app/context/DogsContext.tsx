// app/context/DogsContext.tsx
"use client";
import { createContext, useState, useEffect, useRef, ReactNode } from "react";
import type { Dog } from "../components/types";

interface DogsContextType {
    dogs: Dog[];
    loading: boolean;
    error: string | null;
}

export const DogsContext = createContext<DogsContextType | undefined>(
    undefined
);

export function DogsProvider({ children }: { children: ReactNode }) {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetch("https://majazocom.github.io/Data/dogs.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch dogs");
                }
                return res.json();
            })
            .then((data: Dog[]) => {
                const dogsWithId = data.map((dog, index) => ({
                    ...dog,
                    id: index,
                }));
                setDogs(dogsWithId);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <DogsContext.Provider value={{ dogs, loading, error }}>
            {children}
        </DogsContext.Provider>
    );
}
