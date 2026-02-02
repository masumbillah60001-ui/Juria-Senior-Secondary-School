import { auth, signOut } from '@/auth';

export default async function StudentPortal() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-blue-900">Student Portal</h1>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-4">Hi, {session?.user?.name || 'Student'}</span>
                            <form
                                action={async () => {
                                    'use server';
                                    await signOut();
                                }}
                            >
                                <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                                    Log Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-gray-900 mb-2">My Profile</h3>
                        <p className="text-gray-600 text-sm">View and edit your personal information.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-gray-900 mb-2">Attendance</h3>
                        <p className="text-gray-600 text-sm">Check your attendance records.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-gray-900 mb-2">Results</h3>
                        <p className="text-gray-600 text-sm">View your academic performance.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
