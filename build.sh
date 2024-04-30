#!/bin/bash
set -e

#export AWS_PROFILE=job-sandbox

ENVIRONMENT_CODE="dev"
PRODUCT_NAME="graph-ui"
#AWS_ECR_REPO="375681122944.dkr.ecr.eu-central-1.amazonaws.com"
IMAGE_URI=$AWS_ECR_REPO/$PRODUCT_NAME:latest

# create docker image
aws ecr get-login-password | docker login --username AWS --password-stdin $AWS_ECR_REPO
docker build -t $PRODUCT_NAME backend
docker tag $PRODUCT_NAME:latest $IMAGE_URI
docker push $IMAGE_URI

# deploy cloudformation
function deploy_stack() {
  local CAPABILITIES="CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND CAPABILITY_IAM"
  if ! aws cloudformation describe-stacks --stack-name $1 --output text --query "Stacks[0].StackId"; then
    echo "Creating stack $1"
    aws cloudformation create-stack --stack-name $1 --template-body file://$2 --parameters $3 --capabilities $CAPABILITIES
    echo "Waiting for stack to be created"
    aws cloudformation wait stack-create-complete --stack-name $1 && echo "Stack created!"
  else
    echo "Updating stack $1"
    if aws cloudformation update-stack --stack-name $1 --template-body file://$2 --parameters $3 --capabilities $CAPABILITIES; then
      echo "CloudFormation stack update successful"
      echo "Waiting for stack to be updated"
        aws cloudformation wait stack-update-complete --stack-name $1 && echo "Stack updated!"
    elif [ $? -eq 254 ]; then
      echo "No updates to be performed."
    else
      echo "CloudFormation stack update failed."
      return 1
    fi
  fi
  return 0
}

export FRONTEND_STACK="$ENVIRONMENT_CODE-$PRODUCT_NAME-frontend-stack"
export BACKEND_STACK="$ENVIRONMENT_CODE-$PRODUCT_NAME-backend-stack"
deploy_stack "VPC-stack" "cloudformation/vpc_stack.yaml"
deploy_stack $FRONTEND_STACK "cloudformation/frontend_stack.yaml" "ParameterKey=EnvironmentCode,ParameterValue=$ENVIRONMENT_CODE"
deploy_stack $BACKEND_STACK "cloudformation/backend_stack.yaml" "ParameterKey=EnvironmentCode,ParameterValue=$ENVIRONMENT_CODE ParameterKey=VPCStackName,ParameterValue=VPC-stack ParameterKey=BackendImage,ParameterValue=$IMAGE_URI"

#deploy backend
CLUSTER_NAME=$(aws cloudformation describe-stacks --stack-name $BACKEND_STACK --query 'Stacks[0].Outputs[?OutputKey==`ECSClusterName`].OutputValue' --output text)
SERVICE_NAME=$(aws cloudformation describe-stacks --stack-name $BACKEND_STACK --query 'Stacks[0].Outputs[?OutputKey==`ECSServiceName`].OutputValue' --output text)
aws ecs update-service --cluster $CLUSTER_NAME --service $SERVICE_NAME --force-new-deployment

# build frontend
cd ui
npm run build
S3_NAME=$(aws cloudformation describe-stacks --stack-name $FRONTEND_STACK --query 'Stacks[0].Outputs[?OutputKey==`S3Name`].OutputValue' --output text)
aws s3 sync dist s3://$S3_NAME
cd ..
