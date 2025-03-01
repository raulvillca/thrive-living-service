export interface CommentDto {
  content: string;
  rate?: number;
  localDateTime: Date;
  reservationId: number;
  headquarterId: number;
}
