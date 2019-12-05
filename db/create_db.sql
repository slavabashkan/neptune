CREATE TABLE "LibraryRoots" (
	"id"	INTEGER PRIMARY KEY ASC AUTOINCREMENT,
	"path"	TEXT NOT NULL,
	UNIQUE ("path")
);

CREATE TABLE "Folders" (
	"id"	INTEGER PRIMARY KEY ASC AUTOINCREMENT,
	"name"	TEXT NOT NULL,
	"date"	TEXT,
	"parentId"	INTEGER,
	"libraryRootId"	INTEGER,
	FOREIGN KEY ("parentId") REFERENCES "Folders" ("id"),
	FOREIGN KEY ("libraryRootId") REFERENCES "LibraryRoots" ("id"),
	UNIQUE ("libraryRootId"),
	CHECK (("parentId" IS NULL AND "libraryRootId" IS NOT NULL) OR ("parentId" IS NOT NULL AND "libraryRootId" IS NULL))
);