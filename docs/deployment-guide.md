# Deployment Guide

## Prerequisites

### Required
- **Java 8+** (tested on Java 8, 11, 21)
  - Download: https://www.oracle.com/java/technologies/downloads/
  - Verify: `java -version`

- **Maven 3.6+** (for building)
  - Download: https://maven.apache.org/download.cgi
  - Verify: `mvn -version`

- **Node.js 18+** (for web client only)
  - Download: https://nodejs.org/
  - Verify: `node --version` and `npm --version`

### Optional
- **Git** — for cloning repository
- **Docker + Docker Compose** — for containerized deployment (recommended for quick start)
- **nginx/Apache** — for reverse proxy (if needed)

---

## Quick Start (Docker Compose)

**Fastest way to get started — single command:**

```bash
docker compose up --build
```

**Then:**
- Open `http://localhost:8080` in your browser
- Server API: `http://localhost:1024` (TCP), `http://localhost:1025` (WebSocket)

**Stop:**
```bash
docker compose down
```

**What's running:**
- **caro-server** — Java server on `1024` (TCP) + `1025` (WebSocket/HTTP)
- **caro-web-client** — Nginx serving web UI on host port `8080`

**Storage:** In-memory only; games not persisted. Restart to clear all rooms.

**Logs:**
```bash
docker compose logs -f caro-server
docker compose logs -f caro-web-client
```

**Prerequisites:** Docker + Docker Compose

---

## Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/tiennm99/caro.git
cd caro
```

### 2. Build Java Modules

**Build all modules (server + CLI client):**

```bash
mvn clean package -DskipTests
```

**Output:**
- `landlords-server/target/landlords-server-1.4.0.jar` (15-20 MB)
- `landlords-client/target/landlords-client-1.4.0.jar` (10-15 MB)
- `landlords-common/target/landlords-common-1.4.0.jar` (shared lib)

**With tests (recommended):**

```bash
mvn clean package
```

Takes ~30-60 seconds. Tests must pass before continuing.

### 3. Run Server

```bash
java -jar landlords-server/target/landlords-server-1.4.0.jar -p 1024
```

**Output:**
```
[INFO] Server listening on port 1024 (TCP)
[INFO] WebSocket server listening on port 1025
[INFO] Static file handler enabled
```

**What's running:**
- **TCP port 1024** — CLI clients connect here (Protobuf protocol)
- **WebSocket port 1025** — Web clients connect here (JSON protocol)
- **HTTP port 1025** — Static file serving (same port as WebSocket)

### 4. Play in Browser (Built-in UI)

Open `http://localhost:1025/` in your browser.

This is a basic static HTML UI served directly by the server. To play:
1. Enter your nickname
2. Choose PVP or PVE (with difficulty)
3. Create or join a room
4. Wait for opponent or start AI game

### 5. Play with Phaser Web Client (Recommended)

**In a new terminal:**

```bash
cd web-client
npm install
npm run dev
```

**Output:**
```
  VITE v6.3.1  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Open `http://localhost:5173/` in your browser.

This is the full-featured Phaser 3 client with:
- Professional board rendering
- Stone animations
- Move history panel
- Sound effects
- Better responsive design

### 6. Play from CLI (Terminal)

**In another terminal:**

```bash
java -jar landlords-client/target/landlords-client-1.4.0.jar -h 127.0.0.1 -p 1024
```

**Usage:**
1. Enter your nickname
2. Choose game mode (create PVP/PVE, join room, spectate)
3. Make moves as `row,col` (e.g., `7,7` for center)
4. Type `exit` or `e` to quit

---

## Production Deployment

### Option A: Standalone JAR (Recommended)

**Simplest deployment — single command:**

```bash
java -jar landlords-server-1.4.0.jar -p 1024
```

**For production:**
- Run in background: `nohup java -jar ... &`
- Or use systemd service (see below)
- Or container (Docker)

**System Requirements:**
- 512 MB RAM (minimum)
- 1 GB RAM (recommended)
- 100 MB disk space
- Java 8+

**Port Configuration:**
- Server listens on `-p {port}` (TCP)
- WebSocket/HTTP automatically use `{port} + 1`

**Example:**
- `-p 1024` → TCP:1024, WS/HTTP:1025
- `-p 8080` → TCP:8080, WS/HTTP:8081

### Option B: Docker Container

**Dockerfile example:**

```dockerfile
FROM openjdk:8-jre-slim

WORKDIR /app

COPY landlords-server/target/landlords-server-1.4.0.jar .

EXPOSE 1024 1025

CMD ["java", "-jar", "landlords-server-1.4.0.jar", "-p", "1024"]
```

