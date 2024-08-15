import { NavLink } from "react-router-dom";
import returnImage from "@/assets/return.png";

export default function GoBackToLoginButton() {
    return (
        <button
            className="flex justify-center items-center bg-white p-4 rounded-lg hover:cursor-pointer hover:shadow-md h-full w-full mt-4"
            type="button"
        >
            <NavLink to="/login" className="flex items-center space-x-1">
                <img src={returnImage} alt="Return" className="w-5 h-5 mx-auto" />
                <span>Go back to login</span>
            </NavLink>
        </button>
    );
}
