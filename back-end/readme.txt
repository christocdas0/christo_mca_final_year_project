Steps to follow..

1.) unzip the folder which is attandance_management_system_full_stack
2.) we have 2 folders 
    2.1) server  => back-end, api's 
    2.2) UI => front-end 
3.) go to server  folder => open cmd => npm install => it will take some time and installing all packages which is needed.
4.) Set up the DB, 

   user name : user1
   password : 20242024

   4.1) Install MongoDb Compass ( url : https://www.mongodb.com/try/download/community )
         how to set up mongodb ( video link : https://www.youtube.com/watch?v=h2x6BmUi5zQ )
   4.2) once Db installation is Done, connect the DB, 
   4.3) Use this link => mongodb+srv://user1:20242024@attendancems.vlgrprw.mongodb.net/ 
5.) Once DB connected u can see some existing data.
    5.1) Now we have 4 collections (admins, students,classes, teachers)

6.) ONce the DB part is Done, we need to start our server.
     6.1) Go to ttandance_management_system_full_stack => server => open cmd => npm run dev
     6.2) it will show "Server Start Running on PORT 5000..."
                        "Connected to MongoDB..."
                        which means DB is Connected everything is fine.

7.) Perfom the actions.
         
