FROM nikolaik/python-nodejs:python3.10-nodejs18-alpine AS base

# Env variables
ENV PYTHONUNBUFFERED=1

WORKDIR /code

# Install python dependencies - libpq-dev and the rest is required for psycopg2
COPY requirements.txt ./
RUN apk add --no-cache --virtual build-dependencies libpq-dev build-base \
    && pip install --no-cache-dir -r requirements.txt

# Copy node configuration
COPY package.json ./
COPY package-lock.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY .prettierrc ./
COPY tsconfig.json ./

# Copy static files
COPY static ./static
COPY js ./js
COPY manage.py ./


FROM base as dev

ENV DJANGO_ENV="dev"
ENV DJANGO_SETTINGS_MODULE="server.settings.dev"
ENV NODE_ENV="development"

RUN npm install

COPY requirements.dev.txt ./
RUN pip install --no-cache-dir -r requirements.dev.txt


FROM base as prod

ENV DJANGO_ENV="prod"
ENV DJANGO_SETTINGS_MODULE="server.settings.prod"
ENV NODE_ENV="production"

RUN npm install

# Copy code 
COPY server ./server
COPY client ./client
COPY scripts ./scripts

# Build the client
RUN python manage.py generate_client_assets
RUN python manage.py build
RUN python manage.py collectstatic --no-input

# Copy static files to /static for production server
RUN cp -r /code/static/* /static
