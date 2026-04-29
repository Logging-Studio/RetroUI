"use client";

import { Text, Card } from "@/components/base-retroui";
import { componentConfig } from "@/config/components";
import Image from "next/image";
import Link from "next/link";

export default function ComponentsPage() {
  const coreComponents = Object.entries(componentConfig.core)
    .filter(([_, component]) => component.cover)
    .map(([key, component]) => ({
      id: key,
      ...component,
      displayName: component.name.toUpperCase().replace(/-/g, " "),
    }));

  return (
    <main className="min-h-screen lg:ml-12">
        {/* Header */}
        <div className="mb-12">
          <Text as="h1" className="mb-4 uppercase relative">
            <Image src="/decor/react_blue.svg" alt="React" width={80} height={80} className="inline-block absolute -top-4 -left-12" />
            <span className="text-card text-outline-foreground text-shadow-foreground">React</span> Components
          </Text>
          <p className="text-muted-foreground max-w-4xl mb-6">
            Accelerate development with 100+ React components built on Tailwind CSS. They are production-ready, customizable, and easy to integrate.
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreComponents.map((component) => (
            <Link
              key={component.id}
              href={`/docs/components/${component.id}`}
              className="group"
            >
              <Card className="w-full">
                <Card.Content className="p-0">
                  {/* Image Section */}
                    {component.cover && (
                      <Image
                        src={component.cover}
                        alt={component.displayName}
                        width={400}
                        height={200}
                        className="object-contain"
                      />
                    )}

                  {/* Text Section */}
                  <div className="p-4 border-t-2">
                    <Text as="h3" className="mb-2 uppercase">
                      {component.displayName}
                    </Text>
                    <p className="text-sm text-muted-foreground">
                      {component.description}
                    </p>
                  </div>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </div>
    </main>
  );
}
