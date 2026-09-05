import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
      <h1 className="text-4xl font-bold text-foreground">
        Plan events your friends actually show up to
      </h1>

      <p className="max-w-md text-muted-foreground">
        Create an event, share the invite link, and watch the RSVPs roll in —
        no sign-up required for your guests.
      </p>

      <div className="flex gap-4">
        <Link
          href="/events/new"
          className="rounded-lg bg-accent-strong px-5 py-2.5 font-medium text-white transition hover:opacity-90"
        >
          Create an events
        </Link>

        <Link
          href={"/dashboard"}
          className="rounded-lg border border-border px-5 py-2.5 font-medium text-foreground transition hover:bg-secondary"
        >
          View my events
        </Link>
      </div>
    </main>
  );
}