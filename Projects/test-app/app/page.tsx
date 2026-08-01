import { Button } from "@wsos/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";

// Magic UI imports — chứng minh blocks hoạt động
import { DotPattern } from "@wsos/ui/blocks/dot-pattern";
import { ShimmerButton } from "@wsos/ui/blocks/shimmer-button";
import { NumberTicker } from "@wsos/ui/blocks/number-ticker";
import { Marquee } from "@wsos/ui/blocks/marquee";
import { BorderBeam } from "@wsos/ui/blocks/border-beam";
import { BlurFade } from "@wsos/ui/blocks/blur-fade";

export default function TestPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-8 p-8 bg-background overflow-hidden">
      {/* Nền dot-pattern */}
      <DotPattern className="absolute inset-0 opacity-20" />

      {/* Hero section */}
      <BlurFade delay={0.2}>
        <h1 className="text-4xl font-bold text-foreground">
          WSOS Studio
        </h1>
      </BlurFade>

      <BlurFade delay={0.4}>
        <p className="text-muted-foreground text-lg">
          Đã phục vụ{" "}
          <NumberTicker value={1000} className="text-foreground font-bold" />{" "}
          khách hàng
        </p>
      </BlurFade>

      {/* Card với border beam */}
      <BlurFade delay={0.6}>
        <Card className="relative w-full max-w-md overflow-hidden">
          <BorderBeam />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Kiểm chứng @wsos/ui
              <Badge variant="secondary">v0.1.0</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Nếu bạn thấy: nền chấm mờ phía sau, chữ số đếm lên, viền sáng
              chạy quanh card này, và nút lấp lánh bên dưới — Magic UI đã hoạt
              động trong @wsos/ui.
            </p>
            <div className="flex gap-2">
              <Button>Shadcn Button</Button>
              <ShimmerButton>Shimmer Button</ShimmerButton>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Marquee — chứng minh animation loop */}
      <BlurFade delay={0.8}>
        <div className="w-full max-w-2xl">
          <Marquee pauseOnHover>
            {["Next.js", "React 19", "Tailwind v4", "shadcn/ui", "Magic UI", "TypeScript"].map((tech) => (
              <Badge key={tech} variant="outline" className="mx-2">
                {tech}
              </Badge>
            ))}
          </Marquee>
        </div>
      </BlurFade>
    </main>
  );
}
