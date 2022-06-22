set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashedPassword" TEXT,
	"createdAt" timestamp with time zone,
	"profilePicture" TEXT,
	"link" TEXT,
	"location" TEXT,
	"tagline" TEXT,
	"whatContent" TEXT,
	"whyContent" TEXT,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "nowww" (
	"userId" int,
	"category" TEXT,
	"content" TEXT,
	"categoryId" int
) WITH (
  OIDS=FALSE
);



CREATE TABLE "categories" (
	"categoryId" serial NOT NULL,
	"name" TEXT,
	CONSTRAINT "categories_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "nowww" ADD CONSTRAINT "nowww_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "nowww" ADD CONSTRAINT "nowww_fk1" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");
