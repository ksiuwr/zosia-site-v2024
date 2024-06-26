#!/bin/sh
set -eu

PROJECT_ID=zosia-cloudrun-test
REPO_NAME=zosia-repo
REGION=europe-central2
REPO_HOSTNAME=$REGION-docker.pkg.dev
IMAGE_NAME=zosia_prod

# Configure gcloud and docker to be able to push to the Google Container Registry
gcloud config set project $PROJECT_ID
gcloud auth configure-docker $REPO_HOSTNAME

# Build and push the image
docker build --target prod -t $REPO_HOSTNAME/$PROJECT_ID/$REPO_NAME/$IMAGE_NAME:latest .
docker push $REPO_HOSTNAME/$PROJECT_ID/$REPO_NAME/$IMAGE_NAME:latest

# Run the migration job
gcloud run jobs execute migrate --wait --region=$REGION

