import { Result } from "@/utils/results/Result.ts";

export const PWD_REGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[\\d\\W]).*$");

export default function validatePassword(password: string): Result {
    if (password.length < 6 || password.length > 50) {
        return Result.Fail("Password length must be between 6 and 50 characters");
    }

    if (!PWD_REGEX.test(password)) {
        return Result.Fail(
            "Password must contain at least one upper case, one lower case letter and either one number or a special character",
        );
    }

    return Result.Ok();
}
