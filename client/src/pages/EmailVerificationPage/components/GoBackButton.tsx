import { NavLink } from "react-router-dom";
import returnImage from "@/assets/return.png";

interface GoBackButtonProps {
    route: string;
    text: string;
}

export default function GoBackButton({ text, route }: GoBackButtonProps) {
    return (
        <button
            className="flex w-1/2 justify-center items-center bg-white p-3 rounded-lg hover:cursor-pointer hover:shadow-md h-full"
            type="button"
        >
            <NavLink to={route} className="flex items-center space-x-1">
                <img src={returnImage} alt="Return" className="w-5 h-5 mx-auto" />
                <span>{text}</span>
            </NavLink>
        </button>
    );
}
