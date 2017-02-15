# Work code sample

A simple search application that uses the free country search REST api by http://www.groupkt.com/.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install node.js https://nodejs.org/en/.

Install the package manager bower:
```
npm install -g bower
```

Install the grunt terminal client:
```
npm install -g grunt-cli
```

### Installing

Clone the code to your local drive and use npm and bower to install dependencies.

```
npm install
bower install
```

## Build

To build a distribution of the web application run:
```
grunt
```
To build a development version of the web application run:
```
grunt build
```

## Run

To start a simple webserver that will serve the application run:
```
node index.js
```
Or if you wish to run the development version:
```
node index.js dev
```

Then browse to http://localhost:8080/index.html.
