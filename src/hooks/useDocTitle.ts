import { useEffect } from "react";

/* 
  Use that hooks to set the document title of the page.
  (equivalent to tag <title> used in HTML) 
*/
function useDocTitle(title: string): void {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default useDocTitle;
