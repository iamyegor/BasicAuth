import bg from "@/assets/blue_bg.jpg";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <div className="relative">
            <img
                src={bg}
                alt="Background image"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <Outlet />
        </div>
    );
}
