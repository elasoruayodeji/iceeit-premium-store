import { Button } from "../components/Button";
import { useSeo } from "../hooks/useSeo";
export default function NotFound() {
  useSeo({ title: "Page not found — ICEEIT", description: "This page doesn't exist. Shop the ICEEIT streetwear collection instead.", path: "/404", robots: "noindex, follow" });
 return <div className="page"><div className="not-found"><p className="eyebrow">ERROR / 404</p><h1>Wrong turn.</h1><p>This page doesn't exist in the ICEEIT edit.</p><Button to="/">Back home</Button></div></div>; }
