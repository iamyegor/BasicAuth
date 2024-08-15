interface ErrorMessageComponentProps {
    errorMessage: string;
}

export default function ErrorMessageComponent({ errorMessage }: ErrorMessageComponentProps) {
    return (
        <div className="flex items-start space-x-2 mt-3" data-testid="ErrorMessageComponent">
            <p data-testid="ErrorMessageComponent.Message" className="text-red-600 text-left">
                {errorMessage}
            </p>
        </div>
    );
}
