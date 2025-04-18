import { ReactNode } from "react";
import { Event } from "./event";

export interface EventsContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  handleDelete: (id: number) => Promise<void>;
  sortEvents: (criteria: string) => void;
}

export interface EventsProviderProps {
  children: ReactNode;
}