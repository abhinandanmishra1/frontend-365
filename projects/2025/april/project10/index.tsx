import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ScrollbarVariant = "default" | "primary" | "minimal";

interface CustomScrollbarContainerProps {
    children: React.ReactNode;
    className?: string;
    variant?: ScrollbarVariant;
}

const CustomScrollbarContainer = ({ children, className, variant = "default" }: CustomScrollbarContainerProps) => {
    const baseClasses = [
        "overflow-y-auto",
        "[&::-webkit-scrollbar]:w-2",
        "[&::-webkit-scrollbar-track]:rounded-full",
        "[&::-webkit-scrollbar-thumb]:rounded-full",
    ].join(" ");

    const variantClasses = {
        default: [
            "[&::-webkit-scrollbar-track]:bg-gray-100",
            "[&::-webkit-scrollbar-thumb]:bg-gray-300",
            "dark:[&::-webkit-scrollbar-track]:bg-neutral-700",
            "dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500",
        ].join(" "),
        primary: [
            "[&::-webkit-scrollbar-track]:bg-blue-100",
            "[&::-webkit-scrollbar-thumb]:bg-blue-500",
            "dark:[&::-webkit-scrollbar-track]:bg-blue-950",
            "dark:[&::-webkit-scrollbar-thumb]:bg-blue-700",
        ].join(" "),
        minimal: [
            "[&::-webkit-scrollbar-track]:bg-transparent",
            "[&::-webkit-scrollbar-thumb]:bg-neutral-300",
            "hover:[&::-webkit-scrollbar-thumb]:bg-neutral-400",
            "dark:[&::-webkit-scrollbar-track]:bg-transparent",
            "dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700",
            "dark:hover:[&::-webkit-scrollbar-thumb]:bg-neutral-600",
        ].join(" "),
    };

    return (
        <div className={cn(baseClasses, variantClasses[variant], className)}>
            {children}
        </div>
    )
}

export default function Project10() {
    return (
        <div className="max-w-7xl mx-auto p-4 pt-6 space-y-6">
            <h1 className="text-3xl font-bold mb-4">Project 10 - Scrollable Content Variants (Webkit)</h1>

            {/* Default Variant Example */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Default Variant</h2>
                <CustomScrollbarContainer className="h-48 w-full border rounded-md p-4">
                    <div className="space-y-4 w-[50%] m-auto">
                        {[...Array(3)].map((_, i) => (
                            <Card key={i}>
                                <CardHeader>
                                    <CardTitle>Card Title {i + 1}</CardTitle>
                                    <CardDescription>Default scrollbar style.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Scroll down to see the default gray scrollbar.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline">Action {i + 1}</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CustomScrollbarContainer>
            </div>

            {/* Primary Variant Example */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Primary Variant</h2>
                <CustomScrollbarContainer variant="primary" className="h-48 w-full border rounded-md p-4">
                    <div className="space-y-4 w-[50%] m-auto">
                        {[...Array(3)].map((_, i) => (
                            <Card key={i}>
                                <CardHeader>
                                    <CardTitle>Card Title {i + 1}</CardTitle>
                                    <CardDescription>Primary scrollbar style.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Scroll down to see the primary (blue) scrollbar.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline">Action {i + 1}</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CustomScrollbarContainer>
            </div>

             {/* Minimal Variant Example */}
             <div>
                <h2 className="text-xl font-semibold mb-2">Minimal Variant</h2>
                <CustomScrollbarContainer variant="minimal" className="h-48 w-full border rounded-md p-4">
                    <div className="space-y-4 w-[50%] m-auto">
                        {[...Array(3)].map((_, i) => (
                            <Card key={i}>
                                <CardHeader>
                                    <CardTitle>Card Title {i + 1}</CardTitle>
                                    <CardDescription>Minimal scrollbar style.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Scroll down to see the minimal scrollbar (visible on hover).</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline">Action {i + 1}</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CustomScrollbarContainer>
            </div>
        </div>
    );
}
