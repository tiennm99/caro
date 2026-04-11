plugins {
    java
    id("com.google.protobuf") version "0.9.6"
    id("com.gradleup.shadow") version "8.3.8"
}

group = "com.miti99.caro"
version = "0.0.1"
description = "Caro (Gomoku) multiplayer game server - Netty WebSocket / Protobuf"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(25)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.netty:netty-all:4.1.128.Final")
    implementation("com.google.protobuf:protobuf-java:3.25.5")
    implementation("com.google.code.gson:gson:2.11.0")

    testImplementation(platform("org.junit:junit-bom:5.11.4"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

protobuf {
    protoc {
        artifact = "com.google.protobuf:protoc:3.25.5"
    }
}

tasks.compileJava {
    options.encoding = "UTF-8"
    options.compilerArgs.add("-parameters")
}

tasks.compileTestJava {
    options.encoding = "UTF-8"
}

tasks.test {
    useJUnitPlatform()
    testLogging {
        events("passed", "skipped", "failed")
    }
}

tasks.shadowJar {
    archiveBaseName = "caro-server"
    archiveClassifier = ""
    archiveVersion = project.version.toString()

    manifest {
        attributes["Main-Class"] = "com.miti99.caro.server.SimpleServer"
    }

    mergeServiceFiles()
    append("META-INF/io.netty.versions.properties")

    exclude("META-INF/*.SF", "META-INF/*.DSA", "META-INF/*.RSA")
}

// Make `build` produce the shaded fat jar.
tasks.build {
    dependsOn(tasks.shadowJar)
}
