Server-connected vehicles<br />
<br />
node v14.14.0<br />
npm 6.14.8<br />
<br />
Installation<br />
npm install<br />
<br />
Run<br />
npm start<br />
<br />
DB<br />
connecting to mongoDB Atlas<br />
<br />
The projected contains multiple independant modules serving a web application, a mobile application and HMI.<br />
The project is still in production mode, so there might be some bugs or deficiencies<br />
<br />
The APIs are used by 3 levels of users: <br />
    - users owning electrical vehicles<br />
    - agencies giving different online services to the vehicle owners<br />
    - admins manage both agencies and car owners through a web application<br />
<br />
Besides main modules, there are other shared services including:<br />
    - caching: using node-cache, but being implemented as a class so switching to other caching tools does not need changes in code except the   caching module<br />
    - public functions used by different service<br />
    - project configuration key fields<br />
    - middlewares: validations and authorizations<br />
    - Serving static files<br />
<br />
Most attempts have been made to follow functional programming principles. In this regard, the following concepts have been used:<br />
    - modularity<br />
    - extensibility and reusability<br />
    - closures<br />
    - currying<br />
    - higher-order functions<br />
    - anonymouse functions<br />
    - pure functions<br />
    - recursion<br />
    - one responsibility for each function principle<br />
<br />
Swagger documentation<br />
/api-docs
