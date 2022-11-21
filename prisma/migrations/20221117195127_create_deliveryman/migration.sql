-- CreateTable
CREATE TABLE "deliveryman" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "deliveryman_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deliveryman_userName_key" ON "deliveryman"("userName");
