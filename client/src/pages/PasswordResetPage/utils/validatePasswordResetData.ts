import FieldError from "@/pages/SignupPage/types/FieldError.ts";
import { SuccessOr } from "@/utils/results/SuccessOr.ts";
import { Result } from "@/utils/results/Result.ts";
import validatePassword from "@/utils/validations/validatePassword.ts";

export default function validatePasswordResetData(
    password: string,
    confirmPassword: string,
): SuccessOr<FieldError> {
    let fieldError: FieldError | null = null;
    const passwordValidation: Result = validatePassword(password);

    if (passwordValidation.isFailure) {
        fieldError = FieldError.create("password", passwordValidation.errorMessage!);
    } else if (password !== confirmPassword) {
        fieldError = FieldError.create("confirmPassword", "Passwords do not match.");
    }

    if (fieldError) {
        return SuccessOr.Fail(fieldError);
    }

    return SuccessOr.Ok();
}
