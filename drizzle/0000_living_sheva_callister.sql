CREATE TABLE `plate` (
	`id` integer PRIMARY KEY NOT NULL,
	`food` text NOT NULL,
	`calories` integer NOT NULL,
	`proteins` integer NOT NULL,
	`fats` integer NOT NULL,
	`carbs` integer NOT NULL,
	`eaten` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text
);
--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `plate` (`created_at`);--> statement-breakpoint
CREATE INDEX `updated_at_idx` ON `plate` (`updated_at`);