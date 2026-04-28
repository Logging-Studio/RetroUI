import { templateConfig } from "@/config/templates";
import { notFound } from "next/navigation";
import { Text, Button, Badge } from "@/components/base-retroui";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Package } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { DownloadButton } from "@/components/DownloadButton";

interface TemplatePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TemplatePage(props: TemplatePageProps) {
  const params = await props.params;

  const template = templateConfig.templates.find(
    (t) => t.slug === params.slug
  );

  if (!template) {
    notFound();
  }

  const user = await getCurrentUser();
  const isProUser = user?.isPro === true;

  return (
    <main className="min-h-screen pt-16 space-y-12">
      {/* Header with Title and Preview Button */}
      <section className="container max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mb-6">
          <Text as="h1" className="text-4xl lg:text-5xl">
            {template.name}
          </Text>
          <Text className="text-muted-foreground mt-2">
            {template.description}
          </Text>
        </div>

        <div className="flex gap-4">
          {isProUser ? (
            <DownloadButton slug={params.slug} templateName={template.name} />
          ) : (
            <Button render={<Link href="/pricing">Get Full Kit</Link>} />
          )}
          <Button variant="outline" className="bg-card" render={<Link href={template.live_demo_url} target="_blank">Live Demo</Link>} />
        </div>
      </section>

      {/* Preview Images Grid */}
      <section className="container max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-3 gap-8">
          {template.preview_images.slice(0, 3).map((image, index) => (
            <div key={index} className="relative group">
              <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black" style={{ backgroundColor: template.color }} />
              <div className="relative border-2 border-black bg-white overflow-hidden">
                <Image
                  src={image}
                  alt={`${template.name} preview ${index + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content: Left Description + Right Sidebar */}
      <section className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Description and Features */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <Text as="h2" className="mb-6">
                About this Template
              </Text>
              <div dangerouslySetInnerHTML={{ __html: template.about }} />
            </div>
            <div>
              <Text as="h2" className="mb-6">
                Built With
              </Text>
              <div className="flex flex-wrap gap-3">
                {template.tech_stack.map((tech, index) => {
                  const badgeColors = [
                    "bg-gray-300",
                    "bg-blue-300",
                    "bg-blue-400",
                    "bg-teal-300",
                    "bg-purple-300",
                    "bg-red-300",
                    "bg-yellow-300"
                  ];
                  return (
                    <Badge key={index} variant="outline" className={`${badgeColors[index % badgeColors.length]} py-1`}>
                      {tech}
                    </Badge>
                  );
                })}
              </div>
            </div>
            <div>
              <Text as="h2" className="mb-6">
                Features
              </Text>
              <div className="space-y-3">
                {template.features.map((feature, index) => (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary border rounded-full mt-2 flex-shrink-0" />
                    <Text className="font-medium">{feature}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Template Info */}
          <div className="space-y-8">
            {/* Template Details Card */}
            <div className="relative">
              <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-[#4ECDC4]" />
              <div className="relative bg-white border-2 border-black p-6 space-y-6">
                {/* Details */}
                <div className="space-y-4">
                  <div className="flex justify-between gap-2">
                    <Text className="text-muted-foreground">Category</Text>
                    <Text className="font-medium capitalize">{template.type}</Text>
                  </div>

                  <div className="flex justify-between gap-2">
                    <Text className="text-muted-foreground">Platform</Text>
                    <Text className="font-medium capitalize">{template.platform}</Text>
                  </div>

                  <div className="flex justify-between gap-2">
                    <Text className="text-muted-foreground">Released</Text>
                    <Text className="font-medium">{template.release_date}</Text>
                  </div>

                  <div className="flex justify-between gap-2">
                    <Text className="text-muted-foreground">Version</Text>
                    <Text className="font-medium">1.0.0</Text>
                  </div>

                  <div className="flex justify-between gap-2">
                    <Text className="text-muted-foreground">Last Updated</Text>
                    <Text className="font-medium">{template.release_date}</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-7xl mx-auto px-4 py-16 mb-16">
        <div className="relative">
          <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-[#FF6B6B]" />
          <div className="relative bg-white border-2 border-black p-12 text-center">
            <Text as="h2" className="mb-4 text-3xl uppercase">
              Ready to get started?
            </Text>
            <Text className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
              Get instant access to {template.name.split('|')[0].trim()} and start building your project today.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isProUser ? (
                <DownloadButton slug={params.slug} templateName={template.name} />
              ) : (
                <div className="relative inline-block group">
                  <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 bg-primary transition-all duration-200" />
                  <button className="px-8 py-3 font-head border-2 transition-all duration-200 relative bg-card shadow-none group-hover:translate-x-1 group-hover:translate-y-1 hover:shadow-none active:translate-x-1.5 active:translate-y-1.5">
                    Get Access Now
                  </button>
                </div>
              )}
              <Button variant="link" className="text-lg">
                View Live Preview <ArrowUpRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return templateConfig.templates.map((template) => ({
    slug: template.slug,
  }));
}
