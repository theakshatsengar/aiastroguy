import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { PageHeader } from "@/components/PageHeader";
import { ReadingUploader } from "@/components/ReadingUploader";

export const Route = createFileRoute("/palm")({
  head: () => ({
    meta: [
      { title: "Palm Reading — Lumen" },
      {
        name: "description",
        content: "AI palm reading: life, heart, head and fate lines.",
      },
    ],
  }),
  component: Palm,
});

function Palm() {
  return (
    <MobileShell>
      <PageHeader
        eyebrow="Chiromancy"
        title="Palm reading"
        subtitle="Open your dominant hand. We'll trace the major lines and interpret what they reveal."
      />
      <ReadingUploader
        kind="palm"
        prompt="Capture your palm"
        demo={{
          title: "A hand shaped by quiet persistence.",
          summary:
            "Your palm shows a long, steady life line and a deep heart line — a pattern often seen in people who feel deeply but move with intention. The head line curves gently, suggesting a balance of logic and imagination.",
          insights: [
            {
              label: "Life line",
              value: "Long & deep",
              detail:
                "Strong vitality and a steady relationship with your own energy. You recover well.",
            },
            {
              label: "Heart line",
              value: "Curved",
              detail:
                "Emotionally expressive. You give warmth easily and feel things in waves.",
            },
            {
              label: "Head line",
              value: "Gentle slope",
              detail:
                "Creative thinking grounded in practical sense. You decide slowly, then commit.",
            },
            {
              label: "Fate line",
              value: "Faint, rising",
              detail:
                "Your path is being written now. Choices in the next year carry weight.",
            },
          ],
        }}
      />
    </MobileShell>
  );
}
