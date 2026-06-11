-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "num" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "emoji" TEXT NOT NULL DEFAULT '🎉',
    "desc" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "infoJson" TEXT NOT NULL,
    "thumbUrl" TEXT,
    "heroImgUrl" TEXT,
    "galleryJson" TEXT NOT NULL DEFAULT '[]',
    "day1" BOOLEAN NOT NULL DEFAULT true,
    "day2" BOOLEAN NOT NULL DEFAULT true,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "badge" TEXT NOT NULL DEFAULT 'INFO',
    "text" TEXT NOT NULL,
    "linkUrl" TEXT,
    "linkLabel" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
