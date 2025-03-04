export interface RoleDto {
  roleTitle?: string;
  type: string;
  headquarterId: number;
}

export interface UserRoleDto {
  userId: number;
  roleId: number;
  headquarterId: number;
}
