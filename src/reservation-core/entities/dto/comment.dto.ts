export interface UpdateCommentDto {
  id: number;
  content: string;
  rate: number;
  localDateTime: Date;
  reservationId: number;
}

export type CreateCommentDto = Omit<UpdateCommentDto, 'id'>;
