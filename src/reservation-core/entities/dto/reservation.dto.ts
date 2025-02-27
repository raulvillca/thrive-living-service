export interface UpdateReservationDto {
  id: number;
  clientId: number;
  attended: boolean;
  fromDate: Date;
  createdAt: Date;
  headquarterId: number;
  meetingId: number;
  comments: [];
}

export type CreateReservationDto = Omit<UpdateReservationDto, 'id'>;
