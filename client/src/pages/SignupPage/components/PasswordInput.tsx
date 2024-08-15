import { useState } from "react";
import openedEyeImage from "@/assets/opened_eye.png";
import closedEyeImage from "@/assets/closed_eye.png";
import ErrorMessageComponent from "@/pages/SignupPage/components/ErrorMessageComponent.tsx";

interface PasswordInputProps {
    id: string;
    label: string;
    errorMessage?: string | null;
}

export default function PasswordInput({ id, errorMessage, label }: PasswordInputProps) {
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordShown(!isPasswordShown);
    };

    return (
        <div className="space-y-4 mb-4" data-testid="PasswordInput">
            <label className="text-gray-200" htmlFor={id}>
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    name={id}
                    type={isPasswordShown ? "text" : "password"}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    required
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-4 text-sm"
                >
                    {isPasswordShown ? (
                        <img src={openedEyeImage} alt="eye" className="w-5" />
                    ) : (
                        <img src={closedEyeImage} alt="eye" className="w-5" />
                    )}
                </button>
            </div>
            {errorMessage && <ErrorMessageComponent errorMessage={errorMessage} />}
        </div>
    );
}
