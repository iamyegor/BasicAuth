interface VerificationFormHeaderProps {
    email: string | null;
}

export default function VerificationFormHeader({ email }: VerificationFormHeaderProps) {
    return (
        <>
            <h2
                className="mb-3 text-4xl font-bold text-gray-200"
                data-testid="VerifyCodeForm.ContactDetailHeading"
            >
                Verify Your email
            </h2>
            <p
                className="mb-8 text-lg text-gray-200"
                data-testid="VerifyCodeForm.ContactDetailMessage"
            >
                Please enter the verification code sent to <u>{email}</u>
            </p>
        </>
    );
}
