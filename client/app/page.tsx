import { EventsList } from "@/components/EventsList";
import { AutocompleteHint } from "@/components/Filter";

export default function Home() {
  return (
    <>
      <AutocompleteHint />
      <EventsList />
    </>
  );
}
