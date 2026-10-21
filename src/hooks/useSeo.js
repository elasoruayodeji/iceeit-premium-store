import { useEffect } from "react";
import { applySeo, applyGlobalStructuredData } from "../lib/seo";

/*
  useSeo — declare per-route metadata inside each page component.
  Keeps every public route's title/description/canonical/OG unique
  without pulling in a new dependency.
*/
export function useSeo(config) {
  useEffect(() => {
    applyGlobalStructuredData();
    applySeo(config);
    // Re-run only when meaningful fields change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.title, config.description, config.path, config.robots]);
}
