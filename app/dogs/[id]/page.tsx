"use client";

export default function DogDetailPage({ params }: { params: {id: string} }) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Dog Details</h1>
            <p>Dog ID: {params.id} </p>
        </div>
    );
}