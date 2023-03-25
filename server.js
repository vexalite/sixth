// console.log("hello")

// const http = require("http")

// const Users = [{
//     name:"something",age:46
// }]

// const server = http.createServer(function(request, response){

//     console.log(request.url)
//     response.write("hello Biro!")
//     // response.write(JSON.stringify(Users))

//     response.end()
// })

// server.listen(3000, function(){
//     console.log("server is running at 3000")
// })

const http = require("http")
const Users = [
{
name: "Bruce",
age: 25
},
{
name: "Tony",
age: 30
},
{
name: "Steve",
age: 70
}
]
const server = http.createServer(function (request, response) {
const paths = request.url.split("/")

console.log("---methods--- ", request.method)

if(request.method === "GET" && paths[1] === "users" && paths.length === 2) {
response.write(JSON.stringify(Users))
}
else if(request.method === "GET" && paths[1] === "users" && paths[2]) {
const idx = paths[2]
const user = Users[idx]
if(user) {
response.write(JSON.stringify(user))
}
}
else if(request.method === "POST" && paths[1] === "users"){
  // response.statusCode(201)
  // response.write("User Data Created")

  let data = ""

  request.on("data", function (chunk){
    data += chunk
  })

  request.on("end", function(){
    const obj = JSON.parse(data.toString())
    Users.push(obj)
  })
}
else {
response.write("Not Found")
}
response.end()
})
server.listen(3000, function () {
console.log("server is running on port number 3000")
})