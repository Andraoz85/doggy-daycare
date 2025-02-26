// Get data with fetch
// Manage loading and error states
// Send data to child components

"use client";
import { useState, useEffect, useRef } from "react";
import { Dog } from "../components/types";
import DogList from "../components/DogList";

export default function DogsPage() {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [tempSearch, setTempSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [availabilityFilter, setAvailabilityFilter] = useState<
        "all" | "available" | "unavailable"
    >("all");
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return; // prevent double-fetch
        hasFetched.current = true; // set to true after first fetch

        console.log("Fetching dogs...");
        fetch("https://majazocom.github.io/Data/dogs.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch dogs");
                }
                return res.json();
            })
            .then((data: Dog[]) => {
                const dogsId = data.map((dog, index) => ({
                    ...dog,
                    id: index,
                }));
                setDogs(dogsId);
                setLoading(false);
                console.log("Fetched dogs:", data);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    function handleSearchClick() {
        setSearchQuery(tempSearch);
    }

    function handleFilterChange(value: "all" | "available" | "unavailable") {
        setAvailabilityFilter(value);
        setShowFilterDropdown(false); // close dropdown
    }

    // Filter dogs by search query and availability
    const filteredDogs = dogs.filter((dog) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            dog.name.toLowerCase().includes(query) ||
            dog.breed.toLowerCase().includes(query);

        const matchesFilter =
            availabilityFilter === "all" ||
            (availabilityFilter === "available" && dog.present) ||
            (availabilityFilter === "unavailable" && !dog.present);
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return <p className="text-center mt-10">Loading dogs...</p>;
    }
    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <main className="min-h-screen bg-yellow-200 p-4 relative">
            <h1 className="text-3xl font-bold text-center text-black mb-6 ">
                OUR DOGS
            </h1>

            {/* todo add search and filter */}
            <div className="flex justify-center items-center gap-4 mb-6">
                {/* Sökfält + knapp */}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search by name or breed"
                        value={tempSearch}
                        onChange={(e) => setTempSearch(e.target.value)}
                        className="px-3 py-2 rounded shadow w-full max-w-xs"
                    />
                    <button
                        onClick={handleSearchClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Search
                    </button>
                </div>

                {/* Filter-knapp + dropdown */}
                <div className="relative">
                    <button
                        onClick={() =>
                            setShowFilterDropdown(!showFilterDropdown)
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Filter
                    </button>

                    {showFilterDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
                            <button
                                onClick={() => handleFilterChange("all")}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                All
                            </button>
                            <button
                                onClick={() => handleFilterChange("available")}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Available
                            </button>
                            <button
                                onClick={() =>
                                    handleFilterChange("unavailable")
                                }
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Unavailable
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Card with dog info */}
            <DogList dogs={filteredDogs} />
        </main>
    );
}
