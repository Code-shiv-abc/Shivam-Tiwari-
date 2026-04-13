import { SectionWrapper } from "@/components/ui/section-wrapper";

export function Writing() {
  return (
    <SectionWrapper
      id="writing"
      label="WRITING"
      title="Essays &"
      titleAccent="Insights"
    >
      <div className="text-text-2 font-body text-[16px] max-w-3xl leading-relaxed">
        <p className="mb-4">
          I write extensively on engineering management, architecture decisions, and the cultural shifts required to build world-class technology organizations.
        </p>
        <p>
          My essays aim to distill complex technical and leadership challenges into practical frameworks that founders and engineering managers can apply immediately.
        </p>
      </div>
    </SectionWrapper>
  );
}
