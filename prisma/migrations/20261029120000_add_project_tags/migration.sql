-- Add the existing Project.tags column to migration history.
ALTER TABLE `Project`
ADD COLUMN `tags` VARCHAR(191) NULL;