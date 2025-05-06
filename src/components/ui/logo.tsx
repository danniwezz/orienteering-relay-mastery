import { cn } from "@/lib/utils";
import logoImage from "@/assets/olman25.svg";

interface LogoProps {
    className?: string;
    size?: number;
}

export function Logo({ className, size = 40 }: LogoProps) {
    return (
        <div className={cn("relative", className)}>
            <div style={{ width: size, height: size }}>
                <img
                    src={logoImage}
                    alt="OLMan25 Logo"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </div>
        </div>
    );
}