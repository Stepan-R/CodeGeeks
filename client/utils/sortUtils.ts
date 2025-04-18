import { Event } from '@/type/event';

export const sortedEvents = (events: Event[], criteria: string): Event[] => {
  return [...events].sort((a, b) => {
    if (criteria === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (criteria === 'title') {
      return a.title.localeCompare(b.title);
    } else if (criteria === 'category') {
      return a.category.localeCompare(b.category);
    } else if (criteria === 'location') {
      return a.location.localeCompare(b.location);
    }
    return 0;
  });
};
