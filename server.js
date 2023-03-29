
// const http = require("http")
// const Users = [
// {
// name: "Bruce",
// age: 25
// },
// {
// name: "Tony",
// age: 30
// },
// {
// name: "Steve",
// age: 70
// }
// ]
// const server = http.createServer(function (request, response) {
// const paths = request.url.split("/")

// console.log("---methods--- ", request.method)

// if(request.method === "GET" && paths[1] === "users" && paths.length === 2) {
// response.write(JSON.stringify(Users))
// }
// else if(request.method === "GET" && paths[1] === "users" && paths[2]) {
// const idx = paths[2]
// const user = Users[idx]
// if(user) {
// response.write(JSON.stringify(user))
// }
// }
// else if(request.method === "POST" && paths[1] === "users"){
//   // response.statusCode(201)
//   // response.write("User Data Created")

//   let data = ""

//   request.on("data", function (chunk){
//     data += chunk
//   })

//   request.on("end", function(){
//     const obj = JSON.parse(data.toString())
//     Users.push(obj)
//   })
// }
// else if(request.method === "PUT" && paths[1] === "users" && paths[2]){
//     const idx = paths[2]
//     let data = ""
//     request.on("data", function (chunk) {
//       data += chunk
      
// })
// request.on("end", function () {
//     const obj = JSON.parse(data.toString())
//     Users[idx] = obj
//     // Users.push(obj)
    
//   })
// }
// else if(request.method === "DELETE" && paths[1] === "users" && paths[2]){
//     const idx = paths[2]
//     Users.splice(idx, 1)
// }
// else {
// response.write("Not Found")
// }
// response.end()
// })
// server.listen(3000, function () {
// console.log("server is running on port number 3000")
// })











/////////////////////////////////////////////  converted this code to arrow function ////////////////////////////////////////////////////////////////////////////

const http = require("http");

const Users = [
  {
    name: "Bruce",
    age: 25,
  },
  {
    name: "Tony",
    age: 30,
  },
  {
    name: "Steve",
    age: 70,
  },
];

const server = http.createServer((request, response) => {
  const paths = request.url.split("/");

  console.log("---methods--- ", request.method);

  if (request.method === "GET" && paths[1] === "users" && paths.length === 2) {
    response.write(JSON.stringify(Users));
  } else if (
    request.method === "GET" && paths[1] === "users" && paths[2]
  ) {
    const idx = paths[2];
    const user = Users[idx];
    if (user) {
      response.write(JSON.stringify(user));
    }
  } else if (request.method === "POST" && paths[1] === "users") {
    let data = "";

    request.on("data", (chunk) => {
      data += chunk;
    });

    request.on("end", () => {
      const obj = JSON.parse(data.toString());
      Users.push(obj);
    });
  } else if (request.method === "PUT" && paths[1] === "users" && paths[2]) {
    const idx = paths[2];
    let data = "";

    request.on("data", (chunk) => {
      data += chunk;
    });

    request.on("end", () => {
      const obj = JSON.parse(data.toString());
      //this updates the entire index regardless of the keys
      // Users[idx] = obj;
      //this will only update w.r.t the keys
      // Users[idx].name = obj.name
      // Users[idx].age = obj.age
      Users[idx] ={
        ...Users[idx],
        ...obj}
    });
  } else if (
    request.method === "DELETE" && paths[1] === "users" && paths[2]
  ) {
    //this delets w.r.t id
    // const idx = paths[2];
    // Users.splice(idx, 1);
    //this deletes w.r.t names
    const name = paths[2]
  
    const idx = Users.findIndex(element => element.name.toLowerCase() === name.toLowerCase())
    if (idx === -1){
    response.write("user not found")
    }else{
    Users.splice(idx, 1)
    response.write("user deleted successfully")
    }
  } else {
    response.write("Not Found");
  }

  response.end();
});

server.listen(3000, () => {
  console.log("server is running on port number 3000");
});
