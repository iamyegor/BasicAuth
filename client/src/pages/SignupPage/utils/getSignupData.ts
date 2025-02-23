import SignupData from "@/types/SignupData.ts";

export function getSignupData(form: any): SignupData {
    return {
        username: form.get("username"),
        email: form.get("email"),
        password: form.get("password"),
        confirmPassword: form.get("confirmPassword"),
    };
}
