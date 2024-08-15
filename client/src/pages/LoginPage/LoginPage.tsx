import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import SubmittingButton from "@/components/ui/SubmittingButton.tsx";
import LabeledInput from "@/pages/SignupPage/components/LabeledInput.tsx";
import PasswordInput from "@/pages/SignupPage/components/PasswordInput.tsx";
import ErrorMessageComponent from "@/pages/SignupPage/components/ErrorMessageComponent.tsx";
import ErrorMessage from "@/utils/messages/ErrorMessage.ts";
import useIsAuthenticated from "@/pages/SignupPage/hooks/useIsAuthenticated.ts";

export default function LoginPage() {
    const actionData = useActionData() as ErrorMessage | null;
    const { state } = useNavigation();
    useIsAuthenticated();

    const errorMessage = actionData?.value ?? null;

    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent relative z-30">
            <Form
                method="post"
                className="bg-white/30 backdrop-blur p-12 rounded-xl shadow-md w-full max-w-md border"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-200">Log In</h2>
                <LabeledInput id="loginOrEmail" label="Username or Email" type="text" />
                <PasswordInput id="password" label="Password" />
                <div className="flex justify-between mb-4">
                    <Link to="/signup" className="hover:underline text-white text-sm">
                        Don't have an account?
                    </Link>
                    <Link to="/request-password-reset" className="hover:underline text-white text-sm">
                        Forgot password?
                    </Link>
                </div>
                {errorMessage && <ErrorMessageComponent errorMessage={errorMessage} />}
                <SubmittingButton
                    loading={state === "loading" || state === "submitting"}
                    text="Log In"
                />
            </Form>
        </div>
    );
}
