"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function PrivacyPolicyDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-primary text-center mb-6">PRIVACY POLICY</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            Thank you for visiting nationaccidentrelief.com, prime-lawgroup.com, and other related sites.(the "Sites").
            These Sites are Internet properties of Prime Counsel Law Group, LLC ("Company," "we," "our" or "us"). These
            Sites, and any related features, promotions or content provided by the Company or its affiliates shall be
            referred to collectively as the "Services". The Company's Sites provide you access to information for
            Services. This Prime Counsel Law Group, LLC Privacy Policy ("Privacy Policy") covers our treatment of
            personal information and other information that we collect when an end-user visitor to these Sites ("User,"
            "you" or "your"): (a) accesses or uses the Sites; (b) accesses and/or views any of the: (i) links to
            third-party education-related resources and other information ("Third-Party Links"); and/or (ii) blog posts,
            text, video and/or other information pertaining to Services made available on these Sites (the
            "Informational Content," and together with the Third-Party Links, the "Content"); (c) accesses the comments
            sections associated with the blog posts and/or other interactive features made available on these Sites
            ("Interactive Services"); and/or (d) utilizes the various contact forms and/or contact information made
            available on these Sites as a means to contact directly, or request to be contacted by, us and/or our
            third-party services and online aggregators ("Third-Party Service Providers") (collectively, the "Contact
            Services," and together with these Sites, Content and Interactive Services, the "Site Offerings").
          </p>

          <p>
            Capitalized terms not defined herein shall have the meanings set forth in the Website Terms of Service
            ("Terms of Service"), currently available at nationalaccidentrecovery.com and at bottom of page click Terms
            of Service link.
          </p>

          <p className="font-bold text-foreground">
            IF YOU DO NOT AGREE TO TERMS OF THIS PRIVACY POLICY IN THEIR ENTIRETY, YOU MAY NOT ACCESS OR OTHERWISE USE
            THE SITES OFFERINGS.
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Your California Privacy Rights</h3>
          <p>
            If you are a resident of the State of California and would like to learn how your "Personal Information" (as
            defined in the Shine the Light Law, Cal. Civ. Code § 1798.83) is shared with third-parties, what categories
            of personal information that we have shared with third-parties in the preceding year, as well as the names
            and addresses of those third-parties, please e-mail us at: office@prime-lawgroup.com; or send us mail to:
            1100 15th St NW Washington, D.C. 20005
          </p>

          <p>
            Further, if you are a resident of the State of California and would like to opt-out from the disclosure of
            your personal information to any third-party for marketing purposes, please e-mail us at:
            office@prime-lawgroup.com; or send us mail to: 1100 15th St NW Washington, D.C. 20005
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Personal Information Collected</h3>
          <p>
            For the purposes of this Privacy Policy, "Personal Information" shall mean individually identifiable
            information from or about an individual. We collect personal information when you access certain of the
            Sites Offerings and complete the required information request form and/or otherwise provide such information
            to us. Where a User attempts to utilize the Contact Services, that User may be required to submit, and we
            may collect, some or all of the following information: (a) the User's e-mail address; (b) the User's full
            name; (c) the User's telephone number; (d) certain information pertaining to the User's education profile;
            and (e) any other information collected via the Contact Services form.
          </p>

          <p>
            Upon entering Contact Data and clicking on the applicable submission button on the Sites : (i) We may pass
            your Contact Data along to one (1) or more of its marketing partners and/or affiliates (collectively,
            "Marketing Partners") or Third-Party Service Providers; (ii) you may be contacted by us and/or one (1) or
            more of its Marketing Partners or Third-Party Service Providers regarding your request; and/or (iii) you may
            be contacted by one (1) or more Marketing Partners with third-party offers that we feel may be of interest
            to you. Where Company contacts you in connection with your submission of Contact Data, a Company
            representative may request additional information over the telephone including some or all of the following:
            (A) User date of birth; (B) User mailing address; (C) certain information pertaining to the User's education
            profile; and (D) any other information requested by the applicable Company representative.
          </p>

          <p>
            Please be advised that Company does not itself offer educational or insurance services, and the ultimate
            terms and conditions of any products and/or services made available via the Contact Services will be
            determined by the applicable Third-Party Service Providers. You understand and agree that we shall not be
            liable to you or any third party for any products and/or services offered by any Third-Party Service
            Providers.
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Use Of Personal Information</h3>
          <p>
            By submitting your personal information by and through the Sites Offerings, you agree that we may share,
            sell, rent, lease or otherwise provide that personal information to any third-party for any purpose
            permitted by law, and we may work with other businesses to bring selected third-party offers to you. These
            businesses and third-parties may include, but are not limited to: (a) providers of direct marketing services
            and applications, including lookup and reference, data enhancement, suppression and validation; (b) e-mail
            marketers; (c) telemarketers (where permitted by applicable law); and (d) direct marketers. We may also use
            your personal information to send you promotional messages regarding various Company products and/or
            services, as well as third-party products and/or services that we think may be of interest to you.
          </p>

          <p>
            Without limiting the foregoing, with your permission, we may share your User Data with those Third-Party
            Service Providers that you request to be contacted by. These Third-Party Service Providers may use your User
            Data to offer you products and/or services, and for any other lawful purposes, subject to any restrictions
            contained herein. The information that you supply directly to any Third-Party Service Provider shall be
            governed by the applicable Third-Party Service Provider's privacy policy. Where you submit personal
            information, we use the personal information that you make available to personalize your experience with the
            Sites and to facilitate the delivery of the applicable Sites Offerings to you, including to respond to any
            inquiries made by you.
          </p>

          <p>
            You also agree that we may contact you at any time with updates and/or any other information that we may
            deem appropriate for you to receive in connection with your continued use of the Sites Offerings, and to
            keep you informed of our other products and Services.
          </p>

          <p>
            We may also provide your information to third-party companies and individuals to perform certain functions
            on our behalf. Examples include sending direct and electronic mail, removing duplicate information from User
            lists, analyzing data and providing marketing analysis. The agents performing these limited functions on our
            behalf shall have access to our Users' personal information as needed to perform these functions for us, but
            we do not permit them to use User personal information for other purposes.
          </p>

          <p>
            We will also use your personal information with your permission, for customer service, to provide you with
            information that you may request, to customize your experience with the Sites Offerings and/or to contact
            you when necessary in connection with your use of the Sites Offerings. We may also use your personal
            information for internal business purposes, such as analyzing and managing our service offerings including,
            without limitation, the Sites Offerings. We may also combine the information we have gathered about you with
            information from other sources.
          </p>

          <p>
            By submitting your personal information by and through the Sites Offerings, and thereby providing your
            permission, you agree that such act constitutes an inquiry and/or application for purposes of the Amended
            Telemarketing Sales Rule (16 CFR §310 et seq.), as amended from time to time (the "Rule") and applicable
            state do-not-call regulations. As such, notwithstanding that your telephone number may be listed on the
            Federal Trade Commission's Do-Not-Call List, and/or on applicable state do-not-call lists, we retain the
            right to contact you via telemarketing in accordance with the Rule and applicable state do-not-call
            regulations.
          </p>

          <p>
            Where you provide "prior express written consent" within the meaning of the Telephone Consumer Protection
            Act (47 USC § 227), and its implementing regulations adopted by the Federal Communications Commission (47
            CFR § 64.1200), as amended from time-to-time ("TCPA"), you consent to receive telephone calls from Company
            and/or its designated Third-Party Service Provider(s), including artificial voice calls, pre-recorded
            messages and/or calls (including SMS text messages) delivered via automated technology, to the telephone
            number(s) that you provided. Please note that you are not required to provide this consent in order to
            obtain access to the Sites Offerings, and your consent simply allows Company and its designated Third-Party
            Service Providers, as applicable, to contact you via these means.
          </p>

          <p>
            Please be advised that by agreeing to this Privacy Policy, you are obligated to immediately inform us if and
            when the telephone number that you have previously provided to us changes. Without limiting the foregoing,
            if you: (i) have your telephone number reassigned to another person or entity; (ii) give up your telephone
            number so that it is no longer used by you; (iii) port your telephone number to a landline or vice versa; or
            (iv) otherwise stop using that telephone number for any reason (collectively "Phone Number Change"), you
            agree that you shall promptly notify Company of the Phone Number Change via e-mail at:
            office@prime-lawgroup.com, or by using one of the methods set forth in the "Contact Us" section below.
          </p>

          <p>
            We reserve the right to release current or past personal information: (A) in the event that we believe that
            the Sites Offerings are being or have been used in violation of the Terms and Conditions or to commit
            unlawful acts; (B) if the information is subpoenaed; provided, however, that, where permitted by applicable
            law, we shall provide you with e-mail notice, and opportunity to challenge the subpoena, prior to disclosure
            of any personal information pursuant to a subpoena; or (C) if we are sold, merge with a third-party, are
            acquired or are the subject of bankruptcy proceedings; provided, however, that if Company is involved in a
            bankruptcy proceeding, merger, acquisition or sale of all or a portion of its assets, you will be notified
            via email and/or a prominent notice on the Sites of any change in ownership or uses of your personal
            information, as well as any choices that you may have regarding your personal information.
          </p>

          <p>
            You hereby consent to the disclosure of any record or communication to any third-party when we, in our sole
            discretion, determine the disclosure to be appropriate including, without limitation, sharing your e-mail
            address with third-parties for suppression purposes in compliance with applicable law, including the
            CAN-SPAM Act of 2003, as amended from time to time. Users should also be aware that courts of equity, such
            as U.S. Bankruptcy Courts, might have the authority under certain circumstances to permit personal
            information to be shared or transferred to third-parties without permission.
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Non-Personal Information Collection And Use</h3>

          <h4 className="text-lg font-semibold text-foreground mt-6">IP Addresses/Browser Type</h4>
          <p>
            We may collect certain non-personally identifiable information about you and your desktop computer and/or
            mobile device when you visit many of the pages of the Sites. This non-personally identifiable information
            includes, without limitation, the type of browser that you use (e.g., Safari, Chrome, Internet Explorer),
            your IP address, the type of operating system that you use (e.g., Windows or iOS) and the domain name of
            your Internet service provider (e.g., Verizon, AT&T). We use the non-personally identifiable information
            that we collect to improve the design and content of the Sites Offerings and to enable us to personalize
            your Internet experience. We also may use this information in the aggregate to analyze usage of the Sites
            Offerings.
          </p>

          <h4 className="text-lg font-semibold text-foreground mt-6">Cookies</h4>
          <p>
            When a User visits the Sites, we send one (1) or more cookies and/or gif files (collectively, "Cookies") to
            assign an anonymous, unique identifier to the applicable User's computer. A Cookie is a piece of data stored
            on your hard drive containing non-personally identifiable information about you. Cookies have many benefits
            to enhance your experience at the Sites. To find out more about Cookies, please visit www.cookiecentral.com.
            We use Cookies to improve the quality of the Sites Offerings, including for storing User preferences and
            tracking Site-User trends (such as pages opened and length of stay at the Sites ).
          </p>

          <p>
            Most Internet browsers are initially set up to accept Cookies, but you can reset your browser to refuse all
            Cookies or to indicate when a Cookie is being sent. To disable and reject certain Cookies, follow the
            instructions associated with your Internet browser. Even in the case where a User rejects a Cookie, he or
            she may still use the Sites Offerings; provided, however, that certain functions of the Sites Offerings may
            be impaired or rendered inoperable if the use of Cookies is disabled. We reserve the right to retain Cookie
            data indefinitely.
          </p>

          <p>
            Company reserves the right to transfer and/or sell aggregate or group data about Users of the Sites
            Offerings for lawful purposes. Aggregate or group data is data that describes the demographics, usage and
            other characteristics of Sites Offerings Users as a group, without disclosing personally identifiable
            information.
          </p>

          <h4 className="text-lg font-semibold text-foreground mt-6">Behavioral Tracking/Advertising</h4>
          <p>
            We, as well as third party entities such as Google® and Facebook®, use Cookies, pixels and other tracking
            technology (collectively, "Tracking Technology") in connection with the Sites for purposes of tracking
            Users' activities (such as websites visited, advertisements selected and pages viewed) after they leave the
            Sites. Company, and its third-party partners, use this Tracking Technology to target applicable Users with
            advertisements featuring Company products and/or Services, as well as third-party products and/or services,
            that may be of interest to applicable Users.
          </p>

          <p>
            In general, Users may be able to disable some, or all, of this tracking activity by utilizing the "Do Not
            Track" setting or similar options within most major Internet browsers. In addition, Users may be able to
            opt-out of this form of tracking utilizing the options made available by the Network Advertising Initiative
            or Digital Advertising Alliance. Further, Users can opt-out of certain Google®-related tracking technology,
            and customize the Google® Display Network ads that they receive, by visiting the Google® Ads Settings.
            Google® also recommends installing the Google® Analytics Opt-out Browser Add-on for your web browser, which
            is available here. To the greatest extent permissible under applicable law, we are not responsible for the
            tracking practices of third-parties in connection with the Sites.
          </p>

          <p>
            Google® is a registered trademark of Google, Inc. ("Google") and Facebook® is a registered trademark of
            Facebook, Inc. ("Facebook"). Please be advised that Company is not in any way affiliated with Google or
            Facebook, nor are the Sites Offerings endorsed, administered or sponsored by Google or Facebook.
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Interactive Services</h3>
          <p>
            If you engage in any interaction with us, other Users or any third-party via the Interactive Services, you
            should be aware that the personal information that you submit by and through the Interactive Services can be
            read, collected and/or used by other Users of these services, and could be used to send you unsolicited
            messages or otherwise to contact you without your consent or desire. We are not responsible for the personal
            information that you choose to submit via the Interactive Services.
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Third-Party Websites</h3>
          <p>
            These Sites may contain links to third-party owned and/or operated websites including, without limitation,
            websites owned and/or operated by Company's Third-Party Service Providers and/or Marketing Partners. We are
            not responsible for the privacy practices or the content of such entities and/or websites. In some cases,
            you may be able to make a purchase through one of these third-party websites. In these instances, you may be
            required to provide certain information, such as a credit card number, to register or complete a transaction
            at such website. These third-party websites and entities have separate privacy and data collection practices
            and we have no responsibility or liability relating to them.
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Third Party Processors</h3>
          <p>
            Our carefully selected partners and service providers may process personal information about you on our
            behalf as described below:
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Security</h3>
          <p>
            We endeavor to safeguard and protect our Users' personal information. When Users make personal information
            available to us, their personal information is protected both online and offline (to the extent that we
            maintain any personal information offline). Where our registration/application process prompts Users to
            enter sensitive information (such as financial information or Social Security Number), and when we store and
            transmit such sensitive information, that information is encrypted with advanced TLS (Transport Layer
            Security).
          </p>

          <p>
            Access to your personal information is strictly limited, and we take reasonable measures to ensure that your
            personal information is not accessible to the public. All of our Users' personal information is restricted
            in our offices, as well as the offices of our third-party service providers. Only employees or third-party
            agents who need User personal information to perform a specific job are granted access to User personal
            information. Our employees are dedicated to ensuring the security and privacy of all User personal
            information. Employees not adhering to our firm policies are subject to disciplinary action. The servers
            that we store User personal information on are kept in a secure physical environment. We also have security
            measures in place to protect the loss, misuse and alteration of personal information under our control.
          </p>

          <p>
            Please be advised, however, that while we take every reasonable precaution available to protect your data,
            no storage facility, technology, software, security protocols or data transmission over the Internet or via
            wireless networks can be guaranteed to be 100% secure. Computer hackers that circumvent our security
            measures may gain access to certain portions of your personal information, and technological bugs, errors
            and glitches may cause inadvertent disclosures of your personal information; provided, however, that any
            attempt to breach the security of the network, our servers, databases or other hardware or software may
            constitute a crime punishable by law. For the reasons mentioned above, we cannot warrant that your personal
            information will be absolutely secure. Any transmission of data at or through the Sites, other Sites
            Offerings or otherwise via the Internet or wireless networks, is done at your own risk.
          </p>

          <p>
            In compliance with applicable federal and state laws, we shall notify you and any applicable regulatory
            agencies in the event that we learn of an information security breach with respect to your personal
            information. You will be notified via e-mail in the event of such a breach. Please be advised that notice
            may be delayed in order to address the needs of law enforcement, determine the scope of network damage, and
            to engage in remedial measures.
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Minors</h3>
          <p>
            Visitors under eighteen (18) years of age are not permitted to use and/or submit their personal information
            at the Sites. We do not knowingly solicit or collect information from visitors under eighteen (18) years of
            age. We encourage parents and guardians to spend time online with their children and to participate and
            monitor the interactive activities of their children.
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Opt-Out/Unsubscribe</h3>
          <p>
            To opt-out of receiving e-mail and other forms of communications from us, you can: (a) follow the
            instructions included in the applicable e-mail message or other communication; or (b) e-mail us at:
            office@prime-lawgroup.com
          </p>

          <p>
            Notwithstanding the foregoing, we may continue to contact you for the purpose of communicating information
            relating to your request for Sites Offerings, as well as to respond to any inquiry or request made by you.
            To opt-out of receiving Sites Offerings-related and/or inquiry response-related messages from us, you must
            cease requesting and/or utilizing the Sites Offerings and/or cease submitting inquiries to us, as
            applicable.
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Deleting, Modifying And Updating Your Information</h3>
          <p>
            At your request, we will: (a) inform you of what personal information we have on file for you; (b) amend the
            personal information that we have on file for you; and/or (c) remove personal information that you have
            provided to us, or that we have collected. You may do so by e-mailing us at: office@prime-lawgroup.com. We
            ask individual Users to identify themselves and the information requested to be accessed, corrected or
            removed before processing such requests, and, to the extent permitted by applicable law, we may decline to
            process requests that are unreasonably repetitive or systematic, require disproportionate technical effort,
            jeopardize the privacy of others or would be extremely impractical (for instance, requests concerning
            information residing on backup tapes).
          </p>

          <p>
            Please be advised that deleting your personal information may terminate your access to certain of the Sites
            Offerings. If you wish to continue using the full complement of Sites Offerings, you may not be able to
            delete all of the personal information that we have on file for you.
          </p>

          <p>
            Please be further advised that, after you delete your personal information, residual copies may take a
            period of time before they are deleted from our active servers and may remain in our backup systems.
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Transfer Of Personal Information Internationally</h3>
          <p>
            If you are visiting the Sites from a country other than the country in which our servers are located, your
            communications with us may result in the transfer of information across international boundaries. By
            visiting the Sites and/or otherwise communicating electronically with us, you consent to such transfers.
            Even if your jurisdiction does not have the same privacy laws as the jurisdiction where our servers are
            located, we will treat your information as subject to the protections described in this Privacy Policy.
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Changes To This Privacy Policy</h3>
          <p>
            We reserve the right to change or update this Privacy Policy at any time by posting a notice on the Sites
            that we are changing our Privacy Policy. If the manner in which we use personal information changes, We will
            notify Users by: (a) sending the modified policy to our Users via email; and/or (b) by any other reasonable
            means acceptable under applicable state and federal law. You will have a choice as to whether or not we use
            your information in this different manner and we will only use your information in this different manner
            where you opt-in to such use.
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy or our privacy practices in general, you may email us as
            at: office@prime-lawgroup.com; or send us mail to: 1100 15th St NW Washington, D.C. 20005
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">Filing A Complaint With The Federal Trade Commission</h3>
          <p>
            To file a complaint regarding our privacy practices, please go to nationalaccidentrecovery.com and at the
            bottom of page click Terms of Service link.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
