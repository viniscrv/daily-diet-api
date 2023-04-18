/*
  Warnings:

  - You are about to drop the column `createdAt` on the `meals` table. All the data in the column will be lost.
  - Added the required column `date` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_meals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "withinDiet" BOOLEAN NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_meals" ("description", "id", "name", "userId", "withinDiet") SELECT "description", "id", "name", "userId", "withinDiet" FROM "meals";
DROP TABLE "meals";
ALTER TABLE "new_meals" RENAME TO "meals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
