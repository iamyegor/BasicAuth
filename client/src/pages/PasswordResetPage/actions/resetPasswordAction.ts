import FieldError from "@/pages/SignupPage/types/FieldError.ts";
import { SuccessOr } from "@/utils/results/SuccessOr.ts";
import validatePasswordResetData from "@/pages/PasswordResetPage/utils/validatePasswordResetData.ts";
import getQueryParam from "@/utils/getQueryParams.ts";
import api from "@/lib/api.ts";
import { redirect } from "react-router-dom";
import extractPasswordResetError from "@/pages/PasswordResetPage/utils/extractPasswordResetError.ts";
import { AxiosError } from "axios";
import ServerErrorResponse from "@/types/ServerErrorResponse.ts";

export async function resetPasswordAction({ request }: any): Promise<Response | FieldError> {
    const data = await request.formData();
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    const validationResult: SuccessOr<FieldError> = validatePasswordResetData(
        password,
        confirmPassword,
    );

    if (validationResult.isFailure) {
        return validationResult.error!;
    }

    const token: string | null = getQueryParam(request.url, "token");

    try {
        await api.post(`reset-password`, { token, newPassword: password });
        return redirect("/");
    } catch (err) {
        const errorMessage = extractPasswordResetError(err as AxiosError<ServerErrorResponse>);
        return FieldError.create("password", errorMessage);
    }
}
