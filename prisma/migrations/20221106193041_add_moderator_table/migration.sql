-- CreateTable
CREATE TABLE `Moderator` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_community` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`, `id_user`, `id_community`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Moderator` ADD CONSTRAINT `Moderator_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Moderator` ADD CONSTRAINT `Moderator_id_community_fkey` FOREIGN KEY (`id_community`) REFERENCES `community`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
