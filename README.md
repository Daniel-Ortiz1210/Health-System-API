# 🏥 [Microservice] HealthCare System API

## Contents

- [🏥 \[Microservice\] HealthCare System API](#-microservice-healthcare-system-api)
  - [Contents](#contents)
  - [Project Setup and Installation](#project-setup-and-installation)
    - [Prerequisites](#prerequisites)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [3. Set Up the Environment Variables](#3-set-up-the-environment-variables)
    - [4. Build and Run the Containers](#4-build-and-run-the-containers)
    - [5. Local runnning](#5-local-runnning)
  - [API REST Documentation](#api-rest-documentation)
  - [Testing Instructions](#testing-instructions)

## Project Setup and Installation

### Prerequisites

Before you begin, ensure that you have the following tools installed on your machine:

- **Git**: To clone the repository.
- **Docker**: To build and run containers.
- **Docker Compose**: To manage multiple containers.
- **Node.js**: To run backend server.

### 1. Clone the Repository

First, you need to clone this repository to your local machine. Open a terminal and run the following command:

```bash
git clone https://github.com/Daniel-Ortiz1210/Health-System-API
cd <Health-System-API>
```

### 3. Set Up the Environment Variables

Create a `.env` file in the root directory of the project and copy the content from the file attached in the email.
If you don't have the file, you can create it manually with the following content:

```bash
APP_NAME='[Microservice] HealthCare System API'
HOST='0.0.0.0'
PORT=3001
```

### 4. Build and Run the Containers

To build and run the containers, you need to execute the following command (You need to have Docker and Docker Compose installed):

```bash
docker-compose up --build -d
```

This command will build the Docker images and run the containers in detached mode.

### 5. Local runnning

To run the API locally, you need to run the following commands:

Install npm packages:

```bash
npm install --save
```

Run the API:

```bash
npm run start
```

## API REST Documentation

Once the containers are up and running, you can access the API documentation using your browser.
The API documentation is available at the following URL:

```bash
http://0.0.0.0:3001/docs
```

**Note**: The API documentation is generated using Swagger UI.

## Testing Instructions

To run the tests, you need to execute the following command:

If you are running the API locally:

```bash
npm run test
```

If you are running the API using Docker:

```bash
docker-compose exec app npm run test
```
