# ObsidianQuickStart
Repo to show obsidian

You must install deno on your local machine
Install Deno:

curl -fsSL https://deno.land/x/install/install.sh | sh

As of Deno 1.13.1 the program is stable, but breaking changes occured on 1.13.0.
If after installing Deno there is any problem use the following script to revert 
to Deno 1.12.2 as the development and testing of this occured on 1.12.2 

Set deno to version 1.12.2:

    deno upgrade --version 1.12.2



We have a local postgres database build that you can use to try out some of the features of Obsidian 

The .env file will declare the varibales needed for the server to start

default .env variables

REDIS_HOST=127.0.0.1
PG_USER = obsidian_user
PG_DATABASE = obsidian_db
PG_PORT = 5432
PG_HOSTNAME = 127.0.0.1
PG_PASSWORD = obsidian

Feel free to put whatever values you want for these credientals. When you run the server the specified database will be populated with information and graphQL will link up to the database.

If you have postgres installed and want to just use the default credentails to test functionality 

(1) Setup for local postgres database:

sudo service postgresql start
sudo -u postgres psql
postgres=# create database obsidian_db;
postgres=# create user obsidian_user with encrypted password 'obsidian';
postgres=# grant all privileges on database obsidian_db to obsidian_user;


(2) Redis Server must be running to use the cache
    - Start your redis server and make sure you are directing to the correct port

Linux
    redis-server



deno run --allow-net --allow-read --allow-env --unstable server.tsx

deno run --allow-all --unstable server.tsx

