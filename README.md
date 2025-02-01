# Advanced URL Shortener API

A scalable URL shortener service with analytics, built using Node.js, Postgres, Redis, and Docker.
- URL: https://www.ashjosh.work.gd/api-docs/#/
## Instructions to Run the Project

### Prerequisites
- Node.js (v18+)
- Docker and Docker Compose
- Postgres DB (cloud)
- Redis instance (local or cloud)

### Setup
1. **Clone the repository**
```bash
git clone https://github.com/Ashwin-Joshy/Advanced-URL-Shortner.git
cd url-shortener
```

2. **Install dependencies**
```bash
npm install
```
### Set Up Environment Variables
3. Create a `.env` file

```
NODE_ENV=  # Set to 'development' or 'production'
DB_USERNAME=  # Database username
DB_PASSWORD=  # Database password
DB_NAME=defaultdb  # Default database name
DB_HOST=  # Database host address
DB_PORT=17375  # Database port
DB_URL=  # Full database URL (if applicable)
DB_SSL=  # Use SSL for DB connection (true/false)
GOOGLE_CLIENT_ID=  # Google OAuth client ID
GOOGLE_CLIENT_SECRET=  # Google OAuth client secret
SESSION_SECRET=  # Session encryption secret
JWT_SECRET=  # Secret key for JWT authentication
URL_PREFIX=http://localhost/api/shorten/  # Base URL for shortening service
REDIS_EXPIRY=84000  # Redis key expiration time (in seconds)
REDIS_HOST=  # Redis host address
REDIS_USERNAME=  # Redis username (if applicable)
REDIS_PASSWORD=  # Redis password (if applicable)
REDIS_PORT=18080  # Redis port
RATE_LIMIT_WINDOW=60000  # Rate limit time window (in milliseconds)
MAX_REQUEST_PER_WINDOW=20  # Max allowed requests per window
BASE_URL=http://localhost/api  # Base API URL

```

## Running the Application

### Using Docker
```bash
docker-compose up --build
```
The API will be available at [http://localhost](http://localhost).

### Running Tests
```bash
npm run test
```

### Accessing API Documentation
Visit [http://localhost:3000/api-docs](http://localhost/api-docs) after starting the server.

## Features

### ✅ User Authentication
- Google Sign-In for registration/login
- JWT-based session management

### ✅ Short URL Creation
- `POST /api/shorten` to generate short URLs
- Supports custom aliases and topic-based grouping
- Rate limiting: 5 requests per 15 minutes per user

### ✅ URL Redirection
- `GET /api/shorten/{alias}` redirects to the original URL
- Tracks IP, user agent, and geolocation for analytics

### ✅ Analytics APIs
- Per URL: `GET /api/analytics/{alias}` (clicks, OS/device data)
- Per Topic: `GET /api/analytics/topic/{topic}` (aggregated stats)
- Overall: `GET /api/analytics/overall` (user-wide insights)

### ✅ Caching
- Redis cache for short/long URL mappings

### ✅ Deployment
- Dockerised and Deployed in AWS (see Deployment URL provided in this doc)

### ✅ Documentation & Tests
- Swagger/OpenAPI docs for all endpoints
- Integration tests using Jest and Supertest

## Challenges Faced and Solutions

### Challenge 1: Rate Limiting Implementation
**Issue:** Restricting URL creation without blocking legitimate users.
**Solution:** Used `express-rate-limit` for distributed tracking. Scoped limits to user IPs

### Challenge 2: Unique User Tracking
**Issue:** Differentiating unique users behind shared IPs (e.g., NAT).
**Solution:** Combined IP address with a fingerprint from user agent + accept headers.

### Challenge 3: Geolocation Retrieval
**Issue:** Extracting user location from Ip
**Solution:** Integrated `ip-api.com` to parse geolocation accurately.

### Challenge 4: Redis-MongoDB Data Sync
**Issue:** Cache invalidation when URLs/analytics updated.
**Solution:** Set TTLs (24 hour) for most used endpoint such as getting original url

### Challenge 5: Docker Networking
**Issue:** Containers failing to communicate in Docker Compose.
**Solution:** Defined explicit networks and used service names as hostnames (e.g., `redis://redis:6379`).

## Deployment

The service is deployed on AWS EC2:
🔗 **[URL Shortener Live Demo](https://www.ashjosh.work.gd/api-docs/#/)**

### Endpoints:
- **API Docs:** `/api-docs`

## Potential Improvements
- Add rate limiting tiers (e.g., premium users get higher limits).
- Implement a dashboard for visual analytics.
- Add QR code generation for short URLs.
- Use GeoIP databases for richer location data.
- Introduce caching layers for frequent analytics queries.

---
