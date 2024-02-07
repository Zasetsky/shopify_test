# shopify_test

React.js Redux Toolkit Typescript Nest.js TypeORM PostgreSQL GraphQL.

Приложение берёт товары из shopify, кладет их в БД и отправляет товары на клиент.
 
## Установка Docker

Для запуска приложения в контейнере Docker, вам сначала необходимо установить Docker на вашем компьютере. Следуйте инструкциям на официальном сайте Docker для вашей операционной системы:

- [Установка Docker на Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Установка Docker на macOS](https://docs.docker.com/desktop/install/mac-install/)
- [Установка Docker на Linux](https://docs.docker.com/desktop/install/linux-install/)

После установки Docker убедитесь, что он успешно запущен и работает на вашем компьютере.

## Запуск приложения в Docker контейнере

1. Клонируйте репозиторий с приложением на ваш компьютер:

```bash
git clone <URL_репозитория>
```

2. Перейдите в папку проекта где расположен `docker-compose.yml`

3. Скомпилируйте код в контейнеры:

```bash
docker-compose up --build -d
```

### `http://localhost:3000/` - Клиент
