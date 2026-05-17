import { Text } from "@/components/retroui";
import Footer from "@/components/footer";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RetroUI",
  description: "RetroUI Privacy Policy - How we collect, use, and protect your data",
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="container max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Text as="h1" className="uppercase mb-4">
            <span className="[-webkit-text-stroke:6px_var(--foreground)] [paint-order:stroke_fill] text-card tracking-[2px] [text-shadow:6px_6px_0_var(--foreground)]">
              Privacy
            </span>
            {" "}Policy
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
                RetroUI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, component library, and related services.
              </p>
              <p>
                By using RetroUI, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">2. Information We Collect</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">2.1 Personal Information</p>
              <p>We may collect the following personal information:</p>
              <ul className="list-none space-y-2 ml-4">
                <li>→ Name and email address (when you create an account or purchase a license)</li>
                <li>→ Payment information (processed securely through third-party payment processors)</li>
                <li>→ Student status and .edu email (for student discount verification)</li>
                <li>→ Communication preferences</li>
              </ul>

              <p className="font-medium text-foreground mt-4">2.2 Usage Data</p>
              <p>We automatically collect certain information when you use our Service:</p>
              <ul className="list-none space-y-2 ml-4">
                <li>→ IP address and browser type</li>
                <li>→ Pages visited and time spent on pages</li>
                <li>→ Device information and operating system</li>
                <li>→ Referring URLs and clickstream data</li>
              </ul>

              <p className="font-medium text-foreground mt-4">2.3 Cookies and Tracking</p>
              <p>
                We use cookies and similar tracking technologies to track activity on our Service and store certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
              </p>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">3. How We Use Your Information</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>We use the collected information for various purposes:</p>
              <ul className="list-none space-y-2 ml-4">
                <li>→ To process your purchases and manage your license</li>
                <li>→ To provide customer support and respond to your inquiries</li>
                <li>→ To send you updates about new components, features, and updates</li>
                <li>→ To monitor and analyze usage patterns to improve our Service</li>
                <li>→ To detect and prevent fraud or unauthorized access</li>
                <li>→ To send you promotional materials (you can opt-out at any time)</li>
                <li>→ To verify student status for discount eligibility</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">4. Third-Party Services</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>We use the following third-party services that may collect information:</p>

              <p className="font-medium text-foreground">Payment Processing</p>
              <p>
                We use secure third-party payment processors to handle transactions. We do not store your full credit card information on our servers.
              </p>

              <p className="font-medium text-foreground">Analytics</p>
              <p>
                We use Vercel Analytics and Speed Insights to understand how users interact with our Service. These tools may collect anonymized usage data.
              </p>

              <p className="font-medium text-foreground">Email Services</p>
              <p>
                We may use email service providers to send you updates, newsletters, and support communications.
              </p>

              <p className="font-medium text-foreground">Discord</p>
              <p>
                Our community Discord server is subject to Discord's privacy policy. We do not control how Discord processes your data.
              </p>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">5. Data Sharing and Disclosure</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>We do not sell, trade, or rent your personal information to third parties.</p>
              <p>We may share your information only in the following circumstances:</p>
              <ul className="list-none space-y-2 ml-4">
                <li>→ With service providers who help us operate our business (payment processors, email services, etc.)</li>
                <li>→ When required by law or to respond to legal process</li>
                <li>→ To protect our rights, property, or safety, or that of our users</li>
                <li>→ In connection with a business transfer (merger, acquisition, etc.)</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">6. Data Security</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p>
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee its absolute security.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">7. Data Retention</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                We retain your personal information for as long as necessary to provide our Service and fulfill the purposes outlined in this Privacy Policy. We will retain and use your information to comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
              <p>
                License purchase information is retained indefinitely to maintain your lifetime access to RetroUI.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">8. Your Privacy Rights</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-none space-y-2 ml-4">
                <li>→ Access: Request a copy of the personal information we hold about you</li>
                <li>→ Correction: Request correction of inaccurate or incomplete data</li>
                <li>→ Deletion: Request deletion of your personal information (subject to legal requirements)</li>
                <li>→ Opt-out: Unsubscribe from marketing communications at any time</li>
                <li>→ Data portability: Request transfer of your data to another service</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at arif@retroui.dev
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">9. Children's Privacy</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </div>
          </section>

          {/* International Data Transfers */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">10. International Data Transfers</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Your information may be transferred to and maintained on servers located outside of your country, where data protection laws may differ. By using our Service, you consent to the transfer of your information to Bangladesh and other countries.
              </p>
            </div>
          </section>

          {/* Do Not Track */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">11. Do Not Track Signals</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                We do not currently respond to Do Not Track (DNT) browser signals. We may implement DNT support in the future and will update this policy accordingly.
              </p>
            </div>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">12. Changes to This Privacy Policy</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically for any changes. Your continued use of the Service after changes are posted constitutes acceptance of those changes.
              </p>
            </div>
          </section>

          {/* Contact Us */}
          <section className="border-2 border-border bg-card p-6">
            <Text as="h3" className="mb-4">13. Contact Us</Text>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <p className="font-medium text-foreground">
                Email: arif@retroui.dev
              </p>
              <p>
                We will respond to your inquiry within a reasonable timeframe.
              </p>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
