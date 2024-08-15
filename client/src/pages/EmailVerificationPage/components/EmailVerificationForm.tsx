import { Form, useActionData, useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";
import FeedbackMessage from "@/pages/EmailVerificationPage/types/FeedbackMessage.ts";
import SubmittingButton from "@/components/ui/SubmittingButton.tsx";
import VerificationCodeInput from "@/pages/EmailVerificationPage/components/VerificationCodeInput.tsx";
import GoBackButton from "@/pages/EmailVerificationPage/components/GoBackButton.tsx";
import ResendCodeButton from "@/pages/EmailVerificationPage/components/ResendCodeButton.tsx";
import CountdownDisplay from "@/pages/EmailVerificationPage/components/CountdownDisplay.tsx";
import useSecondsLeft from "@/pages/EmailVerificationPage/hooks/useSecondsLeft.tsx";
import VerificationFormHeader from "@/pages/EmailVerificationPage/components/VerificationFormHeader.tsx";
import "@/styles/verification-code-form.css";

interface VerifyCodeFormProps {
    email: string | null;
}

export default function EmailVerificationForm({ email }: VerifyCodeFormProps) {
    const maxSeconds = 60;
    const actionError = useActionData() as FeedbackMessage;
    const { state } = useNavigation();
    const [inputs, setInputs] = useState<string[]>(Array(5).fill(""));
    const { secondsLeft, setSecondsLeft } = useSecondsLeft(maxSeconds);
    const [message, setMessage] = useState<FeedbackMessage | null>(null);

    useEffect(() => {
        if (!actionError) {
            return;
        }

        if (message === null || actionError.generatedAt > message.generatedAt) {
            setMessage(actionError);
        }
    }, [actionError?.generatedAt]);

    return (
        <div className="text-center z-20 bg-white/30 backdrop-blur p-16 rounded-xl shadow-md w-full max-w-2xl border">
            <VerificationFormHeader email={email} />
            <Form method="post" className="space-y-8">
                <div className={message ? "space-y-6" : "space-y-8"}>
                    <VerificationCodeInput
                        inputs={inputs}
                        setInputs={setInputs}
                        message={message}
                    />
                    <SubmittingButton
                        loading={state == "submitting" || state == "loading"}
                        text="Verify Code"
                    />
                </div>
                <div className="flex items-center justify-center space-x-2 h-14">
                    <GoBackButton route="/signup" text="Go back to signup" />
                    <ResendCodeButton
                        setMessage={setMessage}
                        setSecondsLeft={setSecondsLeft}
                        secondsLeft={secondsLeft}
                        maxSeconds={maxSeconds}
                    />
                </div>
                <CountdownDisplay secondsLeft={secondsLeft} />
            </Form>
        </div>
    );
}
