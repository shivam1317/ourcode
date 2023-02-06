DEV_COMPOSE=docker-compose.dev.yml
c=

all: env

env:
	cp ./.env.example ./.env
	echo DATABASE_URL=\"postgres://postgres:password@localhost:5432/ourcode?schema=public\" > ./backend/.env
	docker compose up -d ourcode-db
	cd ./backend && pnpm install
	cd ./backend && npx prisma migrate dev
	rm ./backend/.env
	docker compose stop ourcode-db

down:
	docker compose down

logs:
	docker compose logs -f $(c)

dev:
	cp ./.env.example ./.env
	docker-compose -f $(DEV_COMPOSE) build
	docker-compose -f $(DEV_COMPOSE) up -d $(c)

reload:
	make stop
	make dev

prod:
	make
	docker-compose build
	docker-compose up -d