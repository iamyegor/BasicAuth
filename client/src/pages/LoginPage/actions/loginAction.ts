import LoginData from "@/pages/LoginPage/types/LoginData.ts";
import { SuccessOr } from "@/utils/results/SuccessOr.ts";
import { validateLoginData } from "@/pages/LoginPage/utils/validateLoginData.ts";
import api from "@/lib/api.ts";
import { redirect } from "react-router-dom";
import { extractLoginError } from "@/pages/LoginPage/utils/extractLoginError.tsx";
import { AxiosError } from "axios";
import ServerErrorResponse from "@/types/ServerErrorResponse.ts";
import ErrorMessage from "@/utils/messages/ErrorMessage.ts";

export async function loginAction({ request }: any): Promise<ErrorMessage | Response> {
    const form = await request.formData();
    const data: LoginData = {
        loginOrEmail: form.get("loginOrEmail"),
        password: form.get("password"),
    };

    const validationResult: SuccessOr<ErrorMessage> = validateLoginData(data);
    if (validationResult.isFailure) {
        return validationResult.error!;
    }

    try {
        await api.post("signin", {
            loginOrEmail: data.loginOrEmail,
            password: data.password,
        });

        return redirect("/");
    } catch (err) {
        return extractLoginError(err as AxiosError<ServerErrorResponse>);
    }
}
