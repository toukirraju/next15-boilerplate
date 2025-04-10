
import SignUpForm from './signup-form';

export default function SignUpPage() {
    return (
        <div className="container mx-auto py-8">
            <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
                <SignUpForm />
                <div className="mt-4 text-center">
                    <p>Already have an account? <a href="/login" className="text-blue-500 hover:underline">Sign in</a></p>
                </div>
            </div>
        </div>
    );
}