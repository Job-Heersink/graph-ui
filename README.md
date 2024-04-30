# ABN AMRO Graph UI
## [<ins>Click here to go to the graph UI</ins>](https://dh6w98htdyw4.cloudfront.net/)


## System design
![system diagram](docs/architecture.drawio.svg)  

### Tech stack
Infrastructure:
- AWS Neptune
  - A fully managed Graph database provided by AWS. Provisioned with a db.t3.medium instance, to make use of AWS free-tier.
- AWS ECS + ALB
  - A fully managed container orchestration service to host our Node.js backend, integrated with an Application Load Balancer to ensure scalability.
- S3
  - Hosting for our static front-end code.
- Cloudfront
  - For edge optimized content delivery of both our frontend and backend. Additionally, automatically creates a DNS name for us supporting the HTTPS protocol.
- VPC
  - For additional security, our database is isolated in a private subnet. Additionally, each resource has a security group that allows only the connections nececarry to other resources.
- Cloudformation
  - Infrastructure as code. Makes it easier to maintain and deploy our infrastructure changes.

Backend:
- Node.js
- Express.js
- Gremlin

Frontend:
- Vue.js
- d3.js
- HTML5
- CSS

## Deploying the system
**This repository is equipped with CI/CD (via github actions). Any changes to this repository will be automatically deployed to the cloud.**

To deploy the system to your AWS account, make sure you have both [docker](https://docs.docker.com/engine/install/) and the [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) installed.
Make sure the aws cli is properly configured for your AWS account.

To deploy the system, run:
```
./build.sh
```

Make sure to provide the `AWS_ECR_REPO` environment variable.
This variable should reference the ECR repository where we can push our docker image.

## Running the system locally
Since our database is secured behind a private subnet, it cannot be accessed without a secure proxy.

Assuming you have deployed a neptune database instance, and a proxy ec2 instance in that same subnet, you can create a proxy as follows:
```
# make sure our ec2 keys have the correct permissions
chmod 400 ~/.ssh/neptune_proxy.pem
# create the ssh tunnel
ssh -i "~/.ssh/neptune_proxy.pem" -L 8182:{Neptune hostname}:8182 ec2-user@{EC2 public dns} -N -f
```

Once completed, you can start the backend as follows:
- `cd backend`
- `npm i`
- `node index.js`

and run the frontend with:
- `cd ui`
- `npm i`
- `npm run serve`