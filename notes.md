# Notes

## Prisma

### Database management

```shell
npx prisma studio
```

### Database migrations

```shell
npx prisma migrate dev
```

### Prisma init

```shell
npx prisma init
```

### Generate schema

```shell
npx prisma generate
```

## Docker

### Create docker image

```shell
docker run --name <image-name> -e POSTGRESQL_USERNAME=<db-user> -e POSTGRESQL_PASSWORD=<db-password> -e POSTGRESQL_DATABASE=<db-name> -p 5432:5432 bitnami/postgresql
```

### Start image

```shell
docker start <image-name>
```

### Stop image

```shell
docker stop <image-name>
```

### Check created images

```shell
docker ps -a
```