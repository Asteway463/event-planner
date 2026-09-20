"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function InviteLinkActions({ inviteUrl }: { inviteUrl: string }) {
    const [copied, setCopied] = useState(false);

    async function copyInviteLink() {
        await navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
    }

    async function shareInviteLink() {
        if (navigator.share) {
            await navigator.share({
                title: "Event invitation",
                text: "You are invited. Open this link to RSVP:",
                url: new URL(inviteUrl, window.location.origin).toString(),
            });
            return;
        }

        await copyInviteLink();
    }

    return (
        <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" onClick={copyInviteLink}>
                {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                {copied ? "copied" : "copy link"}
            </Button>
            <Button type="button" variant="outline" onClick={shareInviteLink}>
                <Share2 aria-hidden="true" />
                share
            </Button>
        </div>
    );
}
