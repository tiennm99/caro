plugins {
    java
    id("com.gradleup.shadow") version "8.3.5"
}

group = "com.miti99.caro"
version = "0.0.1-beta"
description = "Caro (Gomoku) multiplayer game server - Netty-based TCP + WebSocket"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(25)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.netty:netty-all:4.1.115.Final")
    implementation("com.google.protobuf:protobuf-java:3.25.5")
    implementation("com.google.code.gson:gson:2.11.0")

    testImplementation(platform("org.junit:junit-bom:5.11.3"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
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
