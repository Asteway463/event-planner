import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Link2, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-[var(--border)] py-16 sm:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--accent-strong)]/20 blur-3xl" />
        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-strong)]">
              <CalendarDays className="size-4" aria-hidden="true" />
              A simpler way to make plans
            </p>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Getting people together is hard enough.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--muted-foreground)]">
              Set the details, send one invite link, and stop chasing replies across different group chats.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/events/new">
                  Create an event <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">View dashboard</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--muted-foreground)]">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-[var(--accent-strong)]" />Simple RSVP tracking</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-[var(--accent-strong)]" />One shareable link</span>
            </div>
          </div>

          <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl shadow-black/10 sm:p-7">
            <div className="border-b border-[var(--border)] pb-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted-foreground)]">The whole plan, in one place</p>
              <h2 className="mt-2 text-2xl font-semibold">From first idea to final reply</h2>
            </div>
            <div className="space-y-5 py-6">
              <div className="flex gap-4">
                <CalendarDays className="mt-0.5 size-5 shrink-0 text-[var(--accent-strong)]" />
                <div><p className="font-medium">Add the basics</p><p className="mt-1 text-sm text-[var(--muted-foreground)]">Give people the time, place, and details they need.</p></div>
              </div>
              <div className="flex gap-4">
                <Link2 className="mt-0.5 size-5 shrink-0 text-[var(--accent-strong)]" />
                <div><p className="font-medium">Share one invite</p><p className="mt-1 text-sm text-[var(--muted-foreground)]">Send the link wherever your friends already talk.</p></div>
              </div>
              <div className="flex gap-4">
                <MessageCircle className="mt-0.5 size-5 shrink-0 text-[var(--accent-strong)]" />
                <div><p className="font-medium">See who is coming</p><p className="mt-1 text-sm text-[var(--muted-foreground)]">Keep every yes, maybe, and no together.</p></div>
              </div>
            </div>
            <p className="rounded-xl bg-[var(--background)] p-4 text-sm text-[var(--muted-foreground)]">No spreadsheets. No guessing. Just a clear plan everyone can follow.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 py-12 sm:grid-cols-3 sm:py-16">
        <div>
          <CalendarDays className="size-6 text-[var(--accent-strong)]" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold">Start with the details</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">Set the time, place, and story behind your next gathering in a few minutes.</p>
        </div>
        <div>
          <Users className="size-6 text-[var(--accent-strong)]" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold">Invite your people</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">Send one link wherever your guests already chat and keep responses together.</p>
        </div>
        <div>
          <CheckCircle2 className="size-6 text-[var(--accent-strong)]" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold">Stay in the loop</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">See who is coming, who is undecided, and what still needs your attention.</p>
        </div>
      </section>
    </div>
  );
}

