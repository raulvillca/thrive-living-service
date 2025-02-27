export interface UpdateActivityDto {
  id: number;
  name: string;
  description: string;
  active: boolean;
  everyWeek: boolean;
  quantity: number;
  headquarterId: number;
}

export type CreateActivityDto = Omit<UpdateActivityDto, 'id'>;
