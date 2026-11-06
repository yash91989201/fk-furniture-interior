import type { Session } from "@fk-furniture-interior/auth";
import type { Database } from "@fk-furniture-interior/db";

export interface Context {
	db: Database;
	session: Session | null;
}
