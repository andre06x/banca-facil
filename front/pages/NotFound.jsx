import { useEffect } from "react";

const useErrorBoundary = () => {
  useEffect(() => {
    const hasErrorMessage = document.body.innerHTML.includes(
      "Application error: a client-side exception has occurred (see the browser console for more information)"
    );

    if (hasErrorMessage) {
      window.location = "/";
    }
  }, []);
};

export default useErrorBoundary;
