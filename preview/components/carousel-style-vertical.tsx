import * as React from "react"

import { Card } from "@/components/retroui/Card"
import {
    Carousel,
} from "@/components/retroui/Carousel"

const cards = [
    {label: "1", color: "purple-300"},
    {label: "2", color: "green-300"},
    {label: "3", color: "red-300"},
    {label: "4", color: "yellow-300"},
    {label: "5", color: "blue-300"},
]
export default function CarouselStyleVertical() {
    return (
        <Carousel opts={{
            align: "start",
        }} className="w-full max-w-xs" orientation="vertical">
            <Carousel.Content className="h-[300px]">
                {cards.map((card, index) => (
                    <Carousel.Item key={index} className="md:basis-1/2">
                        <div className="p-1">
                            <Card className={`w-full h-[200px] bg-${card.color} rounded-lg`}>
                                <Card.Content className="flex h-full w-full items-center justify-center p-6">
                                    <span className="text-4xl font-semibold">{card.label}</span>
                                </Card.Content>
                            </Card>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel.Content>
            <Carousel.Previous className="rounded-full shadow-sm" />
            <Carousel.Next className="rounded-full shadow-sm" />
        </Carousel>
    )
}
