import Link from "next/link";
import React, { useMemo } from "react";

const FooterNavigation = () => {
    const routes = useMemo(() => {
        return [
            {
                icon: "🏠",
                label: "홈",
                href: "/",
            },
            {
                icon: "🗺",
                label: "지도",
                href: "/map",
            },
            {
                icon: "📂",
                label: "미정",
                href: "/explore",
            },
            {
                icon: "👤",
                label: "내 정보",
                href: "/my",
            },
        ];
    }, []);

    return (
        <footer className="footer-nav">
            {routes.map((route) => (
                <Link key={route.label} href={route.href}>
                    <span className="icon">{route.icon}</span>
                    <span>{route.label}</span>
                </Link>
            ))}
        </footer>
    );
};

export default FooterNavigation;
