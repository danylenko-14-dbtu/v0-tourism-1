"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContactDialog } from "@/hooks/use-contact-dialog";
import type { Dictionary } from "@/lib/dictionaries";
import { publicEnv } from "@/lib/public-env";

interface ContactDialogProps {
  dictionary: Dictionary;
}

export function ContactDialog({ dictionary }: ContactDialogProps) {
  const { isOpen, onClose } = useContactDialog();
  const [copied, setCopied] = useState(false);

  const phoneNumber = publicEnv.contactPhoneNumber;
  const normalizedPhoneNumber = phoneNumber.telHref.replace(/^tel:/, "");
  const encodedPhoneNumber = encodeURIComponent(normalizedPhoneNumber);
  const telegramSharePhoneNumber = normalizedPhoneNumber.replace(/^\+/, "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber.display);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dictionary.contactDialog.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Phone Number Block */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/70">
              {dictionary.contactDialog.phoneLabel}
            </label>
            <div className="flex gap-2">
              <Input
                type="tel"
                value={phoneNumber.display}
                readOnly
                className="flex-1 bg-muted"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleCopy}
                className="px-4"
              >
                {copied
                  ? dictionary.contactDialog.copied
                  : dictionary.contactDialog.copy}
              </Button>
            </div>
          </div>

          {/* Messenger Buttons */}
          <div className="space-y-3">
            {/* Viber Button */}
            <Button
              type="button"
              className="w-full gap-2 bg-[#7360f2] hover:bg-[#7360f2]/90 text-white"
              onClick={() => {
                window.open(
                  `viber://chat?number=${encodedPhoneNumber}`,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              <MessageCircle className="h-5 w-5" />
              {dictionary.contactDialog.viber}
            </Button>

            {/* Telegram Button */}
            <Button
              type="button"
              className="w-full gap-2 bg-[#2AABEE] hover:bg-[#2AABEE]/90 text-white"
              onClick={() => {
                window.open(
                  `https://t.me/+${telegramSharePhoneNumber}`,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              <MessageCircle className="h-5 w-5" />
              {dictionary.contactDialog.telegram}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
