
import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | mySquad`;
    
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
