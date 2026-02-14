# Learning 

## Ch-1 
They first must bundle all our code together before serving it to the browser. Instead, Vite natively supports the ECMAScript module (ESM) standard. Furthermore, Vite requires very little configuration to get started. A downside of Vite is that it can be hard to configure certain more complex scenarios with it. An upcoming bundler that is promising is Turbopack; however, it is still very new at the time of writing. For full-stack development with server-side rendering, we will later get to know Next.js, which is a React framework that also provides a 
dev server out of the box.

## ch-2
# objectives
   Writing and running scripts with Node.js 
   Introducing Docker, a platform for containers
   Introducing MongoDB, a document database
   Accessing the MongoDB database via Node.js

// Docker is a platform that allow us to package, manage, and run applications in loosely isolated environment called containers, Containers are lightweight, are isolated from each other and include all dependencies needed to run an application.  

You build React → Docker builds image → Docker runs container → App runs

## ch-3
# objectives
  Designing a backend service
  Creating database schemas using Mongoose
  Developing and testing service functions
  Providing a REST API using Express

## ch-4 Frontend 
   Viewing a single post,
   Creating a new post,
   Listing posts,
   Filtering posts,
   Sorting posts

## ch-5 Some More about docker 
1. Local development

You (frontend dev) work locally using Vite or npm start.

Backend is already deployed in INT, so you point your API calls to the remote backend URL.

Dockerfile is optional here — you don’t need to containerize your frontend just to test locally.

Docker Compose is also optional, because there’s only one service (frontend) running locally.

2. Merge Request (MR) / Pull Request

When you raise an MR, the CI/CD pipeline takes over. Here’s what happens in depth:

Step 1: Code is pushed to repository

Your MR contains new frontend code (React components, CSS, etc.).

CI/CD pipeline is triggered automatically (GitLab CI, GitHub Actions, Jenkins, etc.).

Step 2: Build Docker image using Dockerfile

CI/CD reads the Dockerfile in your frontend folder.

Example Dockerfile for React frontend:

FROM node:20 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build   # creates static production-ready files

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

What this does:

Builds the frontend app and generates production-ready files (dist folder).

Packages those files inside an Nginx container, so it can be served anywhere.

CMD ensures Nginx runs automatically in the container.

Result: A Docker image for the frontend that is ready to deploy to INT/staging/production.

Step 3: Optional Docker Compose (multi-service)

If the CI/CD pipeline only needs the frontend → Compose is not needed.

If the pipeline needs multiple containers (e.g., frontend + DB + test backend) for integration or end-to-end tests, Compose is used to spin up all services together in an isolated environment.   


Step 3 — using Docker Compose in CI/CD — does require a pipeline configuration file like gitlab-ci.yml (if you’re using GitLab) or equivalent in other CI/CD tools (e.g., GitHub Actions, Jenkinsfile). Here’s why and how it fits in:

1. Role of gitlab-ci.yml

GitLab CI/CD doesn’t automatically know what to build or run.

The gitlab-ci.yml file tells GitLab how to run the pipeline:

Which stages to run (build, test, deploy)

Which Docker images to use for the CI environment

Commands to build your Docker image (docker build)

Optional: spin up multiple containers using Docker Compose

Example for frontend using Compose for integration tests:

stages:
  - build
  - test
  - deploy

build-frontend:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker-compose -f docker-compose.ci.yml build frontend

test-frontend:
  stage: test
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker-compose -f docker-compose.ci.yml up -d
    - npm run test
    - docker-compose -f docker-compose.ci.yml down

deploy-frontend:
  stage: deploy
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker push my-frontend:latest

2. Why you need this file

Defines the pipeline: GitLab won’t know what to do with Dockerfiles or Compose otherwise.

Runs Compose in CI/CD: Spins up multiple containers for testing or integration.

Handles deployment: Tells GitLab how to push the built Docker image to a registry or deploy to INT.

3. Key insight
Component	Role
Dockerfile	Builds a container image for a service (frontend/backend)
Docker Compose	Orchestrates multiple containers for testing or integration
gitlab-ci.yml	Orchestrates the CI/CD pipeline itself (build → test → deploy)