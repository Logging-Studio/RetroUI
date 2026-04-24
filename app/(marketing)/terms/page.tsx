import { Text } from "@/components/retroui";
import Footer from "@/components/footer";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | RetroUI",
  description: "RetroUI Terms of Service and License Agreement",
};

export default function TermsPage() {
  return (
    <main>
      <section className="container max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Text as="h1" className="uppercase mb-4">
            <span className="[-webkit-text-stroke:6px_var(--foreground)] [paint-order:stroke_fill] text-card tracking-[2px] [text-shadow:6px_6px_0_var(--foreground)]">
              Terms
            </span>
            {" "}of Service
          </Text>
          <Text className="text-muted-foreground">
            Last updated: April 21, 2026
          </Text>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">1. Introduction</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Welcome to RetroUI. By accessing or using our component library, templates, Figma kits, or any related services (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms").
              </p>
              <p>
                These Terms apply to all users of RetroUI, including those using our free (Essentials) tier and paid (Pro/Team) tiers.
              </p>
            </div>
          </section>

          {/* License Grant */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">2. License Grant</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">2.1 Essentials (Free Tier)</p>
              <p>
                The free tier grants you a personal, non-transferable, non-exclusive license to use the open-source components for personal projects only.
              </p>

              <p className="font-medium text-foreground">2.2 Pro License</p>
              <p>
                Pro license holders receive a lifetime, non-transferable license to use all RetroUI components, templates, and resources for commercial projects. This license is valid for up to 3 developer seats.
              </p>

              <p className="font-medium text-foreground">2.3 Team License</p>
              <p>
                Team license holders receive a lifetime, non-transferable license with unlimited developer seats. This license permits white-label use and commercial deployment across multiple projects.
              </p>
            </div>
          </section>

          {/* Permitted Use */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">3. Permitted Use</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>With a valid license, you may:</p>
              <ul className="list-none space-y-2 ml-4">
                <li>→ Use components in unlimited end products (websites, applications, etc.)</li>
                <li>→ Modify and customize components to fit your needs</li>
                <li>→ Create derivative works based on the components</li>
                <li>→ Use components for client projects (Pro/Team licenses only)</li>
                <li>→ Use components in commercial products (Pro/Team licenses only)</li>
              </ul>
            </div>
          </section>

          {/* Restrictions */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">4. Restrictions</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>You may NOT:</p>
              <ul className="list-none space-y-2 ml-4">
                <li>→ Redistribute or resell RetroUI components as-is or as part of a UI kit</li>
                <li>→ Share your license access with individuals outside your licensed seats</li>
                <li>→ Create competing products using RetroUI components</li>
                <li>→ Use components in open-source UI libraries or template marketplaces</li>
                <li>→ Remove or alter any proprietary notices from the components</li>
                <li>→ Share, transfer, or sublicense your access to others</li>
              </ul>
            </div>
          </section>

          {/* Payment & Refunds */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">5. Payment & Refunds</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                RetroUI Pro and Team licenses are one-time purchases with lifetime access to all current and future components.
              </p>
              <p className="font-medium text-foreground">
                No Refund Policy
              </p>
              <p>
                Due to the nature of digital products, we do not offer refunds once you've gained access to the Pro or Team resources. However, if you experience technical issues or have concerns, please contact us at arif@retroui.dev and we'll do our best to help.
              </p>
            </div>
          </section>

          {/* Updates & Support */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">6. Updates & Support</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Your license includes lifetime access to all future updates and new components at no additional cost.
              </p>
              <p>
                Pro license holders receive priority email support. Team license holders receive dedicated Slack channel access and priority support.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">7. Intellectual Property</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                RetroUI components, templates, and associated materials are protected by copyright and other intellectual property laws. Ownership of the components remains with RetroUI.
              </p>
              <p>
                Your license grants you the right to use the components as specified, but does not transfer ownership or intellectual property rights.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">8. Disclaimer of Warranties</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. RetroUI DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">9. Limitation of Liability</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                IN NO EVENT SHALL RETROUI BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF THE SERVICE.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">10. Termination</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                We reserve the right to terminate or suspend your access to the Service if you violate these Terms. Upon termination, you must cease all use of RetroUI components and destroy any copies in your possession.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">11. Changes to Terms</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                We may update these Terms from time to time. We will notify users of material changes via email or through the Service. Continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">12. Governing Law</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                These Terms are governed by the laws of Bangladesh. Any disputes shall be resolved in the courts of Bangladesh.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">13. Contact Information</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="font-medium text-foreground">
                Email: arif@retroui.dev
              </p>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
