import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { iife } from "../common/misc/misc";
import { useErrors } from "../common/misc/useErrors";

export const useAttachImage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
  const { onNonCriticalError } = useErrors();
  const [storageId, setStorageId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!selectedImage) return;

    const reader = new FileReader();
    const onLoad = (e: ProgressEvent<FileReader>) => {
      setImagePreview(e.target!.result as string);
    };
    reader.addEventListener("load", onLoad);
    reader.readAsDataURL(selectedImage);

    return () => {
      reader.removeEventListener("load", onLoad);
    };
  }, [selectedImage]);

  useEffect(() => {
    if (!selectedImage) return;

    let exited = false;
    setIsUploading(true);

    iife(async () => {
      const postUrl = await generateUploadUrl();
      if (exited) return;

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage!.type },
        body: selectedImage,
      });
      if (exited) return;

      const { storageId } = await result.json();
      setStorageId(storageId);
    })
      .catch(onNonCriticalError)
      .finally(() => {
        setIsUploading(false);
      });

    return () => {
      exited = true;
      setIsUploading(false);
      setStorageId(undefined);
      setImagePreview(null);
    };
  }, [selectedImage]);

  return {
    setSelectedImage,
    imagePreview,
    isUploading,
    storageId,
  };
};
