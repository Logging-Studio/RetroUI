import showcaseData from "@/showcase.json";
import { Card, Text, Button } from "@/components/retroui";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ShowcasePage() {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4 lg:px-0">
            <div className="mb-12 flex flex-col gap-2 items-start">
                <Text as="h1">
                    Showcase
                </Text>
                <Text className="text-lg text-muted-foreground mb-4">
                    Build something cool using RetroUI? Share it with the community.
                </Text>
                <Button asChild>
                    <Link href="https://github.com/Logging-Studio/RetroUI/discussions/102" target="_blank">
                        Add Your Project
                    </Link>
                </Button>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(showcaseData).map(([key, value]) => (
                    <li key={key}>
                        <Card className="hover:shadow">
                            <Card.Header>
                                <Image
                                    src={value.cover}
                                    alt={value.name}
                                    width={600}
                                    height={400}
                                    className="mb-6 border-2 border-muted-foreground"
                                />
                                <div className="flex items-center justify-between gap-2">
                                    <Card.Title>{value.name}</Card.Title>

                                    <Button asChild size="sm" variant="secondary">
                                        <Link href={value.url} target="_blank" rel="noopener noreferrer">
                                            Visit <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </Card.Header>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
}