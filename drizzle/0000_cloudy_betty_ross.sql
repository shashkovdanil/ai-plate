CREATE TABLE `plate` (
	`id` integer PRIMARY KEY NOT NULL,
	`food` text,
	`calories` integer,
	`proteins` integer,
	`fats` integer,
	`carbs` integer,
	`eaten` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text
);
--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `plate` (`created_at`);--> statement-breakpoint
CREATE INDEX `updated_at_idx` ON `plate` (`updated_at`);