import FeedbackMessage from "@/pages/EmailVerificationPage/types/FeedbackMessage.ts";
import api from "@/lib/api.ts";
import { AxiosError } from "axios";
import ServerErrorResponse from "@/types/ServerErrorResponse.ts";
import extractRequestPasswordResetError from "@/pages/RequestPasswordReset/utils/extractRequestPasswordResetError.ts";

export async function requestPasswordResetAction({
    request,
}: any): Promise<FeedbackMessage | Response> {
    const form = await request.formData();

    const loginOrEmail = form.get("loginOrEmail") as string;

    if (loginOrEmail.length < 3) {
        return FeedbackMessage.createError("Login or email is too short.");
    }

    try {
        await api.post("request-password-reset", {
            loginOrEmail,
        });

        return FeedbackMessage.createSuccess("Password reset link sent successfully!");
    } catch (err) {
        return extractRequestPasswordResetError(err as AxiosError<ServerErrorResponse>);
    }
}
