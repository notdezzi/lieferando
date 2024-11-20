/*
  Warnings:

  - A unique constraint covering the columns `[storelocation]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `storelocation` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Shop` ADD COLUMN `storelocation` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Shop_storelocation_key` ON `Shop`(`storelocation`);

-- AddForeignKey
ALTER TABLE `Shop` ADD CONSTRAINT `Shop_storelocation_fkey` FOREIGN KEY (`storelocation`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
