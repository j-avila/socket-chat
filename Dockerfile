FROM php:7.3-fpm-stretch

# Instalar dependencias
RUN apt update -y && apt upgrade -yqq
RUN apt install -y curl gnupg

# Instalar NodeJS
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt install -y nodejs

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

# Compilar extensión php-zip
RUN apt install -y zip libzip-dev
RUN docker-php-ext-configure zip --with-libzip
RUN docker-php-ext-install zip

# Compilar la app
WORKDIR /aplicacion
COPY . .
ENV APP_ENV=prod
RUN npm update -g npm && npm install && npm run build
RUN composer install --no-dev --optimize-autoloader