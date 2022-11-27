/*
  Warnings:

  - The primary key for the `suggestion_content` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_suggestion` on the `suggestion_content` table. All the data in the column will be lost.
  - You are about to drop the `suggestion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content_description` to the `suggestion_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_level` to the `suggestion_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_link` to the `suggestion_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_type` to the `suggestion_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_value` to the `suggestion_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `suggestion_content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `suggestion` DROP FOREIGN KEY `suggestion_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `suggestion_content` DROP FOREIGN KEY `suggestion_content_id_content_fkey`;

-- DropForeignKey
ALTER TABLE `suggestion_content` DROP FOREIGN KEY `suggestion_content_id_suggestion_fkey`;

-- AlterTable
ALTER TABLE `suggestion_content` DROP PRIMARY KEY,
    DROP COLUMN `id_suggestion`,
    ADD COLUMN `content_description` VARCHAR(255) NOT NULL,
    ADD COLUMN `content_level` ENUM('STARTER', 'MEDIUM', 'ADVANCED') NOT NULL,
    ADD COLUMN `content_link` VARCHAR(500) NOT NULL,
    ADD COLUMN `content_type` ENUM('ARCHIVE', 'VIDEO', 'COURSE') NOT NULL,
    ADD COLUMN `content_value` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `id_user` VARCHAR(191) NOT NULL,
    MODIFY `id_content` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `suggestion`;

-- AddForeignKey
ALTER TABLE `suggestion_content` ADD CONSTRAINT `suggestion_content_id_content_fkey` FOREIGN KEY (`id_content`) REFERENCES `content`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suggestion_content` ADD CONSTRAINT `suggestion_content_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
