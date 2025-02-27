export interface UpdateTimeGridDto {
  id: number;
  initialTime: string;
  endTime: string;
  active: boolean;
  headquarterId: number;
  dayOfWeekId: number;
}

export type CreateTimeGridDto = Omit<UpdateTimeGridDto, 'id'>;
