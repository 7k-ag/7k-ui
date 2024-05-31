FROM node:18.18.0 AS builder

ARG GITLAB_TOKEN
ARG VERSION

ENV GITLAB_TOKEN=$GITLAB_TOKEN
ENV VERSION=$VERSION

WORKDIR /app
COPY package.json yarn.lock .npmrc ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:18.18.0 AS runner
WORKDIR /app
RUN npm i -g serve@14.2.0

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-l", "tcp://0.0.0.0:3000", "/app/dist"]