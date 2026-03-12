-- CreateTable
CREATE TABLE "EventRegistration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventSlug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefon" TEXT,
    "personen" INTEGER NOT NULL DEFAULT 1,
    "anmerkung" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "EventRegistration_eventSlug_idx" ON "EventRegistration"("eventSlug");
