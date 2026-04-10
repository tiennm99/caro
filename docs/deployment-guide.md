# Deployment Guide

## Prerequisites

### Required
- **Java 25 (LTS)** — build + runtime
  - Download: https://adoptium.net/temurin/releases/?version=25
  - Verify: `java --version` should show `25.x`
- **Maven 3.9+** — for building
  - Verify: `mvn --version`
- **Node.js 22+** — for the client (development only; not needed if using Docker)
  - Verify: `node --version`

### Optional
- **Git** — for cloning repository
- **Docker + Docker Compose** — recommended for quick start and production
- **Nginx/Apache** — reverse proxy (optional)

---

## Quick Start (Docker Compose)

Fastest path — single command:

```bash
docker compose up --build -d
```

Then:
- Client: `http://localhost:8080/`
- Server TCP: `localhost:1024` (Protobuf)
- Server WebSocket: `ws://localhost:1025/ratel`

Stop:
```bash
docker compose down
```

What's running:
- **caro-server** — Java 25 server, listens on `1024` (TCP) + `1025` (WebSocket)
- **caro-client** — Nginx serving the built Vite bundle on host port `8080`

Storage: in-memory only; games are not persisted. Restarting clears all rooms.

Logs:
```bash
docker compose logs -f caro-server
docker compose logs -f caro-client
```

---

## Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/tiennm99/caro.git
cd caro
```

### 2. Build the Server

```bash
mvn -f server/pom.xml clean package
```

Output:
- `server/target/caro-server-0.0.1-beta.jar` — shaded fat jar (~20 MB)

With tests:
```bash
mvn -f server/pom.xml clean verify
```

Tests: 29 GomokuHelperTest + 8 GomokuAITest (JUnit 5). All must pass.

### 3. Run the Server

```bash
java -jar server/target/caro-server-0.0.1-beta.jar -p 1024
```

Output:
```
[INFO] Server listening on port 1024 (TCP)
[INFO] WebSocket server listening on port 1025
```

What's running:
- **TCP port 1024** — Protobuf protocol
- **WebSocket port 1025** — JSON protocol at `/ratel`

Note: non-WebSocket HTTP requests to `1025` return a 400/403 (no static file serving).

### 4. Run the Client (Vite dev server)

In a new terminal:

```bash
cd client
npm install
npm run dev
```

Output:
```
  VITE v6.3.1  ready in 234 ms
  ➜  Local:   http://localhost:5173/
```

Open `http://localhost:5173/` — Phaser 3 client with full game UI.

---

## Production Deployment

### Option A: Standalone JAR

```bash
java -jar caro-server-0.0.1-beta.jar -p 1024
```

For production:
- Run in background: `nohup java -jar ... &`
- Or use systemd (see below)
- Or container (Docker)

System requirements:
- 512 MB RAM (minimum)
- 1 GB RAM (recommended)
- 100 MB disk
- Java 25 runtime

Port configuration:
- Server listens on `-p {port}` (TCP)
- WebSocket automatically uses `{port}+1`

### Option B: Docker Container

The included `server/Dockerfile` is multi-stage:
- **Build stage:** `maven:3.9-eclipse-temurin-25`
- **Runtime stage:** `eclipse-temurin:25-jre-alpine`

Build from repo root (context = `.`):
```bash
docker build -f server/Dockerfile -t caro-server:0.0.1-beta .
```

Run:
```bash
docker run -d --name caro-server \
  -p 1024:1024/tcp \
  -p 1025:1025/tcp \
  caro-server:0.0.1-beta
```

### Option C: Linux Systemd Service

Create `/etc/systemd/system/caro-server.service`:

```ini
[Unit]
Description=Caro Gomoku Server
After=network.target

[Service]
Type=simple
User=gameserver
WorkingDirectory=/opt/caro
ExecStart=/usr/bin/java -jar /opt/caro/caro-server-0.0.1-beta.jar -p 1024
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable caro-server
sudo systemctl start caro-server
sudo systemctl status caro-server
sudo journalctl -u caro-server -f
```

---

## Client Deployment

### Option A: Docker Compose (Recommended)

The `client` service in `docker-compose.yml` builds `client/dist/` and serves it via Nginx on host port `8080`. Already covered in the Quick Start above.

### Option B: Static Hosting (Netlify, Vercel, AWS S3)

Build:
```bash
cd client
npm ci
npm run build
```

Output: `client/dist/` (ready to deploy)

Netlify:
```bash
netlify deploy --prod --dir client/dist
```

Vercel:
```bash
vercel --prod client
```

AWS S3:
```bash
aws s3 sync client/dist/ s3://my-bucket/caro/ --delete
```

### Option C: Nginx Reverse Proxy

Serve client + proxy WebSocket to server:

