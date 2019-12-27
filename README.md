# final_project
This is a  node.js application with MongoDB access, can be used to implementation for CRUD operations with MongoDB

This expects the environment variable MONGO_URL, which you can set using below command 

On Linux platform
```
export MONGO_URL='mongodb://localhost:27017/testDB'
echo Testing - $MONGO_URL
```

run in cd server
sudo service mongod start
mongo testDB

On Windows platform
```
SET MONGO_URL='mongodb://localhost:27017/testDB'
echo Testing - %MONGO_URL%
```


### How to run this project

1. Install dependencies for each of the microservice

```
npm install
```

or

```
yarn
```

2. Run each microservice application from terminal

```
npm start
```

3. Run test cases from terminal

```
npm run test
```

4. Run lint checks from terminal

```
npm run lint
```



