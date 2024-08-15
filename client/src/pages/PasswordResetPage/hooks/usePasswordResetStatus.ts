import { useEffect, useState } from "react";
import getQueryParam from "@/utils/getQueryParams.ts";
import api from "@/lib/api.ts";
import throwRouteErrorOnInvalidResponse from "@/utils/exceptionThrowers/throwRouteErrorOnInvalidResponse.ts";
import ServerErrorResponse from "@/types/ServerErrorResponse.ts";
import { AxiosError } from "axios";
import { RouteError } from "@/types/RouteError.ts";

export default function usePasswordResetStatus() {
    const [isInvalid, setIsInvalid] = useState(false);
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        (async () => {
            const token: string | null = getQueryParam(window.location.href, "token");
            if (!token) {
                setIsInvalid(true);
                return;
            }

            try {
                await api.get(`is-reset-password-token-active?token=${token}`);
            } catch (err) {
                const error = err as AxiosError<ServerErrorResponse>;
                throwRouteErrorOnInvalidResponse(err);

                if (error.response!.status === 412) {
                    setIsExpired(true);
                }

                throw RouteError.unexpected();
            }
        })();
    }, []);

    return { isInvalid, isExpired };
}