```nginx
server {
    listen 80;
    server_name caro.example.com;

    # Static files (client)
    location / {
        root /var/www/caro;
        try_files $uri /index.html;
    }

    # WebSocket proxy to server
    location /ratel {
        proxy_pass http://localhost:1025;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

Deploy:
```bash
cd client
npm run build
sudo cp -r dist/* /var/www/caro/
sudo systemctl restart nginx
```

---

## Configuration & Options

### Server Options

```bash
java -jar caro-server-0.0.1-beta.jar [OPTIONS]
```

Available options:
```
-p, -port    TCP port (default: 1024)
              WebSocket uses port + 1
```

Examples:
```bash
java -jar caro-server-0.0.1-beta.jar -p 1024    # TCP:1024, WS:1025
java -jar caro-server-0.0.1-beta.jar -p 8080    # TCP:8080, WS:8081
```

### Client Configuration

Connection endpoint is in `client/src/services/connection-service.js`. By default the client connects to WS on `window.location.hostname:1025/ratel`. To override, edit that file and rebuild.

---

## Running Tests

### Java Unit Tests (JUnit 5)

```bash
mvn -f server/pom.xml clean test
```

Expected output:
```
-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running com.miti99.caro.common.helper.tests.GomokuHelperTest
Tests run: 29, Failures: 0, Errors: 0, Skipped: 0
Running com.miti99.caro.common.robot.tests.GomokuAITest
Tests run: 8, Failures: 0, Errors: 0, Skipped: 0

Results: 37 tests passed
```

Run a single test class:
```bash
mvn -f server/pom.xml test -Dtest=GomokuHelperTest
```

### Client Tests

No automated tests currently. Manual testing:
1. Start server: `java -jar server/target/caro-server-0.0.1-beta.jar`
2. Start client: `cd client && npm run dev`
3. Open `http://localhost:5173`
4. Create game, make moves, test AI, spectate

---

## Monitoring & Maintenance

### Server Health Check

```bash
# Check TCP port
netstat -an | grep 1024
# or
lsof -i :1024

# Test WebSocket
websocat ws://localhost:1025/ratel
```

### Logs

- Foreground: stdout
- systemd: `journalctl -u caro-server -f`
- Docker: `docker compose logs -f caro-server`

### Performance Monitoring

```bash
top -p $(pgrep -f caro-server)
netstat -an | grep -c ESTABLISHED
```

### Cleanup

- Finished rooms are auto-cleaned by `RoomClearTask` after timeout
- No manual cleanup required

Restart:
```bash
kill $(pgrep -f caro-server)
java -jar server/target/caro-server-0.0.1-beta.jar -p 1024
```

---

## Troubleshooting

### Port Already in Use

```bash
lsof -i :1024
kill -9 <PID>
# Or use a different port
java -jar caro-server-0.0.1-beta.jar -p 9090
```

### Connection Refused

1. Verify server is running: `ps aux | grep caro-server`
2. Check firewall: `sudo ufw allow 1024/tcp && sudo ufw allow 1025/tcp`
3. Test connectivity: `nc -zv localhost 1024`
4. Docker: `docker compose ps` and `docker compose port server`

### WebSocket Connection Fails

1. WebSocket listens on `TCP port + 1` (default 1025)
2. Ensure the client URL is correct: `ws://host:1025/ratel`
3. Test directly: `websocat ws://localhost:1025/ratel`

### High Memory Usage

```bash
# Check concurrent clients
netstat -an | grep ESTABLISHED | wc -l

# Increase JVM heap
java -Xmx2g -jar caro-server-0.0.1-beta.jar -p 1024

# Restart to reclaim memory
```

---

## Deployment Checklist

Before going live:

- [ ] Java 25 installed and verified
- [ ] `mvn -f server/pom.xml clean verify` passes (37 tests)
- [ ] Server boots without errors
- [ ] TCP port 1024 and WebSocket port 1025 open (firewall)
- [ ] Client built: `cd client && npm ci && npm run build`
- [ ] Client connects to correct server endpoint
- [ ] Manual test: create game, make moves, join room, spectate
- [ ] Monitoring configured (logs, memory, CPU)
- [ ] Backup JAR kept on hand

---

## Updating & Patching

### Update Server

1. Back up current JAR
2. Pull + rebuild: `git pull && mvn -f server/pom.xml clean package`
3. Stop: `kill $(pgrep -f caro-server)`
4. Start new jar: `java -jar server/target/caro-server-0.0.1-beta.jar -p 1024`

### Update Client

1. `cd client && git pull && npm ci && npm run build`
2. Deploy `client/dist/` to hosting (or push to master for GH Pages auto-deploy)

### Zero-Downtime Update

1. Run new server on a different port (e.g. `-p 9090`)
2. Migrate clients gradually (or wait for natural disconnect)
3. Stop the old server

---

## Performance Tuning

### JVM Tuning

For production servers with 4+ GB RAM:

```bash
java -Xmx4g -XX:+UseG1GC -jar caro-server-0.0.1-beta.jar -p 1024
```

Java 25 defaults are already sensible; tune only if needed.
