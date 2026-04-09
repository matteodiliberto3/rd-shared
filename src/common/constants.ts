/** Mirrors `user_role` in the DB — shared contract for clients and API docs. */
export const USER_ROLES = ["CUSTOMER", "RESTAURANT_OWNER", "ADMIN", "SUBADMIN"] as const;
export type UserRole = (typeof USER_ROLES)[number];

/** Mirrors `payment_provider` enum in the DB — keep in sync with Drizzle schema. */
export const PAYMENT_PROVIDERS = ["RESTYPAY", "WALLET", "TEST", "STRIPE"] as const;
export type PaymentProviderId = (typeof PAYMENT_PROVIDERS)[number];
