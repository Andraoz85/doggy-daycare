// app/dogs/page.tsx

"use client";
import { useState, useContext } from "react";
import { DogsContext } from "../context/DogsContext";
import DogList from "../components/DogList";

export default function DogsPage() {
    const dogsCtx = useContext(DogsContext);
    if (!dogsCtx) {
        return <p>DogsContext not found.</p>;
    }
    
    const { dogs, loading, error } = dogsCtx;

    const [tempSearch, setTempSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [availabilityFilter, setAvailabilityFilter] = useState<
        "all" | "available" | "unavailable"
    >("all");
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);


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

            <div className="flex justify-center items-center gap-4 mb-6">
                {/* search-field + button */}
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

                {/* Filter-button + dropdown */}
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

            <DogList dogs={filteredDogs} />
        </main>
    );
}
