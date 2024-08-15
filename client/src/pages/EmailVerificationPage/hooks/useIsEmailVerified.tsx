import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "@/lib/api.ts";

export default function useIsEmailVerified() {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get("email-status");
                if (response.data == "verified") {
                    navigate("/");
                }
            } catch {
                navigate("/");
            }
        })();
    }, []);
}
