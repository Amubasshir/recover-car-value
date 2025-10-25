import { DoNotSellForm } from "@/components/do-not-sell-form"
import { PrivacyPolicyDialog } from "@/components/privacy-policy-dialog"
import { TermsOfServiceDialog } from "@/components/terms-of-service-dialog"


export function SiteFooter() {
  return (
  <footer className="bg-background border-t border-border">
      <div className="container max-w-7xl mx-auto px-4 py-12">   

          {/* Links Section */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <DoNotSellForm />
            <span className="text-muted-foreground">|</span>
            <PrivacyPolicyDialog />
            <span className="text-muted-foreground">|</span>
            <TermsOfServiceDialog />
            <span className="text-muted-foreground">|</span>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ&apos;s
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">
              Copyright © 2025 National Accident Relief. All rights reserved.
            </p>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-muted rounded-lg p-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">ATTORNEY ADVERTISING</strong>
              <br />
              <br />
              The choice of a lawyer is an important decision, and it should never be based solely upon an
              advertisement. Before making your choice of any attorney, you should give this matter careful thought. The
              selection of an attorney is an important decision. No representation is made that the legal services to be
              performed are greater than the quality of legal services performed by other lawyers. Every case is
              different and must be judged on its own merit. No representation is made here about your specific rights.
              Cases will be handled by attorneys licensed in the local jurisdiction. Cases may be associated with, or
              referred to, other law firms as co-counsel or referral counsel in this and other jurisdictions. Prior
              results do not guarantee a similar outcome. No representation is made that the lawyers are certified
              specialists or experts in any field of law. Contingent attorney fees are negotiable and not set by law. No
              legal fees or costs will be charged unless a recovery is obtained for the client. Portions of this ad may
              be a simulation or dramatization.
            </p>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Prime Counsel Law Group LLC</strong>
                <br />
                1100 15th St NW
                <br />
                Washington, DC 20005
              </p>
            </div>
          </div>
        </div>
    </footer>
  );
}
