### getting started with project "Project_School"


### get Started with mongodb

MongoDB is a rich document-oriented NoSQL database.For getting started with MongoDB the steps to be followed are:
1. Type mongod to start the MongoDB server in the command prompt.

### mongod

In order to work with this server,we need a mediator.
2. Type mongo to connect to MongoDB database server on the aother shell.

### mongo

3. After successfully started the server,We can create the new database 

### use Student_DB

4.We can create a new collection by using the command,

### db.createCollection("student_list")

5.We can directly insert the data into the collection by using the command,(Optional)

## db.student_list.insert({rollno:1,name:"Devika",dob:"12-02-1997",stud_class="I",division:"A",gender:"Female"})

Hence the data is successfully inserted.

## RUNNING THE SPRING BOOT
To run the project move to the folder named back_end.For running the Spring Boot we can use the Maven plugin.The Spring Boot Maven plugin includes a run goal which can be used to quickly compile and run the application.
## cd back_end
### mvn spring-boot:run

RUNNING REACT

Run the React project by moving to the project folder front_end.After that run the project by using the command,
## cd front_end
## npm start

This would run the application in development mode.We can just navigate to http:localhost:8081 in any browser to preview the application.The page will automatically reload whenever it detects any code change in the source file.