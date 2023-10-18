# tariff-comparison

A simple web app to compare Electricity prices, where users can estimate their annual cost based on consumption.

## Build Docker Image and Run container

Run `docker build -t tariff-node-image .` to build the image.

Run `docker run -d -p 8080:8080 --name tariff-comparison-app tariff-node-image` to run the container
