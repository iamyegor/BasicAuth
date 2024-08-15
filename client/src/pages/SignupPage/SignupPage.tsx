// src/components/SignupForm.tsx
import {Form, Link, useActionData, useNavigation} from "react-router-dom";
import FieldError from "@/pages/SignupPage/types/FieldError.ts";
import PasswordInput from "@/pages/SignupPage/components/PasswordInput.tsx";
import SubmittingButton from "@/components/ui/SubmittingButton.tsx";
import LabeledInput from "@/pages/SignupPage/components/LabeledInput.tsx";
import useIsAuthenticated from "@/pages/SignupPage/hooks/useIsAuthenticated.ts";

export default function SignupPage() {
    const actionData = useActionData() as FieldError | null;
    const { state } = useNavigation();
    useIsAuthenticated();

    const usernameError = actionData?.isField("username") ? actionData?.errorMessage : null;
    const emailError = actionData?.isField("email") ? actionData?.errorMessage : null;
    const passwordError = actionData?.isField("password") ? actionData?.errorMessage : null;
    const confirmPasswordError = actionData?.isField("confirmPassword")
        ? actionData?.errorMessage
        : null;

    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent relative z-30">
            <Form
                method="post"
                className="bg-white/30 backdrop-blur p-12 rounded-xl shadow-md w-full max-w-md border"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-200">Sign Up</h2>
                <LabeledInput id="username" label="Name" type="text" errorMessage={usernameError} />
                <LabeledInput id="email" label="Email" type="email" errorMessage={emailError} />
                <PasswordInput id="password" label="Password" errorMessage={passwordError} />
                <PasswordInput
                    id="confirmPassword"
                    label="Confirm Password"
                    errorMessage={confirmPasswordError}
                />
                <div className="flex justify-start mb-5">
                    <Link to="/login" className="hover:underline text-white text-sm">
                        Already have an account?
                    </Link>
                </div>
                <SubmittingButton
                    loading={state == "loading" || state == "submitting"}
                    text="Create Account"
                />
            </Form>
        </div>
    );
}
