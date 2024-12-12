import type { BinaryFiles, LibraryItem } from "../types";
import { useEffect, useState } from "react";

const exportLibraryItemToImg = (
  elements: LibraryItem["elements"],
  files?: BinaryFiles,
) => {
  const libraryItem = elements[0];
  const isImage = libraryItem.type === "image" && !!libraryItem.fileId;

  if (!isImage || !files) {
    return;
  }

  const { fileId } = libraryItem;
  if (!fileId) {
    return;
  }

  const libraryItemFile = files[fileId];
  if (!libraryItemFile) {
    return;
  }

  const { dataURL } = libraryItemFile;

  const img = document.createElement("img");
  img.src = dataURL;

  return img;
};

export const useLibraryItemImg = (
  id: LibraryItem["id"] | null,
  elements: LibraryItem["elements"] | undefined,
  files?: BinaryFiles,
): HTMLImageElement | undefined => {
  const [img, setImg] = useState<HTMLImageElement>();

  useEffect(() => {
    if (elements) {
      if (id) {
        const exportedImg = exportLibraryItemToImg(elements, files);

        if (exportedImg) {
          setImg(exportedImg);
        }
        // }
      } else {
        // When we have no id (usualy selected items from canvas) just export the img
        const exportedImg = exportLibraryItemToImg(elements, files);
        setImg(exportedImg);
      }
    }
  }, [id, elements, setImg, files]);

  return img;
};
