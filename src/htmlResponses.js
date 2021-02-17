const errorPage = `
<html>
  <head>
    <title>404 - File Not Found</title>
  </head>
  <body>
    <h1>404 - File Not Found</h1>
    <p>
      Check your URL, or your typing!!
Perhaps you are looking for <a href = /random-joke>/random-joke</a> or <a href = /random-jokes?limit=10>/random-jokes?limit=10 </a> 
</p>
<p> :-O </p>
</body>
</html>`;

const indexPage = `
<html>
  <head>
    <title>Random Jokes Plus</title>
  </head>
  <body>
    <h1>Random Jokes Plus</h1>
    <a href = /random-jokes>Click here for some random jokes! :)</a>

</body>
</html>`;

const get404Response = (request,response,params) =>{
    
    response.writeHead(404, {
      'Content-Type': 'text/html',
    });
    response.write(errorPage);
    response.end();
    
    
}
const getIndexResponse = (request,response,params) =>{
    
       response.writeHead(200, {
      'Content-Type': 'text/html',
    });
    response.write(indexPage);
    response.end();
    
}



module.exports = {
    
    get404Response,
    getIndexResponse
    
}