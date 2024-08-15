import throwRouteErrorOnInvalidResponse from "@/utils/exceptionThrowers/throwRouteErrorOnInvalidResponse.ts";
import { AxiosError } from "axios";
import ServerErrorResponse from "@/types/ServerErrorResponse.ts";
import ErrorMessage from "@/utils/messages/ErrorMessage.ts";
import { RouteError } from "@/types/RouteError.ts";

const errorCodes = [
    "login.invalid",
    "login.has.invalid.length",
    "login.has.invalid.symbols",
    "password.is.required",
    "password.has.invalid.signature",
    "password.has.invalid.length",
    "user.invalid.login.or.password",
];

export function extractLoginError(error: AxiosError<ServerErrorResponse>): ErrorMessage {
    throwRouteErrorOnInvalidResponse(error);

    const { errorCode } = error.response!.data;

    if (errorCodes.includes(errorCode)) {
        return ErrorMessage.create("Invalid username or password");
    }

    throw RouteError.unexpected();
}
