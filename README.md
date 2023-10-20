# tariff-comparison

A simple angular web app, using Node.js and express for the API. The solution is also containerised using the provided dockerfile.

The app compares Electricity prices, where users can estimate their annual cost based on consumption.

It also allows them to add additional products to the existing calculation models.

## Build Docker Image and Run container

Run `docker build -t tariff-node-image .` to build the image.

Run `docker run -d -p 8080:8080 --name tariff-comparison-app tariff-node-image` to run the container

Open on `http://localhost:8080/`
