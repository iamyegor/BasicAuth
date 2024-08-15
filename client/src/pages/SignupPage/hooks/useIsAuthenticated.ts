import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "@/lib/api.ts";
import { AxiosError } from "axios";
import ServerErrorResponse from "@/types/ServerErrorResponse.ts";
import throwRouteErrorOnInvalidResponse from "@/utils/exceptionThrowers/throwRouteErrorOnInvalidResponse.ts";
import { RouteError } from "@/types/RouteError.ts";

export default function useIsAuthenticated() {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get("auth-status");
                if (response.data == "authenticated") {
                    navigate("/");
                } else if (response.data == "not-authenticated") {
                    return;
                }
            } catch (e) {
                const error = e as AxiosError<ServerErrorResponse>;
                throwRouteErrorOnInvalidResponse(error);

                if (error.response!.data.errorCode == "user.not.found") {
                    return;
                }

                if (error.response!.status == 401) {
                    return;
                }

                throw RouteError.unexpected();
            }
        })();
    }, []);
}
