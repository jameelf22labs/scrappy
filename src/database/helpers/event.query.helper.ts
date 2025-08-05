import Events from "../models/Events.model";

export const EventsQueryHelper = {
  updateStatusById: (updatedValues: Record<string, any>, id: string) => {
    return Events.update(updatedValues, { where: { id } });
  },
};
