Server-connected vehicles

node v14.14.0
npm 6.14.8

Installation
npm install

Run
npm start

DB
connecting to mongoDB Atlas

The projected contains multiple independant modules serving a web application, a mobile application and HMI.
The project is still in production mode, so there might be some bugs or deficiencies

The APIs are used by 3 levels of users: 
    - users owning electrical vehicles
    - agencies giving different online services to the vehicle owners
    - admins manage both agencies and car owners through a web application

Besides main modules, there are other shared services including:
    - caching: using node-cache, but being implemented as a class so switching to other caching tools does not need changes in code except the   caching module
    - public functions used by different service
    - project configuration key fields
    - middlewares: validations and authorizations
    - Serving static files

Most attempts have been made to follow functional programming principles. In this regard, the following concepts have been used:
    - modularity
    - extensibility and reusability
    - closures
    - currying
    - higher-order functions
    - anonymouse functions
    - pure functions
    - recursion
    - one responsibility for each function principle
