# Build stage: compile standalone server jar with Maven
FROM maven:3.9-eclipse-temurin-25 AS build
WORKDIR /build

# Copy pom first for dependency caching
COPY server/pom.xml .

# Copy sources
COPY server/src src

RUN mvn -B clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:25-jre-alpine
WORKDIR /app

COPY --from=build /build/target/caro-server-0.0.1-beta.jar app.jar

# TCP (protobuf) and WebSocket ports
EXPOSE 1024 1025

ENTRYPOINT ["java", "-jar", "app.jar", "-p", "1024"]
