FROM node:18 AS ui-build
WORKDIR /usr/src/app
COPY tariff-comparison-app/ ./tariff-comparison-app
RUN cd tariff-comparison-app && npm install @angular/cli && npm install && npm run build


FROM node:18 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/tariff-comparison-app/dist ./tariff-comparison-app/dist
COPY tariff-comparison-rest-api/package*.json ./
RUN npm install
COPY tariff-comparison-rest-api/server.js .

EXPOSE 8080

CMD ["node", "server.js"]
