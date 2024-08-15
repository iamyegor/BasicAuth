import throwRouteErrorOnInvalidResponse from "@/utils/exceptionThrowers/throwRouteErrorOnInvalidResponse.ts";
import FieldError from "@/pages/SignupPage/types/FieldError.ts";
import { AxiosError } from "axios";
import ServerErrorResponse from "@/types/ServerErrorResponse.ts";

type FieldErrorDictionary = {
    [key: string]: FieldError;
};

// Create a new dictionary
const errorsDictionary: FieldErrorDictionary = {
    "login.invalid": FieldError.create("username", "Invalid username"),
    "login.is.required": FieldError.create("username", "Username is required"),
    "login.invalid.symbols": FieldError.create("username", "Username contains invalid symbols"),
    "login.invalid.length": FieldError.create("username", "Username length is invalid"),
    "login.is.already.taken": FieldError.create("username", "Username is already taken"),

    "password.is.required": FieldError.create("password", "Password is required"),
    "password.invalid.signature": FieldError.create(
        "password",
        "Password has an invalid signature",
    ),
    "password.invalid.length": FieldError.create("password", "Password length is invalid"),

    "email.is.required": FieldError.create("email", "Email is required"),
    "email.invalid.signature": FieldError.create("email", "Email has an invalid signature"),
    "email.too.long": FieldError.create("email", "Email is too long"),
    "email.is.already.taken": FieldError.create("email", "Email is already taken"),
};

export function extractSignupError(error: AxiosError<ServerErrorResponse>): FieldError {
    throwRouteErrorOnInvalidResponse(error);

    const { errorCode } = error.response!.data;

    return errorsDictionary[errorCode];
}
