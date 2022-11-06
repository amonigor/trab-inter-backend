/*
  Warnings:

  - You are about to drop the `Moderator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Moderator` DROP FOREIGN KEY `Moderator_id_community_fkey`;

-- DropForeignKey
ALTER TABLE `Moderator` DROP FOREIGN KEY `Moderator_id_user_fkey`;

-- DropTable
DROP TABLE `Moderator`;

-- CreateTable
CREATE TABLE `moderator` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_community` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`, `id_user`, `id_community`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `moderator` ADD CONSTRAINT `moderator_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `moderator` ADD CONSTRAINT `moderator_id_community_fkey` FOREIGN KEY (`id_community`) REFERENCES `community`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
