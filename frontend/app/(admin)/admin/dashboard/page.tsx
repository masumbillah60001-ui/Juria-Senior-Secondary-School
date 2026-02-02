import { auth, signOut } from '@/auth';

export default async function AdminDashboard() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-4">Welcome, {session?.user?.name || session?.user?.email}</span>
                            <form
                                action={async () => {
                                    'use server';
                                    await signOut();
                                }}
                            >
                                <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                        <h2 className="text-lg font-medium text-gray-900">System Overview</h2>
                        <p className="mt-1 text-sm text-gray-500">Quick stats and management links.</p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Placeholders for stats */}
                            <div className="bg-blue-50 overflow-hidden rounded-lg shadow-sm p-5 border border-blue-100">
                                <dt className="text-sm font-medium text-blue-500 truncate">Total Students</dt>
                                <dd className="mt-1 text-3xl font-semibold text-blue-900">--</dd>
                            </div>
                            <div className="bg-green-50 overflow-hidden rounded-lg shadow-sm p-5 border border-green-100">
                                <dt className="text-sm font-medium text-green-500 truncate">Total Faculty</dt>
                                <dd className="mt-1 text-3xl font-semibold text-green-900">--</dd>
                            </div>
                            <div className="bg-purple-50 overflow-hidden rounded-lg shadow-sm p-5 border border-purple-100">
                                <dt className="text-sm font-medium text-purple-500 truncate">Active Courses</dt>
                                <dd className="mt-1 text-3xl font-semibold text-purple-900">--</dd>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
