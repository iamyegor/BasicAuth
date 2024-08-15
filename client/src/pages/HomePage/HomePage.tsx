import useLoadUsername from "@/pages/HomePage/hooks/useLoadUsername.ts";
import BaseSkeleton from "@/components/ui/BaseSkeleton.tsx";

export default function HomePage() {
    const username = useLoadUsername();

    return (
        <div className="flex justify-center items-center min-h-screen">
            {username ? (
                <p className="text-8xl z-30 font-bold text-white">Hello, {username}</p>
            ) : (
                <BaseSkeleton width={500} height={80} />
            )}
        </div>
    );
}
