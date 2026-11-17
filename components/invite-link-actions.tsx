"use client"

import { Check, Copy, Share2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function InviteLinkActions({ inviteUrl }: { inviteUrl: string }) {
    const [copied, setCopied] = useState(false)

    async function copyInviteLink() {
        try {
            await navigator.clipboard.writeText(inviteUrl)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 2000)
        } catch {
            // Clipboard access failed
        }
    }

    async function shareInviteLink() {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Event invitation",
                    text: "You are invited. Open this link to RSVP:",
                    url: inviteUrl,
                })
                return
            } catch {
                // User cancelled share
            }
        }
        await copyInviteLink()
    }

    return (
        <div className="flex flex-wrap gap-2">
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={copyInviteLink}
                className="flex items-center gap-2"
            >
                {copied ? (
                    <>
                        <Check className="size-4 text-emerald-600" aria-hidden="true" />
                        Copied
                    </>
                ) : (
                    <>
                        <Copy className="size-4" aria-hidden="true" />
                        Copy link
                    </>
                )}
            </Button>
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={shareInviteLink}
                className="flex items-center gap-2"
            >
                <Share2 className="size-4" aria-hidden="true" />
                Share
            </Button>
        </div>
    )
}