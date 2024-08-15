import ErrorMessageComponent from "@/pages/SignupPage/components/ErrorMessageComponent.tsx";

export default function LabeledInput({
    id,
    label,
    type,
    errorMessage,
}: {
    id: string;
    label: string;
    type: string;
    errorMessage?: string | null;
}) {
    return (
        <div className="mb-5">
            <label className="block text-gray-200 mb-3" htmlFor={id}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
            />
            {errorMessage && <ErrorMessageComponent errorMessage={errorMessage} />}
        </div>
    );
}
