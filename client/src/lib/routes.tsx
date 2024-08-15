import SignupPage from "@/pages/SignupPage/SignupPage.tsx";
import RootLayout from "@/components/ui/RootLayout.tsx";
import EmailVerificationPage from "@/pages/EmailVerificationPage/EmailVerificationPage.tsx";
import HomePage from "@/pages/HomePage/HomePage.tsx";
import LoginPage from "@/pages/LoginPage/LoginPage.tsx";
import { loginAction } from "@/pages/LoginPage/actions/loginAction.ts";
import { signupAction } from "@/pages/SignupPage/actions/signupAction.ts";
import { verifyEmailAction } from "@/pages/EmailVerificationPage/actions/verifyEmailAction.tsx";
import { requestPasswordResetAction } from "@/pages/RequestPasswordReset/actions/requestPasswordResetAction.ts";
import RequestPasswordResetPage from "@/pages/RequestPasswordReset/RequestPasswordResetPage.tsx";
import PasswordResetPage from "@/pages/PasswordResetPage/PasswordResetPage.tsx";
import { resetPasswordAction } from "@/pages/PasswordResetPage/actions/resetPasswordAction.ts";

const routes = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/signup",
                element: <SignupPage />,
                action: signupAction,
            },
            {
                path: "/verify-email",
                element: <EmailVerificationPage />,
                action: verifyEmailAction,
            },
            {
                path: "/login",
                element: <LoginPage />,
                action: loginAction,
            },
            {
                path: "request-password-reset",
                element: <RequestPasswordResetPage />,
                action: requestPasswordResetAction,
            },
            {
                path: "reset-password",
                element: <PasswordResetPage />,
                action: resetPasswordAction,
            },
        ],
    },
];

export default routes;
