const userRoutes = (app, fs) => {
    // variables
    const dataPath = './src/routes/users.json';
  
    app.get('/ycHandles', (req, res) => {
        res.send(
            {
                handles: [
                    { name: "jeremy", description: "ward" },
                    { name: "sheila", description: "hanly" }
                ]
            }
        )
    });

    // READ
    app.get('/users', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
      });
    }); 
  };
  
  module.exports = userRoutes;