## Instalar prisma

https://www.prisma.io/docs/getting-started/quickstart

```
pnpm install prisma --save-dev
```

init

```
pnpx prisma init --datasource-provider sqlite
```

Crear el schema de la tabla en 'schema.prisma'

```
model User {
  id        Int      @id @default(autoincrement())
  img       String?
  name      String?
  biography String?
  phone     String?
  username  String   @unique
  email     String   @unique
  pass_hash String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt()
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  img       String
  content   String
  createdAt DateTime @default(now())
  user      User?    @relation(fields: [userId], references: [id])
  userId    Int?
}
```

Crear la base de datos de manera local

```
pnpx prisma migrate dev --name init
```

Para ver la base de datos utiliza

```
pnpx prisma studio
```
