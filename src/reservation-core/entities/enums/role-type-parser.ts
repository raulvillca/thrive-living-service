export enum RoleType {
  SUPPORT = 'support',
  SUPERVISOR = 'supervisor',
  MODERATOR = 'moderator',
  CLIENT = 'client',
}

export class RoleTypeParser {
  private static readonly nameToValueMap: Record<string, RoleType> = {
    SUPPORT: RoleType.SUPPORT,
    SUPERVISOR: RoleType.SUPERVISOR,
    MODERATOR: RoleType.MODERATOR,
    CLIENT: RoleType.CLIENT,
  };

  private static readonly valueToNameMap: Record<RoleType, string> = {
    [RoleType.SUPPORT]: 'support',
    [RoleType.SUPERVISOR]: 'supervisor',
    [RoleType.MODERATOR]: 'moderator',
    [RoleType.CLIENT]: 'client',
  };

  /**
   * Convierte el nombre del enum (SUPERVISOR) en su valor real ("supervisor").
   * Lanza un error si el nombre no es válido.
   */
  static fromEnumName(name: string): RoleType {
    if (!this.nameToValueMap[name]) {
      throw new Error(`Invalid enum name: ${name}`);
    }
    return this.nameToValueMap[name];
  }

  /**
   * Convierte el valor real ("supervisor") en el nombre del enum (SUPERVISOR).
   * Lanza un error si el valor no es válido.
   */
  static toEnumName(value: RoleType): string {
    if (!this.valueToNameMap[value]) {
      throw new Error(`Invalid enum value: ${value}`);
    }
    return this.valueToNameMap[value];
  }
}
