import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import FeedbackMessage from "@/pages/EmailVerificationPage/types/FeedbackMessage.ts";
import focusRight from "@/pages/EmailVerificationPage/utils/focusRight.ts";
import addNewValueToInputs from "@/pages/EmailVerificationPage/utils/addNewValueToInputs.ts";
import { ONLY_NUMBERS_REGEX } from "@/pages/EmailVerificationPage/utils/validateCode.ts";
import FeedbackMessageComponent from "@/pages/EmailVerificationPage/components/FeedbackMessageComponent.tsx";
import focusInputBasedOnKey from "@/pages/EmailVerificationPage/utils/focusInputBasedOnKey.ts";

export const IS_NUMBER_REGEX = /^\d?$/;

interface VerificationCodeProps {
    inputs: string[];
    setInputs: (inputs: string[]) => void;
    message: FeedbackMessage | null;
}

export default function VerificationCodeInput({
    inputs,
    setInputs,
    message,
}: VerificationCodeProps) {
    const inputRefs = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, inputs.length);
    }, []);

    function handleChange(index: number, value: string) {
        if (IS_NUMBER_REGEX.test(value)) {
            setInputs(addNewValueToInputs(value, inputs, index));
            if (value && index < inputs.length - 1) {
                focusRight(inputRefs.current, index);
            }
        }
    }

    function handleKeydown(event: React.KeyboardEvent<HTMLInputElement>, index: number) {
        focusInputBasedOnKey(event.key, index, inputs, inputRefs.current);
    }

    function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
        event.preventDefault();
        const pastedText: string = event.clipboardData.getData("text").trim();

        if (pastedText.length === inputs.length && ONLY_NUMBERS_REGEX.test(pastedText)) {
            setInputs(pastedText.split(""));
            inputRefs.current[inputs.length - 1].focus();
        }
    }

    function placeCaretBehindCharacter(input: HTMLInputElement) {
        input.setSelectionRange(input.value.length, input.value.length);
    }

    const classes = classNames(
        "default-verification-code-input",
        !message || message.isSuccess
            ? "verification-code-input-ok"
            : "verification-code-input-error",
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-center space-x-2 sm:space-x-3">
                {inputs.map((value, index) => (
                    <input
                        ref={(el) => (inputRefs.current[index] = el!)}
                        name={`code-${index}`}
                        key={index}
                        id={`input-${index}`}
                        type="text"
                        autoComplete="off"
                        maxLength={1}
                        onPaste={(e) => handlePaste(e)}
                        value={value}
                        onSelect={() => placeCaretBehindCharacter(inputRefs.current[index])}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeydown(e, index)}
                        className={classes}
                        inputMode="numeric" // Show numeric keyboard on mobile devices
                    />
                ))}
            </div>
            <FeedbackMessageComponent feedback={message} />
        </div>
    );
}
