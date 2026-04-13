import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { Calendar } from "lucide-react";

export function Contact() {
  return (
    <SectionWrapper
      id="contact"
      label="CONTACT"
      title="Let's Build"
      titleAccent="Together"
    >
      <div className="text-text-2 font-body text-[16px] max-w-2xl leading-relaxed mb-8">
        <p>
          Whether you&apos;re looking for a fractional CTO, need guidance on scaling your engineering organization, or want to discuss a modernization initiative, I&apos;m here to help.
        </p>
      </div>
      <a
        href={`mailto:${SITE_CONFIG.social.email}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="primary" rightIcon={<Calendar size={16} />}>
          Book a Discovery Call
        </Button>
      </a>
    </SectionWrapper>
  );
}
