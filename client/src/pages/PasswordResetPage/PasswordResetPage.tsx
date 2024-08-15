import { Form, useActionData, useNavigation } from "react-router-dom";
import PasswordInput from "@/pages/SignupPage/components/PasswordInput.tsx";
import SubmittingButton from "@/components/ui/SubmittingButton.tsx";
import FieldError from "@/pages/SignupPage/types/FieldError.ts";
import usePasswordResetStatus from "@/pages/PasswordResetPage/hooks/usePasswordResetStatus.ts";

export default function PasswordResetPage() {
    const { state } = useNavigation();
    const actionData = useActionData() as FieldError | null;
    const { isInvalid, isExpired } = usePasswordResetStatus();

    const passwordError: string | null = actionData?.isField("password")
        ? actionData?.errorMessage
        : null;

    const confirmPasswordError: string | null = actionData?.isField("confirmPassword")
        ? actionData?.errorMessage
        : null;

    if (isInvalid) {
        return <p className="text-red-500 text-5xl absolute">Invalid link</p>;
    }

    if (isExpired) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-transparent relative z-30">
                <p className="text-red-500 text-2xl">Link has expired. Please request a new one.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent relative z-30">
            <Form
                method="post"
                className="bg-white/30 backdrop-blur p-12 rounded-xl shadow-md w-full max-w-md border"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-200">Set a New Password</h2>
                <div className="mb-8">
                    <PasswordInput id="password" label="Password" errorMessage={passwordError} />
                    <PasswordInput
                        id="confirmPassword"
                        label="Confirm password"
                        errorMessage={confirmPasswordError}
                    />
                </div>
                <SubmittingButton
                    loading={state === "loading" || state === "submitting"}
                    text="Reset password"
                />
            </Form>
        </div>
    );
}
