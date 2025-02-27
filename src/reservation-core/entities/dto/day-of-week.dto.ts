export interface UpdateDayOfWeekDto {
  id: number;
  dayName: string;
  dayNumber: number;
  active: boolean;
  headquarterId: number;
}

export type CreateDayOfWeekDto = Omit<UpdateDayOfWeekDto, 'id'>;
