/*
  Warnings:

  - You are about to drop the `community_category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_category` to the `community` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `community_category` DROP FOREIGN KEY `community_category_id_category_fkey`;

-- DropForeignKey
ALTER TABLE `community_category` DROP FOREIGN KEY `community_category_id_community_fkey`;

-- AlterTable
ALTER TABLE `community` ADD COLUMN `id_category` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `community_category`;

-- AddForeignKey
ALTER TABLE `community` ADD CONSTRAINT `community_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
