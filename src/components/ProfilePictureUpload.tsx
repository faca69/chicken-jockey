"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import { toast } from "sonner";

interface ProfilePictureUploadProps {
  currentImage?: string | null;
  userName: string;
  onUploadComplete?: (url: string) => void;
}

export default function ProfilePictureUpload({
  currentImage,
  userName,
  onUploadComplete,
}: ProfilePictureUploadProps) {
  const [showUploader, setShowUploader] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={currentImage || ""} alt={userName} />
          <AvatarFallback className="text-lg">
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
          onClick={() => setShowUploader(!showUploader)}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>

      {showUploader && (
        <div className="w-full max-w-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Upload new photo</span>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={() => setShowUploader(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res?.[0]?.url) {
                toast.success("Profile picture updated successfully!");
                onUploadComplete?.(res[0].url);
                setShowUploader(false);
                window.location.reload();
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(`Upload failed: ${error.message}`);
            }}
          />
        </div>
      )}
    </div>
  );
}
