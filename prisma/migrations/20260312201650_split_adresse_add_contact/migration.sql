/*
  Warnings:

  - You are about to drop the column `adresse` on the `MembershipApplication` table. All the data in the column will be lost.
  - Added the required column `hausnummer` to the `MembershipApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ort` to the `MembershipApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plz` to the `MembershipApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strasse` to the `MembershipApplication` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ContactInquiry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "kategorie" TEXT NOT NULL,
    "eventId" TEXT,
    "nachricht" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MembershipApplication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "strasse" TEXT NOT NULL,
    "hausnummer" TEXT NOT NULL,
    "plz" TEXT NOT NULL,
    "ort" TEXT NOT NULL,
    "land" TEXT NOT NULL DEFAULT 'Österreich',
    "email" TEXT NOT NULL,
    "datenschutz" BOOLEAN NOT NULL,
    "telegramWilling" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_MembershipApplication" ("createdAt", "datenschutz", "email", "id", "name", "telefon", "telegramWilling") SELECT "createdAt", "datenschutz", "email", "id", "name", "telefon", "telegramWilling" FROM "MembershipApplication";
DROP TABLE "MembershipApplication";
ALTER TABLE "new_MembershipApplication" RENAME TO "MembershipApplication";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
