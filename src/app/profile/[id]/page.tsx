interface UserProfileProps {
    params: { id: string };
}

export default async function UserProfile({ params }: UserProfileProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg text-center">
                <h1 className="text-3xl font-semibold text-gray-800">User Profile</h1>
                <hr className="my-4" />
                <h2 className="text-lg text-gray-700">
                    Welcome, <span className="text-blue-600 font-semibold">{params.id || "Guest"}</span>!
                </h2>
            </div>
        </div>
    );
}
