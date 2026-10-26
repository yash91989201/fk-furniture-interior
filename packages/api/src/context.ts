import type { Session } from "@fk-furniture-interior/auth";
import type { Database } from "@fk-furniture-interior/db";

export type Context = {
  session: Session | null;
  db: Database;
};
