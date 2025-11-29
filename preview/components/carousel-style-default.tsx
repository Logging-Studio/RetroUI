import * as React from "react"

import { Card } from "@/components/retroui/Card"
import {
    Carousel,
} from "@/components/retroui/Carousel"

export default function CarouselStyleDefault() {
    return (
        <Carousel className="w-full max-w-xs">
            <Carousel.Content>
                {Array.from({ length: 5 }).map((_, index) => (
                    <Carousel.Item key={index}>
                        <div className="p-4">
                            <Card className="w-full">
                                <Card.Content className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-4xl font-semibold">{index + 1}</span>
                                </Card.Content>
                            </Card>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel.Content>
            <Carousel.Previous />
            <Carousel.Next />
        </Carousel>
    )
}
