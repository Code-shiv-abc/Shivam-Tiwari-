import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { SectionWrapper } from "@/components/ui/section-wrapper";


export default function Home() {
  return (
    <div className="pt-32 pb-20 space-y-16 max-w-7xl mx-auto px-6">
      <SectionWrapper id="components" label="Design System" title="UI" titleAccent="Primitives">

        {/* Buttons */}
        <div className="mb-12">
          <h3 className="text-xl font-display text-text mb-4">Buttons</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary</Button>
            <Button variant="primary" rightIcon>With Icon</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="cta">CTA Animate</Button>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-12">
          <h3 className="text-xl font-display text-text mb-4">Badges</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge variant="violet" dot>Violet</Badge>
            <Badge variant="cyan" dot>Cyan</Badge>
            <Badge variant="emerald" dot>Emerald</Badge>
            <Badge variant="amber" dot>Amber</Badge>
            <Badge variant="red" dot>Red</Badge>
            <Badge variant="ghost" dot>Ghost</Badge>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-12">
          <h3 className="text-xl font-display text-text mb-4">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card hoverable accentColor="violet">
              <h4 className="text-lg font-display text-text">Hoverable Card</h4>
              <p className="text-text-2 mt-2">Violet accent color.</p>
            </Card>
            <Card hoverable accentColor="cyan">
              <h4 className="text-lg font-display text-text">Hoverable Card</h4>
              <p className="text-text-2 mt-2">Cyan accent color.</p>
            </Card>
            <Card accentColor="none">
              <h4 className="text-lg font-display text-text">Static Card</h4>
              <p className="text-text-2 mt-2">No accent, no hover effect.</p>
            </Card>
          </div>
        </div>

        {/* Animated Number */}
        <div className="mb-12">
          <h3 className="text-xl font-display text-text mb-4">Animated Numbers</h3>
          <div className="flex flex-wrap gap-10 items-center">
            <div className="text-4xl text-brand-cyan">
              <AnimatedNumber value={1500000} prefix="$" />
            </div>
            <div className="text-4xl text-brand-violet">
              <AnimatedNumber value={99.9} suffix="%" decimals={1} />
            </div>
          </div>
        </div>

      </SectionWrapper>
    </div>
  );
}
