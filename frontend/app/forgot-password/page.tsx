import Link from 'next/link';

export default function ForgotPassword() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight">Forgot Password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        This feature is currently under construction. Please contact administration for assistance.
                    </p>
                </div>
                <div className="mt-8 flex justify-center">
                    <Link href="/login" className="text-blue-600 hover:text-blue-500">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
