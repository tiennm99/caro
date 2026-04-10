# Build stage: compile standalone server jar with Gradle wrapper
FROM eclipse-temurin:25-jdk AS build
WORKDIR /build

# Copy wrapper + build scripts first for dependency caching
COPY server/gradlew server/gradlew
COPY server/gradle server/gradle
COPY server/settings.gradle.kts server/settings.gradle.kts
COPY server/build.gradle.kts server/build.gradle.kts

# Pre-fetch dependencies (cacheable layer)
RUN chmod +x server/gradlew && server/gradlew -p server --no-daemon dependencies

# Copy sources and build
COPY server/src server/src
RUN server/gradlew -p server --no-daemon clean shadowJar

# Runtime stage
FROM eclipse-temurin:25-jre-alpine
WORKDIR /app

COPY --from=build /build/server/build/libs/caro-server-0.0.1-beta.jar app.jar

# TCP (protobuf) and WebSocket ports
EXPOSE 1024 1025

ENTRYPOINT ["java", "-jar", "app.jar", "-p", "1024"]
