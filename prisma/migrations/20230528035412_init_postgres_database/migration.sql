-- CreateEnum
CREATE TYPE "Level" AS ENUM ('STARTER', 'MEDIUM', 'ADVANCED');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('ARCHIVE', 'VIDEO', 'COURSE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('ACTIVE', 'DEACTIVATED');

-- CreateEnum
CREATE TYPE "SuggestionType" AS ENUM ('ALTER', 'INSERT', 'DELETE');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "color" VARCHAR(255) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "id_category" TEXT NOT NULL,

    CONSTRAINT "community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "link" VARCHAR(500) NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "level" "Level" NOT NULL,
    "type" "ContentType" NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'ACTIVE',
    "id_community" TEXT NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suggestion" (
    "id" TEXT NOT NULL,
    "type" "SuggestionType" NOT NULL DEFAULT 'INSERT',
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "content_description" VARCHAR(255),
    "content_link" VARCHAR(500),
    "content_value" DECIMAL(10,2),
    "content_level" "Level",
    "content_type" "ContentType",
    "content_id_community" TEXT,
    "id_content" TEXT,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moderator" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_community" TEXT NOT NULL,

    CONSTRAINT "moderator_pkey" PRIMARY KEY ("id","id_user","id_community")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "community" ADD CONSTRAINT "community_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_id_community_fkey" FOREIGN KEY ("id_community") REFERENCES "community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suggestion" ADD CONSTRAINT "suggestion_id_content_fkey" FOREIGN KEY ("id_content") REFERENCES "content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suggestion" ADD CONSTRAINT "suggestion_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moderator" ADD CONSTRAINT "moderator_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moderator" ADD CONSTRAINT "moderator_id_community_fkey" FOREIGN KEY ("id_community") REFERENCES "community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
