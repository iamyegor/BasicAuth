import FieldError from "@/pages/SignupPage/types/FieldError.ts";
import { Result } from "@/utils/results/Result.ts";
import isNullOrWhitespace from "@/utils/validations/isNullOrWhitespace.ts";
import validatePassword from "@/utils/validations/validatePassword.ts";
import SignupData from "@/types/SignupData.ts";
import { SuccessOr } from "@/utils/results/SuccessOr.ts";

const EMAIL_REGEX = new RegExp("^[^@]+@[^@]+.[^@]+$");

export function validateSignupData(signupData: SignupData): SuccessOr<FieldError> {
    let fieldError: FieldError | null = null;
    const passwordValidation: Result = validatePassword(signupData.password);

    if (isNullOrWhitespace(signupData.username)) {
        fieldError = FieldError.create("username", "Username must not be empty");
    } else if (!signupData.email) {
        fieldError = FieldError.create("email", "Email must not be empty");
    } else if (!EMAIL_REGEX.test(signupData.email)) {
        fieldError = FieldError.create("email", "Invalid email format");
    } else if (passwordValidation.isFailure) {
        fieldError = FieldError.create("password", passwordValidation.errorMessage!);
    } else if (signupData.password !== signupData.confirmPassword) {
        fieldError = FieldError.create("confirmPassword", "Passwords do not match");
    }

    if (fieldError) {
        return SuccessOr.Fail<FieldError>(fieldError);
    }

    return SuccessOr.Ok();
}
