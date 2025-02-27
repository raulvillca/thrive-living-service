export interface UpdateMeetingDto {
  id: number;
  placeType: string;
  place: string;
  activityId: number;
  timeGridId: number;
  meetingCalendarId: number;
}

export type CreateMeetingDto = Omit<UpdateMeetingDto, 'id'>;
