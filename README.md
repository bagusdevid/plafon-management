## Plafon Management

### Web root directory

Aplikasi ini berbasis **Laravel**, untuk setup root directory pastikan host pointing diarahkan ke folder `public/` struktur direktori dari source code ini. Misal default root directory `/var/www/html`, maka upload semua project source code ke directory `html`, tapi host harus di arahkan ke `/var/www/html/public`. Ngerti kan ya??

### Install dependencies

- `composer install` untuk install php dependencies. Akan muncul folder **vendor/**
- `npm install` untuk install js dependencies. Akan muncul folder **node_modules/**

### Seting `.env` variable

Buat `.env` file di root project, yang isinya spt ini. Paling utama ubah `APP_URL` dan `DB_CONNECTION` info.

```
APP_NAME="Plafon Management"
APP_ENV=production
APP_KEY=base64:gvGwKEGxo+4stOjm3LpPNqOUoHTcp+czzlC1KFQAIwI=
APP_DEBUG=false
APP_URL=https://namadomain.com

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
# APP_MAINTENANCE_STORE=database

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=plafonapp
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database
# CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"
```
