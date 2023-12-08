###################
# Build stage node
###################
FROM node:20-slim AS builder_front

WORKDIR /usr/src/app

# Setup pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install dependencies
COPY web/package.json web/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY web .

RUN pnpm run build

###################
# Build stage rust
###################
FROM rust:1-slim AS builder_back

WORKDIR /usr/src/api

COPY api/Cargo.toml api/Cargo.lock ./

RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/usr/src/api/target \
    mkdir src && \
    echo "fn main() {println!(\"if you see this, the build broke\")}" > src/main.rs && \
    cargo build --release && \
    rm -r src && \
    rm target/release/deps/api*

COPY api/migrations migrations
COPY api/src ./src

RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/usr/src/api/target \
    cargo build --release && \
    cp target/release/api ./api

###################
# Prod stage
###################
FROM debian:bookworm-slim

WORKDIR /app

RUN apt update && apt install -y glibc-source && rm -rf /var/lib/apt/lists/*

RUN useradd -m api

COPY --from=builder_back /usr/src/api/api .
COPY --from=builder_front /usr/src/app/dist ./public

RUN chown -R api:api /app

USER api

CMD ["./api"]
