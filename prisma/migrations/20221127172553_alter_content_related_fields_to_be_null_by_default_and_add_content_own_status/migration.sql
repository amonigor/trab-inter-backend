/*
  Warnings:

  - You are about to alter the column `status` on the `content` table. The data in that column could be lost. The data in that column will be cast from `Enum("content_status")` to `Enum("content_status")`.

*/
-- AlterTable
ALTER TABLE `content` MODIFY `status` ENUM('ACTIVE', 'DEACTIVATED') NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE `suggestion_content` ADD COLUMN `status` ENUM('PENDING', 'APPROVED', 'DENIED') NOT NULL DEFAULT 'PENDING',
    MODIFY `content_description` VARCHAR(255) NULL,
    MODIFY `content_level` ENUM('STARTER', 'MEDIUM', 'ADVANCED') NULL,
    MODIFY `content_link` VARCHAR(500) NULL,
    MODIFY `content_type` ENUM('ARCHIVE', 'VIDEO', 'COURSE') NULL,
    MODIFY `content_value` DECIMAL(10, 2) NULL;
