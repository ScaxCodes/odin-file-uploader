/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Directory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Directory_name_userId_key" ON "Directory"("name", "userId");
