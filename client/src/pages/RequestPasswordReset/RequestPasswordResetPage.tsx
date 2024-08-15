import { Form, useActionData, useNavigation } from "react-router-dom";
import LabeledInput from "@/pages/SignupPage/components/LabeledInput.tsx";
import SubmittingButton from "@/components/ui/SubmittingButton.tsx";
import FeedbackMessage from "@/pages/EmailVerificationPage/types/FeedbackMessage.ts";
import GoBackToLoginButton from "@/pages/RequestPasswordReset/components/GoBackToLoginButton.tsx";
import FeedbackMessageComponent from "@/pages/EmailVerificationPage/components/FeedbackMessageComponent.tsx";

export default function RequestPasswordResetPage() {
    const actionData = useActionData() as FeedbackMessage | null;
    const { state } = useNavigation();

    const errorMessage = actionData?.message ?? null;

    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent relative z-30">
            <Form
                method="post"
                className="bg-white/30 backdrop-blur p-12 rounded-xl shadow-md w-full max-w-md border"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-200">
                    Request Password Reset
                </h2>
                <LabeledInput id="loginOrEmail" label="Username or Email" type="text" />
                {errorMessage && (
                    <div className="mt-5">
                        <FeedbackMessageComponent feedback={actionData} />
                    </div>
                )}
                <div className="mb-6"></div>
                <SubmittingButton
                    loading={state === "loading" || state === "submitting"}
                    text="Send Reset Link"
                />
                <GoBackToLoginButton />
            </Form>
        </div>
    );
}
