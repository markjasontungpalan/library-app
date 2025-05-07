📦 Server Setup Instructions
✅ 1. Create the server folder

  mkdir server
  cd server

✅ 2. Initialize a package.json file

  npm init -y

✅ 3. Install Express and add it as a dependency

  npm i express

✅ 4. Install Nodemon as a development dependency

  npm i --save-dev nodemon

  ✅ What does this do?
  Nodemon automatically restarts the server when file changes are detected.

  --save-dev marks it as a development-only tool in package.json.

✅ 5. Modify package.json scripts
  In package.json, update the scripts section:

  "scripts": {
    "devStart": "nodemon server.js"
  }

  ✅ What does this do?
  Adds a custom script called devStart to run:
  nodemon server.js

  You can now run it easily with:
  npm run devStart

✅ 6. Run the devStart script in the terminal

  npm run devStart

✅ 7. Create the server.js file

  Inside the server directory, create a new file:
  server.js

  ✅ Tip:
  Start with this basic Express code:

  const express = require('express');
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });

✅ 8. Create "views" directory to store view files (html or hbs)

✅ 9. Create "views" directory to store view files (html or hbs)

  npm i express-handlebars

✅ 10. Configure server to use express-handlebars as view engine

  import exphbs from "express-handlebars";

  app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
  <!-- 
    app.engine(extension, callbackFunction)  
      extension → the file extension you want to associate (e.g., .hbs, .ejs) 
      callbackFunction → the function Express should use to render that template

    app.engine('.hbs', ...)
      “Whenever you see a .hbs file, use this function to render it into HTML.”
    
    exphbs.engine()
      returns a properly configured rendering function for .hbs templates.
    
    extname: '.hbs' 
      “Override the default .handlebars extension and use .hbs instead"
    
    defaultLayout:false                                 
      “Do not use any layout globally.”
    })                     
);
   -->

✅ 11. Create routes directory

