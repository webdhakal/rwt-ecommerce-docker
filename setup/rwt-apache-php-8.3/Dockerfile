FROM ubuntu:22.04

LABEL name="RWT APACHE-PHP-8.3"
ENV DEBIAN_FRONTEND=noninteractive

# Install prerequisites and utilities
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    apt-utils \
    wget \
    zip \
    unzip \
    curl \
    gnupg2 \
    nano \
    cron \
    lsb-release \
    ca-certificates \
    apt-transport-https \
    software-properties-common && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js 22, pnpm and pm2
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
    | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" \
    > /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs && \
    corepack enable && \
    corepack prepare pnpm@latest --activate && \
    npm install -g pm2@latest && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Apache, PHP 8.3, and extensions
RUN add-apt-repository ppa:ondrej/php -y && \
    apt-get update && \
    mkdir -p /var/run/apache2 && \
    apt-get install -y \
    php8.3 \
    apache2 \
    libapache2-mod-auth-openidc \
    libapache2-mod-php8.3 \
    php8.3-cli \
    php8.3-common \
    php8.3-mysql \
    php8.3-zip \
    php8.3-gd \
    php8.3-mbstring \
    php8.3-curl \
    php8.3-xml \
    php8.3-bcmath \
    php8.3-imagick \
    libcap2-bin \
    imagemagick && \
    setcap 'cap_net_bind_service=+ep' /usr/sbin/apache2 && \
    a2disconf other-vhosts-access-log && \
    chown -Rh www-data:www-data /var/run/apache2 && \
    a2enmod rewrite headers expires ext_filter && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install phpMyAdmin
RUN wget -q https://files.phpmyadmin.net/phpMyAdmin/5.2.1/phpMyAdmin-5.2.1-english.zip && \
    unzip -q phpMyAdmin-5.2.1-english.zip && \
    rm phpMyAdmin-5.2.1-english.zip && \
    mv phpMyAdmin-5.2.1-english /opt/phpMyAdmin

# Install Composer
RUN wget -q https://getcomposer.org/download/latest-stable/composer.phar && \
    chmod +x composer.phar && \
    mv composer.phar /usr/local/bin/composer

# Set up working directory permissions for www-data user
RUN mkdir -p /var/www/.npm /var/www/.cache/yarn && \
    chown -R www-data:www-data /var/www && \
    chown -R www-data:www-data /var/www/.npm /var/www/.cache && \
    chmod -R 755 /var/www

# Copy custom configurations and files
COPY src/000-default.conf /etc/apache2/sites-available/
COPY src/mpm_prefork.conf /etc/apache2/mods-available/
COPY src/99-local.ini /etc/php/8.3/apache2/conf.d/
COPY src/index.php /var/www/html/
COPY src/phpmyadmin.conf /etc/apache2/conf-enabled/
COPY src/config.inc.php /opt/phpMyAdmin/

# Remove default index.html
RUN rm -f /var/www/html/index.html

WORKDIR /var/www/html

# Set correct user
USER www-data

EXPOSE 80 5179

CMD ["apachectl", "-D", "FOREGROUND"]
