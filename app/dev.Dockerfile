FROM python:3.10

ENV PYTHONUNBUFFERED 1

# NODE settings
ENV NODE_PATH=/node_modules
ENV NODE_MAJOR=18
ENV NODE_ENV="production"

# DJANGO settings
ENV DJANGO_ENV=${DJANGO_ENV}
ENV DJANGO_SETTINGS_MODULE="server.settings.dev"

# install nodejs and npm
RUN set -x \
    && apt-get update \
    && apt-get install -y ca-certificates curl gnupg --no-install-recommends \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
    && apt-get install -y nodejs npm --no-install-recommends \
    && npm install -g yarn \
    ;

WORKDIR /code

COPY requirements.txt ./
COPY requirements.dev.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir -r requirements.dev.txt

COPY package.json ./
COPY package-lock.json ./
COPY static ./static
COPY js ./js
COPY manage.py ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY .prettierrc ./
COPY tsconfig.json ./