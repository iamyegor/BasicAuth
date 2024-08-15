import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api.ts";

function useLoadUsername() {
    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get("username");
                if (!response.data) {
                    navigate("/login");
                } else {
                    setUsername(response.data);
                }
            } catch {
                navigate("/login");
            }
        })();
    }, [navigate]);

    return username;
}

export default useLoadUsername;
