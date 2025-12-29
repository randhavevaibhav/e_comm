/*
  Warnings:

  - Added the required column `targetGroup` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TargetGroup" AS ENUM ('MEN', 'WOMEN', 'KIDS', 'UNISEX');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "targetGroup" "TargetGroup" NOT NULL;
