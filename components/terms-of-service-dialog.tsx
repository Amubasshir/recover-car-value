"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function TermsOfServiceDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-primary text-center mb-6">Terms of Service</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            By visiting Prime Counsel Law Group's Sites, you agree to be bound by these Terms of Service. If you do not
            agree with any part of these Terms of Service, you must not use these Sites.
          </p>

          <p className="font-semibold">
            This agreement contains an agreement to arbitrate all claims and contains disclaimers of warranties and
            liability.
          </p>

          <p>
            Welcome to nationalaccidentrecovery.com, prime-lawgroup.com (the "Sites") operated by Prime Counsel Law
            Group, LLC (the "Company", "we", "our" , or "us"). These Sites, and any related features, promotions or
            content provided by the Company or its affiliates shall be referred to collectively as the "Services". The
            Company's Sites provide you access to information for Services. This Terms of Service Agreement (this
            "Agreement") also incorporates the Company's Privacy Policy, currently available at
            nationalaccidentrecovery.com and at bottom of page click Privacy Policy link. The Company and the Services
            are based in the United States.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8">Minors</h3>
          <p>
            The Services are directed at use by adults only and are not intended for use by anyone under the age of 18.
            If you are under 18, do not use this website. If you are aware of someone using these Sites who is under 18,
            please contact us at office@prime-lawgroup.com.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8">Your Use of the Services</h3>
          <p>
            We grant you a limited, non-transferable, fully revocable, non-sublicensable license to use the Services
            solely for your personal, non-commercial use described more fully below, and subject to the restrictions
            provided in this Agreement.
          </p>
          <p>
            We are NOT an organization that provides educational or insurance services or products. Your information
            will be referred to Third Party Providers of services or products.
          </p>
          <p>
            We earn a marketing fee from unaffiliated third-party businesses interested in offering their products and
            services, or their respective affiliates, third-party finder or marketing companies ("Third Party
            Providers") to you. We do not charge you an upfront fee for locating potential offers from Third Party
            Providers.
          </p>
          <p>
            Your license to use the Services is subject to the restrictions provided in this Agreement. You may not,
            while using the Services , engage in conduct or submit any information that: (a) is false, misleading,
            unlawful, threatening, harmful, abusive or infringes another's privacy or publicity or other rights; (b)
            exploits or endangers minors; (c) impersonates or attempts to impersonate any person or entity, conducts
            fraud, hides or attempt to hides your identity; (d) engages in commercial activity (including but not
            limited to sales, contests, or sweepstakes) without the Company's prior written consent; (e) uses the
            Services to advertise or promote competing services; or (f) uses any robot, spider, scraper or other system
            to access the Services for any purpose without our express written permission, or interfere with the proper
            working of the Services in any manner.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8">Company Content</h3>
          <p>
            The Services may contain information, software, text, files, images, video, sounds, applications, and other
            materials or content belonging to us , the Company's licensors, partners, and affiliates, and other third
            parties (collectively, "Company Content"). All Company Content is protected by copyright, trademark, patent,
            trade secret and other laws, and as between you and the Company, we own and retain all rights in the Company
            Content. Except as expressly permitted by us , you may not copy, download, stream capture, reproduce,
            duplicate, archive, upload, modify, translate, publish, broadcast, transmit, retransmit, distribute,
            perform, display, sell or otherwise use any Company Content.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8">Third Party Providers and Your Responsibilities</h3>
          <p>
            The Services include the opportunity for users to request and receive offers for products and services from
            Third Party Providers. When you engage with a Third Party Provider by either requesting further information
            or soliciting direct contact regarding a product or service, you are interacting with the Third Party
            Provider , not with the Company. We are not the agent of any Third Party Provider or you. If you choose to
            use a Third Party Provider and share information with it, the Third Party Provider may use and share your
            data in accordance with the Third Party Provider's privacy policy.
          </p>
          <p>
            We are not responsible for and make no warranties, express or implied, as to the Third Party Providers'
            products or services or their conduct related to your information. Our inclusion of any Third Party Provider
            as part of an offer comparison or other part of the Services does not imply approval or endorsement of the
            Third Party Provider. We do not validate or investigate the licensing, certification or other requirements
            and qualifications of Third Party Providers. It is your responsibility to investigate the Third Party
            Providers you choose to interact with.
          </p>
          <p>
            We make no guarantees that the terms or rates for the products or services offered and made available by
            Third Party Providers are the optimal terms or rates accessible in a particular market. Market conditions,
            approval and qualification requirements may dictate the nature of the products or services offered to you.
            For example, in the case of any services, quotes and rates actually provided by Third Party Providers may be
            higher or lower depending on your individual financial profile, your geographic location and other factors.
            Accordingly, unless expressly stated in writing, nothing contained with respect to the Services shall
            constitute an offer or promise for a product or service.
          </p>
          <p>
            By using the Services , you acknowledge and agree that we are not responsible or liable to you for any
            content or other materials hosted and served from any website other than the Sites. When you access the
            Sites of any Third Party Providers , you do so at your own risk. We encourage you not to provide any
            personally identifiable information to any Third Party Providers unless you know and are comfortable with
            the party with whom you are interacting.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8">Contact with Third Party Providers</h3>
          <p>
            You understand and agree that if you request information regarding the services from a Third Party Provider
            through your use of our Sites , we will share the information that you provide us with the corresponding
            Third Party Providers. Third Party Providers may keep any information that you provide them, including any
            incomplete forms transmitted through the Services regardless of whether you actually purchase the products
            or Services offered. You agree to notify Third Party Providers directly if and when you no longer wish to
            receive information or any further correspondence.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8">DISCLAIMERS</h3>
          <p>
            Your use of the Services is at your sole risk. The Services are provided on an "as is", "as available", and
            "with all faults" basis, and without warranty, or condition, express, implied or statutory. You agree that
            you will be solely responsible for any damages or losses that arise from your use of the Services.
          </p>
          <p>
            To the fullest extent permitted by the applicable law, the company disclaims all warranties and conditions
            of any kind, express, implied or statutory, in connection with the Services , including but not limited to
            the implied warranties or merchantability, fitness for a particular purpose, and non-infringement. In
            particular, we make no warranties or representations that (A) the Services will operate uninterrupted,
            timely, secure or error-free, (B) You will receive any specific results from using the Services , (C) Any
            defects related to the Services will be corrected, (D) The Services are free of computer bugs, viruses or
            other harmful components, Or (E) Any information, content or materials made available through the Services
            will be accurate, useful, timely or reliable.
          </p>
          <p>
            We further make no warranties or representations with respect to any Third Party Provider's services or
            products. Any purchase or use of the products or services offered by third parties through the Sites or
            links to third party sites from the Sites is made at your own risk.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8">LIMITATION OF LIABILITY</h3>
          <p>
            To the fullest extent permitted by law, in no event will the company or its parents, subsidiaries,
            affiliates or partners, or any of their officers, directors, managers, members, shareholders, employees,
            contractors, third parties, Third Party Providers, or agents (collectively, the "Affiliated Parties"), be
            liable for any losses or damages of any kind in connection with your use of the Services , included but not
            limited to (A) Any direct, indirect, incidental, special, punitive or consequential damages, (B) Any
            property damage, data loss, personal inquiry, or technical malfunctions, or interruptions, or (C) Any
            damages or losses related to the unauthorized access and use of the Services or related equipment, or any
            computer bugs, viruses, harmful programs or similar mechanism transmitted through or in connection with the
            Services. If you are dissatisfied with any portion of the Services , your sole and exclusive remedy is to
            discontinue the uses of the Services.
          </p>
          <p>
            You acknowledge and agree that Third Party Providers are solely responsible for any products and Services
            that they may provide to you and that we shall not be liable for any losses, costs, damages or claims in
            connection with, arising from or related to your use of Third Party Providers' products or services.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8">
            Agreement to Pre-Arbitration Notification of Dispute
          </h3>
          <p>
            This Agreement provides for final, binding arbitration of all disputed claims (discussed immediately below).
            The Company and you agree, however, that it would be preferable to discuss and resolve any disputes before
            arbitration proceedings or any other proceedings authorized herein are initiated. In the event of a dispute,
            you shall send an email message to us at office@prime-lawgroup.com briefly summarizing the claim and the
            request for relief. If the dispute is not resolved within 60 days after the email is received, you may
            proceed to initiate arbitration proceedings, or any other proceedings authorized herein.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8">Governing Law</h3>
          <p>
            The laws of the State of California, and applicable federal law (including the Federal Arbitration Act),
            will govern this Agreement and any claim or dispute relating thereto or to your use of the Services ,
            without regard to its conflicts or choice of law rules.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8">Arbitration Agreement and Class Action Waiver</h3>
          <p>
            Any controversy, claim or dispute arising from or relating to this Agreement , your use of the Services , or
            your use of Third Party Providers' services shall be settled by arbitration using a single arbitrator
            administered by the American Arbitration Association under its Commercial Arbitration Rules and
            Supplementary Procedures for Consumer Related Disputes (collectively, the "Rules"). Unless a hearing is
            requested (which may be conducted by telephone), the parties will submit their arguments and evidence to the
            arbitrator in writing, and the arbitrator will make an award based only on the documents. Under no
            circumstances shall any party be required to travel to participate in the arbitration.
          </p>
          <p>
            If you decide to commence arbitration, the provider will require you to pay a filing fee based on the amount
            of the claim. We will reimburse you for any filing fees incurred in excess of $125 after arbitration is
            initiated, and you will be reimbursed the initial $125 fee if the arbitrator ultimately rules in your favor.
            This arbitration agreement is subject to the Federal Arbitration Act and is enforceable pursuant to its
            terms on a self-executing basis. Either party may seek enforcement of this provision in any court of
            competent jurisdiction.
          </p>
          <p>
            The arbitrator shall exclusively determine any and all challenges to the arbitrability of a claim. The
            arbitral award shall be judicially enforceable. Any court of competent jurisdiction may, and upon request
            shall, enter judgment on the arbitral award. Either party may seek confirmation (judgment on the award)
            and/or enforcement in any court of competent jurisdiction. The arbitrator shall not have the power to commit
            errors of law or legal reasoning, make clearly erroneous factual findings, or abuse his or her discretion,
            and the award may be vacated or corrected on appeal to a court of competent jurisdiction for any such error.
          </p>
          <p>
            Both you and the Company waive the right to bring any claim covered by this dispute resolution provision as
            a class, consolidated, representative, collective, or private attorney general action, or to participate in
            a class, consolidated, representative, collective, or private attorney general action regarding any claim
            covered by this dispute resolution provision brought by anyone else. Notwithstanding any provision in the
            Rules to the contrary, the arbitrator shall not have the authority or any jurisdiction to hear the
            arbitration as a class, consolidated, representative, collective, or private attorney general action or to
            consolidate, join, or otherwise combine the claims of different persons into one proceeding.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8">
            Opting-Out of Arbitration Agreement and Class Action Waiver
          </h3>
          <p>
            You may elect to opt out (exclude yourself) from the final, binding arbitration procedure and the class
            action waiver by sending a notice within 30 days of using the Services to office@prime-lawgroup.com that
            specifies (1) your name, (2) your mailing address, and (3) your request to be excluded from the final,
            binding arbitration procedure and class action waiver set forth herein. All other terms shall continue to
            apply, including the requirement to pre-dispute notification and mediation, and non-arbitrated claims or
            disputes arising out of or relating to this Agreement or the use of any of the Services will be resolved
            exclusively in the state or federal courts in San Diego County, California with the parties consent to such
            exclusive jurisdiction and venue.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8">Indemnification</h3>
          <p>
            You agree to indemnify, defend and hold harmless the Company and the Affiliated Parties from and against any
            and all claims, demands, obligations, losses, liabilities, damages, fines, penalties, costs and expenses
            (including reasonable attorneys' fees) arising from or related to: (a) your use of the Services; (b) your
            use of or interaction with any Third Party Provider or other third party websites, software or other
            technology; and (c) your breach of this Agreement, applicable laws, or third party rights. Your
            indemnification obligation will survive this Agreement and your use of the Services.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8">Modifications</h3>
          <p>
            We may modify this Agreement at any time, and each such modification will be effective upon notice to you
            (including posting on the Sites ). All material modifications will apply prospectively only. It is therefore
            important that you review this Agreement regularly. You may also receive a copy of this Agreement by
            emailing us at office@prime-lawgroup.com.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8">General Provisions</h3>
          <p>
            Section titles in this Agreement are for convenience only and have no legal or contractual effect. Any
            failure by the Company to enforce any provision of this Agreement shall not operate as a waiver of such
            right or provision, and this Agreement operates to the fullest extent permissible by law. If any provision
            of this Agreement is unlawful, void or unenforceable, that provision is deemed severable from this Agreement
            and does not affect the validity and enforceability of any remaining provisions. This Agreement , including
            the Privacy Policy, supersedes any previous agreement and constitutes the entire agreement between you and
            the Company with respect to the Services. You and the Company are independent entities, and nothing in this
            Agreement , or through the performance thereof, will create any employment, agency, sales representative,
            franchise or other fiduciary relationship between the Company and you.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
