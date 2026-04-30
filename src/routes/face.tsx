import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { PageHeader } from "@/components/PageHeader";
import { ReadingUploader } from "@/components/ReadingUploader";

export const Route = createFileRoute("/face")({
  head: () => ({
    meta: [
      { title: "Face Reading — Lumen" },
      {
        name: "description",
        content: "AI face and forehead reading based on physiognomy.",
      },
    ],
  }),
  component: Face,
});

function Face() {
  return (
    <MobileShell>
      <PageHeader
        eyebrow="Physiognomy"
        title="Face & forehead"
        subtitle="A clear, well-lit selfie. We'll read the proportions of forehead, eyes, nose and jaw."
      />
      <ReadingUploader
        kind="face"
        prompt="Capture your face"
        demo={{
          title: "A face of quiet intelligence.",
          summary:
            "Your forehead is broad and open — traditionally read as a sign of strong intuition and clear thinking. The eyes sit in balance with a soft, attentive quality. Your jawline suggests resolve held under a calm surface.",
          insights: [
            {
              label: "Forehead",
              value: "Broad",
              detail:
                "Open-minded, conceptual thinker. You see patterns before others do.",
            },
            {
              label: "Eyes",
              value: "Balanced",
              detail:
                "Empathetic and observant. You read rooms quickly.",
            },
            {
              label: "Nose",
              value: "Straight bridge",
              detail:
                "Direct communication style. You prefer clarity over performance.",
            },
            {
              label: "Jaw",
              value: "Defined",
              detail:
                "Determination beneath a gentle exterior. You hold your ground quietly.",
            },
          ],
        }}
      />
    </MobileShell>
  );
}
