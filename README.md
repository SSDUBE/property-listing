This is a simple typed Node project which lists properties and a simple auth using jwt 

To run the project perfom the steps below
- Create a .env file on the root directory
- add the below lines to your .env
    - PORT=10112
    - MONGO_CONNECTION_STRING=mongodb+srv://ssdube41:saafdsfdsfdsfdsfdsfdsfsd@cluster0.e8iewsq.mongodb.net/test
    - AUTH_SECRETE=dsfdsfiuhfdgshjgfhsdgfiug
    
- Please note the database above is already populated with house listings data. Should you need to point to your own database run:
    - npm run seed this will populate your database with the needed information
- Once you have done all of the above run
    - npm install
    - npm start 
- You should be able to see your server running and you are ready to interact with your end points

Due to time
- On the signin you are able to get a token just I have not secured the routes to actually make use of the token validation
- On the frontend I would have make use of context api to handle user signin and I would have made use of material for the responsive designs and axios for api calls