// app/dogs/layout.tsx

export default function DogsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-md mx-auto p-4 bg-white min-h-screen">
            {children}
        </div>
    );
}
