import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import getStoredResendTimer from "@/utils/resendTimer/getStoredResendTimer.ts";
import storeResendTimer from "@/utils/resendTimer/storeResendTimer.ts";
import clearStoredResendTimer from "@/utils/resendTimer/clearStoredResendTimer.ts";

export default function useSecondsLeft(initialTime: number) {
    const [secondsLeft, setSecondsLeft] = useState<number>(() => {
        const savedTime = getStoredResendTimer();
        return savedTime == null ? initialTime : savedTime;
    });

    const location = useLocation();

    useEffect(() => {
        storeResendTimer(secondsLeft);
        const intervalId = setInterval(() => {
            setSecondsLeft((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [secondsLeft]);

    useEffect(() => {
        return () => {
            clearStoredResendTimer();
        };
    }, [location]);

    return { secondsLeft, setSecondsLeft };
}
