## Getting Started
To install this example application, run the following commands:

```bash
git clone https://github.com/nithinshiriya/JB.git
cd JB
```
<br><br>

## Running Docker SQL Server

Make sure you have docker desktop is installed on your machine. [Download](https://docs.docker.com/get-docker/)

To start the docker, Run the following command:

```bash
docker-compose up -d
```

To verify sql server is running, run the following command:

```bash
docker-compose ps
```
<br><br>

## Running the API appliction server
Navigate to "MiniProject.API" directory and open the "MiniProject.API.sln".
After solution open, start the application. 

<br><br>
## Running Angular web application

```bash
cd web\mini-books
npm install && npm start
```