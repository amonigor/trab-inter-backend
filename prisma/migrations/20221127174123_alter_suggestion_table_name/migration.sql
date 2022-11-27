/*
  Warnings:

  - You are about to drop the `suggestion_content` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `suggestion_content` DROP FOREIGN KEY `suggestion_content_id_content_fkey`;

-- DropForeignKey
ALTER TABLE `suggestion_content` DROP FOREIGN KEY `suggestion_content_id_user_fkey`;

-- DropTable
DROP TABLE `suggestion_content`;

-- CreateTable
CREATE TABLE `suggestion` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('ALTER', 'INSERT', 'DELETE') NOT NULL DEFAULT 'INSERT',
    `status` ENUM('PENDING', 'APPROVED', 'DENIED') NOT NULL DEFAULT 'PENDING',
    `content_description` VARCHAR(255) NULL,
    `content_link` VARCHAR(500) NULL,
    `content_value` DECIMAL(10, 2) NULL,
    `content_level` ENUM('STARTER', 'MEDIUM', 'ADVANCED') NULL,
    `content_type` ENUM('ARCHIVE', 'VIDEO', 'COURSE') NULL,
    `id_content` VARCHAR(191) NULL,
    `id_user` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `suggestion` ADD CONSTRAINT `suggestion_id_content_fkey` FOREIGN KEY (`id_content`) REFERENCES `content`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suggestion` ADD CONSTRAINT `suggestion_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
