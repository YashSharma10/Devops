# DevOps Project: Full Stack CRUD Application

This project demonstrates a complete DevOps workflow for a full stack CRUD application, including containerization with Docker, orchestration with Kubernetes, and monitoring using Prometheus and Grafana.

## Description
This repository is designed as a hands-on, end-to-end DevOps showcase for modern application delivery. It covers the entire lifecycle of a cloud-native application, from development to deployment and monitoring, using industry-standard tools and best practices.

The backend is a Java Spring Boot REST API that provides CRUD operations for user management, while the frontend is a React application that interacts with the backend. The application is backed by a MySQL database. All components are containerized for consistency and ease of deployment.

The project includes:
- **Dockerization**: Each service (frontend, backend, database) is containerized, ensuring consistent environments across development, testing, and production.
- **Kubernetes Orchestration**: Kubernetes manifests are provided for deploying each component, managing scaling, networking, and service discovery.
- **Monitoring & Observability**: Prometheus scrapes metrics from the backend and the Kubernetes cluster, while Grafana provides dashboards for real-time visualization and alerting.
- **Best Practices**: The project structure, configuration, and deployment scripts follow DevOps best practices, making it a great learning resource for CI/CD, infrastructure as code, and cloud-native patterns.

### Use Cases
- Learning and demonstrating DevOps workflows
- Practicing containerization and orchestration
- Understanding monitoring and observability in microservices
- Rapid prototyping of full stack applications

### Learning Outcomes
- How to build, containerize, and deploy a full stack application
- How to use Docker Compose for local development
- How to deploy and manage applications on Kubernetes
- How to set up monitoring with Prometheus and Grafana

Feel free to use this project as a template for your own DevOps experiments or as a reference for best practices in modern application delivery.

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running with Docker Compose](#running-with-docker-compose)
  - [Deploying to Kubernetes](#deploying-to-kubernetes)
- [Monitoring](#monitoring)
- [Project Structure](#project-structure)
- [License](#license)

---

## Project Overview
This repository contains a Java Spring Boot backend and a React frontend, both containerized with Docker. The application is orchestrated using Kubernetes and monitored with Prometheus and Grafana.

## Architecture
- **Backend:** Java Spring Boot REST API for CRUD operations
- **Frontend:** React application for user interaction
- **Database:** MySQL
- **Containerization:** Docker
- **Orchestration:** Kubernetes (with YAML manifests)
- **Monitoring:** Prometheus (metrics collection) and Grafana (visualization)

## Tech Stack
- Java 17, Spring Boot
- React, Node.js
- MySQL
- Docker, Docker Compose
- Kubernetes
- Prometheus, Grafana

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Kubernetes (Minikube, Docker Desktop, or a cloud provider)

### Running with Docker Compose
1. Build and start all services:
   ```sh
   docker-compose up --build
   ```
2. Access the frontend at `http://localhost:3000` and backend at `http://localhost:8080`.

### Deploying to Kubernetes
1. Apply the Kubernetes manifests:
   ```sh
   kubectl apply -f k8s/namespace.yaml
   kubectl apply -f k8s/mysql-deployment.yaml
   kubectl apply -f k8s/backend-deployment.yaml
   kubectl apply -f k8s/frontend-deployment.yaml
   ```
2. Expose services as needed (e.g., using `kubectl port-forward` or LoadBalancer).

## Monitoring
- **Prometheus** collects metrics from the backend and Kubernetes cluster.
- **Grafana** visualizes metrics and dashboards.
- To enable monitoring, deploy Prometheus and Grafana in your cluster (Helm charts recommended).

## Project Structure
```
backend/    # Spring Boot backend (Java)
frontend/   # React frontend
k8s/        # Kubernetes manifests (YAML)
docker-compose.yml
```

## License
This project is licensed under the MIT License.
