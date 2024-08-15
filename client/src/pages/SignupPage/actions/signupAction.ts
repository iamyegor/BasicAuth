import SignupData from "@/types/SignupData.ts";
import { getSignupData } from "@/pages/SignupPage/utils/getSignupData.ts";
import { SuccessOr } from "@/utils/results/SuccessOr.ts";
import FieldError from "@/pages/SignupPage/types/FieldError.ts";
import { validateSignupData } from "@/pages/SignupPage/utils/validateSignupData.ts";
import api from "@/lib/api.ts";
import { redirect } from "react-router-dom";
import { extractSignupError } from "@/pages/SignupPage/utils/extractSignupError.ts";
import { AxiosError } from "axios";
import ServerErrorResponse from "@/types/ServerErrorResponse.ts";

export async function signupAction({ request }: any) {
    const form = await request.formData();
    const data: SignupData = getSignupData(form);

    const validationResult: SuccessOr<FieldError> = validateSignupData(data);
    if (validationResult.isFailure) {
        return validationResult.error!;
    }

    try {
        await api.post("signup", {
            login: data.username,
            email: data.email,
            password: data.password,
        });

        localStorage.setItem("email", data.email);
        return redirect("/verify-email");
    } catch (err) {
        return extractSignupError(err as AxiosError<ServerErrorResponse>);
    }
}