**Build:**
```bash
docker build -t caro-server:1.4.0 .
```

**Run:**
```bash
docker run -d --name caro-server \
  -p 1024:1024/tcp \
  -p 1025:1025/tcp \
  caro-server:1.4.0
```

### Option C: Linux Systemd Service

**Create service file `/etc/systemd/system/caro-server.service`:**

```ini
[Unit]
Description=Caro Gomoku Server
After=network.target

[Service]
Type=simple
User=gameserver
WorkingDirectory=/opt/caro
ExecStart=/usr/bin/java -jar /opt/caro/landlords-server-1.4.0.jar -p 1024
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

**Enable and start:**
```bash
sudo systemctl daemon-reload
sudo systemctl enable caro-server
sudo systemctl start caro-server
```

**Monitor:**
```bash
sudo systemctl status caro-server
sudo journalctl -u caro-server -f
```

---

## Web Client Deployment

### Option A: GitHub Pages (Automatic)

Push to `master` branch. GitHub Actions automatically:
1. Build web client (`npm run build`)
2. Deploy to `https://tiennm99.github.io/caro/`

**Configuration:** `.github/workflows/deploy-pages.yml`

**URL:** `https://<username>.github.io/caro/`

**Connect to custom server:**
- Web client connects to server on `window.location.hostname`
- For different server, modify `connection-service.js` endpoint

### Option B: Static Hosting (Netlify, Vercel, AWS S3)

**Build:**
```bash
cd web-client
npm install
npm run build
```

**Output:** `web-client/dist/` directory (ready to deploy)

