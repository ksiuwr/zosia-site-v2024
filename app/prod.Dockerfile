FROM nikolaik/python-nodejs:python3.10-nodejs18-alpine

# Env variables
ENV PYTHONUNBUFFERED=1
ENV DJANGO_ENV="prod"
ENV DJANGO_SETTINGS_MODULE="server.settings.prod"
ENV NODE_ENV="production"

WORKDIR /code

# Install python dependencies - libpq-dev and the rest is required for psycopg2
COPY requirements.txt ./
RUN apk add --no-cache --virtual build-dependencies libpq-dev build-base \
    && pip install --no-cache-dir -r requirements.txt

# Install node dependencies
COPY package.json ./
COPY package-lock.json ./
COPY manage.py ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY .prettierrc ./
COPY tsconfig.json ./

RUN npm install

# Copy code and static files
COPY server ./server
COPY client ./client
COPY static ./static
COPY js ./js

# Build the client
RUN python manage.py generate_client_assets
RUN python manage.py build
RUN python manage.py collectstatic --no-input

# Run the server
# CMD "./run.sh"
