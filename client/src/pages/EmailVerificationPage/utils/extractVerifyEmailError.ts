import { AxiosError } from "axios";
import ServerErrorResponse from "@/types/ServerErrorResponse.ts";
import throwRouteErrorOnInvalidResponse from "@/utils/exceptionThrowers/throwRouteErrorOnInvalidResponse.ts";

interface EmailVerificationErrorDictionary {
    [key: string]: string;
}

const emailVerificationErrors: EmailVerificationErrorDictionary = {
    "email.verification.code.has.invalid.length":
        "Email verification code must be 5 characters long.",
    "email.verification.code.is.invalid": "Email verification code is invalid.",
    "email.verification.code.is.expired": "Email verification code has expired.",
};

export default function extractVerifyEmailError(error: AxiosError<ServerErrorResponse>): string {
    throwRouteErrorOnInvalidResponse(error);

    return emailVerificationErrors[error.response!.data.errorCode];
}
