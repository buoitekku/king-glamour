import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = { title: "Centrum testowe" };

export default function TestCenterPage() {
  return (
    <StaticPage title="Centrum testowe" lead="Testujemy sprzęt przez cały sezon, zanim trafi do sklepu.">
      <p>Każdy nowy model kasku, derki czy ochraniaczy trafia najpierw do naszego Centrum Testowego. Używamy go na hali, w terenie i na zawodach, a wnioski publikujemy na blogu.</p>
      <h2>Program testerów</h2>
      <p>Chcesz testować sprzęt razem z nami? Napisz na testy@kingglamour.pl i opisz, w jakiej dyscyplinie startujesz. Testerzy otrzymują sprzęt na 3 miesiące w zamian za szczegółową opinię.</p>
      <p><Link href="/blog/test-ochraniaczy-kentucky-air-tendon" className="underline">Zobacz najnowszy test: ochraniacze Kentucky Air Tendon →</Link></p>
    </StaticPage>
  );
}
