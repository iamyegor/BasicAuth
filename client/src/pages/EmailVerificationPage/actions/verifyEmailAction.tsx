import FeedbackMessage from "@/pages/EmailVerificationPage/types/FeedbackMessage.ts";
import getCodeFromForm from "@/pages/EmailVerificationPage/utils/getCodeFromForm.ts";
import {Result} from "@/utils/results/Result.ts";
import validateCode from "@/pages/EmailVerificationPage/utils/validateCode.ts";
import api from "@/lib/api.ts";
import {redirect} from "react-router-dom";
import {AxiosError} from "axios";
import ServerErrorResponse from "@/types/ServerErrorResponse.ts";
import extractVerifyEmailError
    from "@/pages/EmailVerificationPage/utils/extractVerifyEmailError.ts";

export async function verifyEmailAction({request}: any): Promise<FeedbackMessage | Response> {
    const code: string = await getCodeFromForm(request, 5);

    const validationResult: Result = validateCode(code, 5);
    if (validationResult.isFailure) {
        return FeedbackMessage.createError(validationResult.errorMessage!);
    }

    try {
        await api.post("verify-email", { code });
        return redirect("/");
    } catch (err) {
        const error = err as AxiosError<ServerErrorResponse>;
        const errorMessage: string = extractVerifyEmailError(error);
        return FeedbackMessage.createError(errorMessage);
    }
}
