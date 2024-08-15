import { RouteError } from "@/types/RouteError.ts";
import ServerErrorResponse from "@/types/ServerErrorResponse.ts";
import { AxiosError } from "axios";
import throwRouteErrorOnInvalidResponse from "@/utils/exceptionThrowers/throwRouteErrorOnInvalidResponse.ts";

interface PasswordResetErrors {
    [key: string]: string;
}

const errorsDictionary: PasswordResetErrors = {
    "password.is.required": "Password is required",
    "password.invalid.signature": "Password has an invalid signature",
    "password.invalid.length": "Password length is invalid",
    "password.reset.token.not.found": "This link isn't valid. Please request a new one.",
    "password.reset.is.same.as.current": "The new password can not be the same as the current one.",
};

export default function extractPasswordResetError(error: AxiosError<ServerErrorResponse>): string {
    throwRouteErrorOnInvalidResponse(error);

    const errorMessage = errorsDictionary[error.response!.data.errorCode];
    if (errorMessage) {
        return errorMessage;
    }

    throw RouteError.unexpected();
}
