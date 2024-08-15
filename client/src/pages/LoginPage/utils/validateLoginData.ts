import { SuccessOr } from "@/utils/results/SuccessOr.ts";
import isNullOrWhitespace from "@/utils/validations/isNullOrWhitespace.ts";
import LoginData from "@/pages/LoginPage/types/LoginData.ts";
import ErrorMessage from "@/utils/messages/ErrorMessage.ts";

export function validateLoginData(loginData: LoginData): SuccessOr<ErrorMessage> {
    if (isNullOrWhitespace(loginData.loginOrEmail) || isNullOrWhitespace(loginData.password)) {
        return SuccessOr.Fail(ErrorMessage.create("Please fill in all fields"));
    }

    return SuccessOr.Ok();
}
