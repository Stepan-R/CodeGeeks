import { Event } from '../type/event';

export const recommendSimilarEvents = (event: Event, allEvents: Event[]): Event[] => {
  const similarEvents: Event[] = [];

  allEvents.forEach((otherEvent) => {
    if (otherEvent.id === event.id) return;

    const isSameCategory = event.category === otherEvent.category;
    const isSameDate = new Date(event.date).toDateString() === new Date(otherEvent.date).toDateString();
    const isSameLocation = event.location === otherEvent.location;

    if (isSameCategory || isSameDate || isSameLocation) {
      similarEvents.push(otherEvent);
    }
  });

  return similarEvents;
};