**Deploy to Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir web-client/dist
```

**Deploy to Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**Deploy to AWS S3:**
```bash
aws s3 sync web-client/dist/ s3://my-bucket/caro/ --delete
```

### Option C: Nginx Reverse Proxy

**Serve web client + proxy API:**

```nginx
server {
    listen 80;
    server_name caro.example.com;

    # Static files (web client)
    location / {
        root /var/www/caro;
        try_files $uri /index.html;
    }

    # WebSocket proxy to server
    location /ratel {
        proxy_pass ws://localhost:1025;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

**Deploy:**
```bash
# Build web client
cd web-client
npm run build

# Copy to nginx root
sudo cp -r dist/* /var/www/caro/

# Restart nginx
sudo systemctl restart nginx
```

---

## Configuration & Options

### Server Options

**Usage:**
```bash
java -jar landlords-server-1.4.0.jar [OPTIONS]
```

**Available options:**
```
-p, -port    TCP port (default: 1024)
              WebSocket will use port + 1 (e.g., 1025)
```

**Examples:**
```bash
java -jar landlords-server-1.4.0.jar -p 1024    # TCP:1024, WS:1025
java -jar landlords-server-1.4.0.jar -p 8080    # TCP:8080, WS:8081
java -jar landlords-server-1.4.0.jar             # TCP:1024, WS:1025 (default)
```

### CLI Client Options

**Usage:**
```bash
java -jar landlords-client-1.4.0.jar -h <host> -p <port> [OPTIONS]
```

**Required:**
```
-h, -host         Server hostname/IP (required)
-p, -port         Server TCP port (required)
```

**Optional:**
```
-ptl, -protocol   Protocol: "pb" (Protobuf/TCP) or "ws" (WebSocket)
                  Default: "pb" (Protobuf)
-lang             Language: "en", "en_US"
                  Default: "en"
```

**Examples:**
```bash
# Connect to localhost via TCP (default)
java -jar landlords-client-1.4.0.jar -h 127.0.0.1 -p 1024

# Connect to remote server via WebSocket
java -jar landlords-client-1.4.0.jar -h example.com -p 1024 -ptl ws

# With language
java -jar landlords-client-1.4.0.jar -h localhost -p 1024 -lang en_US
```

### Web Client Configuration

**Connection endpoint:** Defined in `connection-service.js`

```javascript
// Default: connect to server on same host:1025/ratel
const wsUrl = `ws://${window.location.hostname}:1025/ratel`;
```

**To connect to different server:**

Edit `web-client/src/services/connection-service.js`:

```javascript
// Change this line:
const wsUrl = `ws://${window.location.hostname}:1025/ratel`;

// To:
const wsUrl = 'ws://your-server.com:1025/ratel';
```

Then rebuild:
```bash
npm run build
```

---

## Running Tests

### Java Unit Tests

**Run all tests:**
```bash
mvn clean test
```

**Expected output:**
```
-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running org.nico.ratel.landlords.helper.tests.GomokuHelperTest
Tests run: 20, Failures: 0, Errors: 0, Skipped: 0
Running org.nico.ratel.landlords.robot.tests.GomokuAITest
Tests run: 17, Failures: 0, Errors: 0, Skipped: 0

Results: 37 tests passed
```

**Run specific test:**
```bash
mvn test -Dtest=GomokuHelperTest
```

**Run with coverage (requires plugin):**
```bash
mvn clean test jacoco:report
# Report: target/site/jacoco/index.html
```

### Web Client Tests

Currently no automated tests for web client (UI testing requires Selenium/Cypress).

**Manual testing:**
1. Start server: `java -jar landlords-server-1.4.0.jar`
2. Start web client: `npm run dev` in web-client/
3. Open browser: `http://localhost:5173`
4. Test flows: Create game, make moves, check AI, spectate, etc.

---

## Monitoring & Maintenance

### Server Health Check

**Check if server is running:**

```bash
# Check port 1024 (TCP)
netstat -an | grep 1024

# Or using lsof
lsof -i :1024
```

**Test WebSocket connection:**

```bash
# Using curl (if server supports HTTP health endpoint)
curl -i http://localhost:1025/

# Or open browser console and test:
// In browser console:
ws = new WebSocket('ws://localhost:1025/ratel')
ws.onopen = () => console.log('Connected')
ws.onerror = (e) => console.log('Error:', e)
```

### Logs

**Server logs:**
- Standard output (if running in foreground)
- If using systemd: `journalctl -u caro-server -f`
- If using Docker: `docker logs -f caro-server`

**Key log patterns:**
```
[INFO] Client connected: <ip>
[INFO] Room created: <room-id>
[INFO] Game move: <player> at <row>,<col>
[ERROR] Invalid move: <reason>
```

### Performance Monitoring

**Memory usage:**
```bash
# While server is running
top -p $(pgrep -f landlords-server)
```

**Check concurrent connections:**
```bash
# Linux
netstat -an | grep -c ESTABLISHED

# macOS
netstat -an | grep -c ESTABLISHED

# Or with lsof
lsof -i -P -n | grep java | wc -l
```

### Cleanup & Maintenance

**Clear inactive rooms (automatic):**
- Server auto-cleans finished rooms after 1 hour
- No manual action needed

**Restart server:**
```bash
# Kill current process
kill $(pgrep -f landlords-server)

# Or force kill
kill -9 $(pgrep -f landlords-server)

# Start again
java -jar landlords-server-1.4.0.jar -p 1024
```

---

## Troubleshooting

### Port Already in Use

**Error:** `Address already in use`

**Solution:**
```bash
# Find process using port 1024
lsof -i :1024

# Kill it
kill -9 <PID>

# Or use different port
java -jar landlords-server-1.4.0.jar -p 9090
```

### Connection Refused

**Error:** `Connection refused: connect` (client can't reach server)

**Solutions:**
1. **Check server is running:**
   ```bash
   ps aux | grep landlords-server
   ```

2. **Check firewall:**
   ```bash
   # Allow port
   sudo ufw allow 1024/tcp
   sudo ufw allow 1025/tcp
   ```

3. **Check hostname/IP:**
   ```bash
   # From client machine, test connectivity
   nc -zv localhost 1024
   nc -zv server-ip 1024
   ```

4. **Check port mapping (if Docker):**
   ```bash
   docker ps -a
   docker port caro-server
   ```

### WebSocket Connection Fails

**Error:** `Failed to connect to WebSocket`

**Solutions:**
1. **Check WebSocket port (TCP + 1):**
   ```bash
   # If TCP is 1024, WebSocket should be 1025
   lsof -i :1025
   ```

2. **Check CORS (if web client on different domain):**
   - Server doesn't require CORS (native WebSocket)
   - Ensure client connects to correct hostname

3. **Test WebSocket directly:**
   ```bash
   # Using websocat tool
   websocat ws://localhost:1025/ratel
   # Should show connection
   ```

### High Memory Usage

**If server uses > 1 GB RAM:**

1. **Check concurrent players:**
   ```bash
   netstat -an | grep ESTABLISHED | wc -l
   ```

2. **Increase JVM heap:**
   ```bash
   java -Xmx2g -jar landlords-server-1.4.0.jar -p 1024
   ```

3. **Check for room leaks** (finished rooms not cleaned):
   - Restart server to clear memory
   - Or check RoomClearTask configuration

### Slow Performance

**If moves are delayed (> 500ms):**

1. **Check CPU usage:**
   ```bash
   top -p $(pgrep -f landlords-server)
   ```

2. **Check network latency:**
   ```bash
   ping server-ip
   ```

3. **Check board size** (AI might be slow):
   - Hard difficulty AI takes ~1 second
   - This is normal, not a bug

4. **Reduce AI difficulty** (if PVE):
   - Easy: instant
   - Medium: < 100ms
   - Hard: ~1 second

### Client Can't Join Room

**Error:** `Room is full` or `Room does not exist`

**Solutions:**
1. **Room full:** Max 2 players + spectators. Create new room.
2. **Room doesn't exist:** Room was deleted (auto-cleanup). List rooms again.
3. **Connection lost:** Try reconnecting. Web client auto-reconnects.

---

## Deployment Checklist

Before going live:

- [ ] Java 8+ installed
- [ ] Build successful: `mvn clean package` (all tests pass)
- [ ] Server starts without errors: `java -jar landlords-server-1.4.0.jar -p 1024`
- [ ] TCP port 1024 and WebSocket port 1025 open (firewall)
- [ ] Web client built: `npm run build`
- [ ] Web client connects to correct server endpoint
- [ ] Tested: Create game, make moves, join room, spectate
- [ ] Tested: CLI client connection
- [ ] Monitored: Server memory and CPU under load
- [ ] Logged: Set up log aggregation if needed
- [ ] Backup: Keep copy of JAR and config
- [ ] Health check: Set up monitoring/alerting

---

## Updating & Patching

### Update Server

1. **Back up current JAR:**
   ```bash
   cp landlords-server-1.4.0.jar landlords-server-1.4.0.jar.backup
   ```

2. **Download new version:**
   ```bash
   git pull origin master
   mvn clean package -DskipTests
   ```

3. **Stop current server:**
   ```bash
   kill $(pgrep -f landlords-server)
   ```

4. **Start new version:**
   ```bash
   java -jar landlords-server/target/landlords-server-1.4.0.jar -p 1024
   ```

5. **Verify:**
   ```bash
   # Test connection
   java -jar landlords-client-1.4.0.jar -h localhost -p 1024
   ```

### Update Web Client

1. **Rebuild:**
   ```bash
   cd web-client
   git pull origin master
   npm install
   npm run build
   ```

2. **Deploy new `dist/` to hosting:**
   ```bash
   # If using GitHub Pages: just push
   git push origin master

   # If manual: copy dist/ to server
   scp -r dist/* user@server:/var/www/caro/
   ```

### Zero-Downtime Update

**For critical updates without disconnecting players:**

1. Keep old server running on separate port: `-p 9090`
2. Start new server on original port: `-p 1024`
3. Gradually migrate clients (or wait for natural disconnect)
4. Stop old server

---

## Performance Tuning

### JVM Tuning

**For production servers with 4+ GB RAM:**

```bash
java -Xmx4g \
     -Xms2g \
     -XX:+UseG1GC \
     -XX:MaxGCPauseMillis=200 \
     -jar landlords-server-1.4.0.jar -p 1024
```

**Flags:**
- `-Xmx4g` — Max heap size (4 GB)
- `-Xms2g` — Initial heap size (2 GB)
- `-XX:+UseG1GC` — Use G1 garbage collector (better for large heaps)
- `-XX:MaxGCPauseMillis=200` — Limit pause time

### Network Tuning

**Linux socket tuning (for high concurrency):**

```bash
# Increase max file descriptors
ulimit -n 65536

# Increase TCP backlog
sysctl -w net.core.somaxconn=65535
sysctl -w net.ipv4.tcp_max_syn_backlog=65535
```

### Load Balancing

**If more than 50+ concurrent players, consider load balancing:**

```nginx
upstream caro_servers {
    server localhost:1024;
    server localhost:1025;
}

server {
    listen 1024;
    proxy_pass caro_servers;
}
```

---

## Rollback Plan

**If new version has issues:**

1. **Stop new server:**
   ```bash
   kill $(pgrep -f landlords-server)
   ```

2. **Restore backup JAR:**
   ```bash
   cp landlords-server-1.4.0.jar.backup landlords-server-1.4.0.jar
   ```

3. **Start old version:**
   ```bash
   java -jar landlords-server-1.4.0.jar -p 1024
   ```

4. **Notify players:**
   - Existing games end
   - Players reconnect to stable version

---

## References

- **Caro Repository:** https://github.com/tiennm99/caro
- **Java Downloads:** https://www.oracle.com/java/technologies/downloads/
- **Maven Guide:** https://maven.apache.org/
- **Node.js Downloads:** https://nodejs.org/
- **Phaser 3 Docs:** https://photonstorm.github.io/phaser3-docs/
- **Vite Docs:** https://vitejs.dev/
- **Netty Guide:** https://netty.io/wiki/
