import { atom } from "jotai";
import type { BinaryFiles, LibraryItem } from "../types";
import { useEffect, useState } from "react";

export type ImgCache = Map<LibraryItem["id"], HTMLImageElement>;

export const libraryItemImgssCache = atom<ImgCache>(new Map());

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
  imgCache: ImgCache,
  files?: BinaryFiles,
): HTMLImageElement | undefined => {
  const [img, setImg] = useState<HTMLImageElement>();

  useEffect(() => {
    if (elements) {
      if (id) {
        // Try to load cached img
        const cachedImg = imgCache.get(id);

        if (cachedImg) {
          setImg(cachedImg);
        } else {
          // When there is no img in cache export it and save to cache
          const exportedImg = exportLibraryItemToImg(elements, files);

          if (exportedImg) {
            imgCache.set(id, exportedImg);
            setImg(exportedImg);
          }
        }
      } else {
        // When we have no id (usualy selected items from canvas) just export the img
        const exportedImg = exportLibraryItemToImg(elements, files);
        setImg(exportedImg);
      }
    }
  }, [id, elements, imgCache, setImg, files]);

  return img;
};
