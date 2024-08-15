import classNames from "classnames";
import api from "@/lib/api.ts";
import { useEffect, useState } from "react";
import sendImage from "@/assets/send.png";
import disabledSendImage from "@/assets/send_disabled.png";
import { RouteError } from "@/types/RouteError.ts";
import FeedbackMessage from "@/pages/EmailVerificationPage/types/FeedbackMessage.ts";
import Spinner from "@/pages/EmailVerificationPage/components/Spinner.tsx";

interface ResendCodeButtonProps {
    setSecondsLeft: (seconds: number) => void;
    secondsLeft: number;
    maxSeconds: number;
    setMessage: (value: FeedbackMessage) => void;
}

export default function ResendCodeButton({
    setSecondsLeft,
    secondsLeft,
    maxSeconds,
    setMessage,
}: ResendCodeButtonProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [unexpectedError, setUnexpectedError] = useState<boolean>(false);

    useEffect(() => {
        if (unexpectedError) {
            throw RouteError.unexpected();
        }
    }, [unexpectedError]);

    async function resendCode() {
        if (isDisabled()) {
            return;
        }

        setIsLoading(true);

        try {
            await api.post("resend-email-code");
            setMessage(FeedbackMessage.createSuccess("Verification code sent successfully!"));
            setSecondsLeft(maxSeconds);
        } catch (err) {
            setUnexpectedError(true);
        }

        setIsLoading(false);
    }

    const resendCodeButtonClasses = classNames(
        isLoading
            ? "verification-code-auxiliary-button--loading"
            : "verification-code-auxiliary-button",
    );

    function isDisabled() {
        return secondsLeft > 0 || isLoading;
    }

    return (
        <button
            type="button"
            className={resendCodeButtonClasses}
            disabled={isDisabled()}
            onClick={resendCode}
        >
            {isLoading ? (
                <Spinner size={26} />
            ) : (
                <>
                    <img
                        src={isDisabled() ? disabledSendImage : sendImage}
                        alt="return"
                        className="w-5 mt-2 mr-1"
                    />
                    <span>Resend code</span>
                </>
            )}
        </button>
    );
}
