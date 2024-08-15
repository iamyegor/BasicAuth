import EmailVerificationForm from "@/pages/EmailVerificationPage/components/EmailVerificationForm.tsx";
import useIsEmailVerified from "@/pages/EmailVerificationPage/hooks/useIsEmailVerified.tsx";
import useEmailFromStorage from "@/pages/EmailVerificationPage/hooks/useEmailFromStorage.ts";

export default function EmailVerificationPage() {
    const email = useEmailFromStorage();

    useIsEmailVerified();

    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent relative z-30">
            <EmailVerificationForm email={email} />
        </div>
    );
}
