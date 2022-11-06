-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(80) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `community` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(80) NOT NULL,
    `description` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `community_category` (
    `id` VARCHAR(191) NOT NULL,
    `id_category` VARCHAR(191) NOT NULL,
    `id_community` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`, `id_category`, `id_community`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suggestion` (
    `id` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'DENIED') NOT NULL DEFAULT 'PENDING',
    `id_user` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `link` VARCHAR(500) NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,
    `level` ENUM('STARTER', 'MEDIUM', 'ADVANCED') NOT NULL,
    `type` ENUM('ARCHIVE', 'VIDEO', 'COURSE') NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'DENIED') NOT NULL DEFAULT 'PENDING',
    `id_community` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suggestion_content` (
    `id` VARCHAR(191) NOT NULL,
    `id_suggestion` VARCHAR(191) NOT NULL,
    `id_content` VARCHAR(191) NOT NULL,
    `type` ENUM('ALTER', 'INSERT', 'DELETE') NOT NULL DEFAULT 'INSERT',

    PRIMARY KEY (`id`, `id_suggestion`, `id_content`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `community_category` ADD CONSTRAINT `community_category_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `community_category` ADD CONSTRAINT `community_category_id_community_fkey` FOREIGN KEY (`id_community`) REFERENCES `community`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suggestion` ADD CONSTRAINT `suggestion_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_id_community_fkey` FOREIGN KEY (`id_community`) REFERENCES `community`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suggestion_content` ADD CONSTRAINT `suggestion_content_id_suggestion_fkey` FOREIGN KEY (`id_suggestion`) REFERENCES `suggestion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suggestion_content` ADD CONSTRAINT `suggestion_content_id_content_fkey` FOREIGN KEY (`id_content`) REFERENCES `content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
