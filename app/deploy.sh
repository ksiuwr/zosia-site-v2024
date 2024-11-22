#!/bin/sh
set -eu

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <GCP Project ID>"
    exit 1
fi

PROJECT_ID="$1"
REPO_NAME=zosia-repo
REGION=europe-west4
REPO_HOSTNAME=$REGION-docker.pkg.dev
IMAGE_NAME=zosia_prod

IMAGE_URL=$REPO_HOSTNAME/$PROJECT_ID/$REPO_NAME/$IMAGE_NAME:latest

echo "[1] Configuring gcloud and docker to be able to push to the Google Container Registry"
gcloud config set project $PROJECT_ID
gcloud config set compute/zone $REGION
gcloud auth configure-docker $REPO_HOSTNAME

echo "[2] Building and pushing the image"
docker build --target prod -t $IMAGE_URL .
docker push $IMAGE_URL

echo "[3] Running migrations"
gcloud run jobs update migrate --region=$REGION --image $IMAGE_URL
gcloud run jobs execute migrate --wait --region=$REGION

echo "[4] Collecting static files into a GCS bucket"
gcloud run jobs update collectstatic --region=$REGION --image $IMAGE_URL
gcloud run jobs execute collectstatic --wait --region=$REGION

echo "[5] Updating createsuperuser job to use the new image"
gcloud run jobs update createsuperuser --region=$REGION --image $IMAGE_URL

echo "[6] Deploying the new image"
gcloud run services update zosia --region $REGION --image $IMAGE_URL

