FROM nikolaik/python-nodejs:python3.12-nodejs22-alpine AS base

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
COPY tailwind.config.ts ./
COPY .prettierrc ./
COPY tsconfig.json ./

# Copy static files
COPY static ./static
COPY manage.py ./


FROM base AS dev

# Set environment variables for development
ENV DJANGO_ENV="dev"
ENV DJANGO_SETTINGS_MODULE="server.settings.dev"
ENV NODE_ENV="development"
ENV DB_HOST_FOR_TEST_DB="db"

# Install node dependencies
RUN npm install

# Install development python dependencies
COPY requirements.dev.txt ./
RUN pip install --no-cache-dir -r requirements.dev.txt


FROM base AS prod

# Set environment variables for production
ENV DJANGO_ENV="prod"
ENV DJANGO_SETTINGS_MODULE="server.settings.prod"
ENV NODE_ENV="production"

# Install node dependencies
RUN npm install

# Copy code
COPY server ./server
COPY client ./client
COPY scripts ./scripts

# Build frontend
RUN python manage.py generate_client_assets
RUN python manage.py build

ENTRYPOINT [ "./scripts/start_prod_server.sh" ]
