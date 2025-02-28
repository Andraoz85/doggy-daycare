// app/dogs/[id]/page.tsx

"use client";
import { useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { DogsContext } from "../../context/DogsContext";
import Link from "next/link";

export default function DogDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const dogsCtx = useContext(DogsContext);

    if (!dogsCtx) {
        return <p>DogsContext not found.</p>;
    }

    const { dogs, error, loading } = dogsCtx;

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const dog = dogs.find((d) => d.id.toString() === id);
    if (!dog) {
        return (
            <div className="text-center mt-10">
                <p className="mb-4">Dog not found.</p>
                <Link
                    href="/dogs"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
                >Go Back</Link>
            </div>
        );
    }

    // manage toggle of present state
    const [isPresent, setIsPresent] = useState(dog.present);

    // find index for navigation
    const dogIndex = dogs.findIndex((d) => d.id === dog.id);
    const totalDogs = dogs.length;

    // navigation between dogs
    function previousDog() {
        if (dogIndex > 0) {
            router.push(`/dogs/${dogs[dogIndex - 1].id}`);
        }
    }
    function nextDog() {
        if (dogIndex < totalDogs - 1) {
            router.push(`/dogs/${dogs[dogIndex + 1].id}`);
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-100">
            <div className="relative w-full h-64">
                <img
                    src={dog.img}
                    alt={dog.name}
                    className="absolute w-full h-full object-cover"
                />
            </div>

            <div className="flex items-center justify-between bg-blue-300 p-3">
                <h1 className="text-3xl font-bold text-white">{dog.name}</h1>
                <div className="flex items-center gap-4">
                    <p className="text-white">Present</p>
                    <button
                        onClick={() => setIsPresent(!isPresent)}
                        className={`px-4 py-2 rounded-md text-white shadow-md
            ${isPresent ? "bg-green-500" : "bg-white text-black"}`}
                    >
                        {isPresent ? "✅" : "❌"}
                    </button>
                </div>
            </div>

            <div className="flex-1 p-4 bg-white">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <p>
                            <strong>Breed:</strong> {dog.breed}
                        </p>
                        <p>
                            <strong>Age:</strong> {dog.age} years
                        </p>
                        <p>
                            <strong>Sex:</strong> {dog.sex}
                        </p>
                        <p>
                            <strong>Chipnumber:</strong> {dog.chipNumber}
                        </p>
                        <p>
                            <strong>Description:</strong>Lorem ipsum dolor,
                            sit amet consectetur adipisicing elit.
                            Ullam dicta repudiandae, obcaecati temporibus deleniti possimus?
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong>Owner:</strong> {dog.owner.name}{" "}
                            {dog.owner.lastName}
                        </p>
                        <p>
                            <strong>Phone:</strong> {dog.owner.phoneNumber}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-6 mt-auto">
                    <button
                        onClick={previousDog}
                        disabled={dogIndex === 0}
                        className="p-2 disabled:opacity-50"
                    >
                        &lt;
                    </button>
                    <p>
                        {dogIndex + 1} of {totalDogs}
                    </p>
                    <button
                        onClick={nextDog}
                        disabled={dogIndex === totalDogs - 1}
                        className="p-2 disabled:opacity-50"
                    >
                        &gt;
                    </button>
                    <Link
                        href="/dogs"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
                    >
                        All Dogs
                    </Link>
                </div>
            </div>
        </div>
    );
}