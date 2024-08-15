import {useEffect, useState} from "react";

export default function useEmailFromStorage() {
    const [email, setEmail] = useState<string | null>(null);
    useEffect(() => {
        setEmail(localStorage.getItem("email"));
    }, []);

    return email;
}
