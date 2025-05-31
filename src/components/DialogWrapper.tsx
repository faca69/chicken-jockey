"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

function DialogWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };
  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent className="overflow-y-hidden">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
        <DialogDescription></DialogDescription>
      </DialogOverlay>
    </Dialog>
  );
}

export default DialogWrapper;
