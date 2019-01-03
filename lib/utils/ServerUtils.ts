import Server from "ts-framework";
import { Database } from "ts-framework-common";

export const getDatabases = async (server: Server): Promise<Database[]> => {
    // TODO: This should be recursive
    return server.components().filter(component => {
      // Check if component extends Database abstract class
      const parent = Object.getPrototypeOf(component.constructor);
      const base = Object.getPrototypeOf(parent);
      return base.name === 'Database';
    }) as Database[];
}