import React, { FC } from "react";
import AppLayout from "./AppLayout";
import AuthLayout from "./AuthLayout";
import ErrorLayout from "./ErrorLayout";

const layouts = {
    AppLayout: AppLayout,
    AuthLayout: AuthLayout,
    ErrorLayout:ErrorLayout
};

interface LayoutProps {
    layoutType: "AppLayout" | "AuthLayout" | "ErrorLayout";
}

export const Layout: FC<LayoutProps> = ({ children, layoutType }) => {

    let Component = layouts[layoutType] || React.Fragment;
    return <Component>{children}</Component>;

};

// export default MLayout;
