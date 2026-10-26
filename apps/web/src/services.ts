import { createAuth } from "@fk-furniture-interior/auth";
import { createDb } from "@fk-furniture-interior/db";

import { ENV } from "./env.server";

export const db = createDb(ENV);
export const auth = createAuth(ENV, db);
