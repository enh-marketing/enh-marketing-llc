import { Experience } from "@/components/Experience";
import { availableBadges } from "@/lib/badges";

export default function Home() {
  // Resolved here because Experience is a client component: the filesystem
  // check has to happen on the server and travel down as plain data.
  return <Experience badges={availableBadges()} />;
}
