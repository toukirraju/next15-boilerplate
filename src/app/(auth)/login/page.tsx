import LoginForm from "./login-form";


export default function LoginPage() {
    return (
        <div className="container mx-auto py-8">
            <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Sign In</h1>
                <LoginForm />
                <div className="mt-4 text-center">
                    <p>Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a></p>
                </div>
            </div>
        </div>
    );
}