import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useClickOutsideCallback = (ref: React.RefObject<HTMLDivElement>, callback: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref !== null) {
        if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
          callback();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
