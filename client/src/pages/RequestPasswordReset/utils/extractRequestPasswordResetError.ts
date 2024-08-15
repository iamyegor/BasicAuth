import { AxiosError } from "axios";
import ServerErrorResponse from "@/types/ServerErrorResponse.ts";
import FeedbackMessage from "@/pages/EmailVerificationPage/types/FeedbackMessage.ts";
import throwRouteErrorOnInvalidResponse from "@/utils/exceptionThrowers/throwRouteErrorOnInvalidResponse.ts";
import { RouteError } from "@/types/RouteError.ts";

interface RequestPasswordResetErrors {
    [key: string]: FeedbackMessage;
}

const requestPasswordResetErrors: RequestPasswordResetErrors = {
    "user.not.found": FeedbackMessage.createError("User not found."),
    "password.reset.is.already.requested": FeedbackMessage.createError(
        "Password reset is already requested. Check your inbox",
    ),
};

export default function extractRequestPasswordResetError(
    error: AxiosError<ServerErrorResponse>,
): FeedbackMessage {
    throwRouteErrorOnInvalidResponse(error);

    const feedbackMessage = requestPasswordResetErrors[error.response!.data.errorCode];
    if (feedbackMessage) {
        return feedbackMessage;
    }

    throw RouteError.unexpected();
}
