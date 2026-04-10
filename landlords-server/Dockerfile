# Build stage: compile server jar with Maven
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /build

# Copy parent pom and all module poms first for dependency caching
COPY pom.xml .
COPY landlords-common/pom.xml landlords-common/
COPY landlords-server/pom.xml landlords-server/
COPY landlords-client/pom.xml landlords-client/

# Copy sources (common + server only — client not needed for runtime)
COPY landlords-common/src landlords-common/src
COPY landlords-server/src landlords-server/src
COPY landlords-client/src landlords-client/src
COPY protoc-resource protoc-resource

RUN mvn -B -pl landlords-server -am clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build /build/landlords-server/target/landlords-server-1.4.0.jar app.jar

# TCP (protobuf) and WebSocket (WS + static HTTP) ports
EXPOSE 1024 1025

ENTRYPOINT ["java", "-jar", "app.jar", "-p", "1024"]
