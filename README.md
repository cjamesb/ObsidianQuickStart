# ObsidianQuickStart: Demo of Obsidian for local installation
 

This demo requires the Deno runtime environment, as well as running postgres and redis servers.

* Install Deno:

    on Linux:
       * curl -fsSL https://deno.land/x/install/install.sh | sh

    on Mac (with Homebrew):
       * brew install deno

* Troubleshooting: Deno 1.13.0 is incompatible with Obsidian.  Please either upgrade (compatability restored as of 1.13.1) or revert to 1.12.2 using:

        deno upgrade --version 1.12.2



We have a script to populate a local postgres database with some sample data to try out some of the features of Obsidian 

The .env file defines the environmental values necessary for Obsidian to access your postgres and redis servers

#### default .env variables
* REDIS_HOST=127.0.0.1
* PG_USER = obsidian_user
* PG_DATABASE = obsidian_db
* PG_PORT = 5432
* PG_HOSTNAME = 127.0.0.1
* PG_PASSWORD = obsidian

Feel free to put whatever values you want for these credientals, but please note that these are the values being used in this guide. When you run the server the specified database will be populated with information and graphQL will link up to the database.

 

### (1) Setup for local postgres database:
* Default is running on localhost (127.0.0.1) at port 5432
* Create a database called "obsidian_db"
* Create a user "obsidian_user" with password "obsidian"
* grant all privileges on the database to the user


    #### Linux
        * sudo service postgresql start
        * sudo -u postgres psql
        * postgres=# create database obsidian_db;
        * postgres=# create user obsidian_user with encrypted password 'obsidian';
        * postgres=# grant all privileges on database obsidian_db to obsidian_user;

    #### Mac
        install Postgres and psql if you don't already have them
        Boot up Postgres on localhost with port 5432
        run psql in the command line, then run the following lines in psql:
             create database obsidian_db;
             create user obsidian_user with encrypted password 'obsidian';
             grant all privileges on database obsidian_db to obsidian_user;
         you should be good. Go ahead and exit psql ("exit")



### (2) Redis Server must be running to use the cache
* Start your redis server and make sure it is listening on port 6379

    #### Mac/Linux
        redis-server


### (3) Run server.tsx 
* run the server.tsx file in Deno with the --unstable flag.  We're going to need access to the network, file read permissions, and the environment:
     #### Mac/Linux
        deno run --allow-net --allow-read --allow-env --unstable server.tsx



NOTE: We have enabled the graphQL playground by default.  You can visit it at http://localhost:3000/graphql

Playground:

    If you set the playground option to true in the Obsidian router options you can access the graphQL playground by going to http://localhost:3000/graphql in your browser.

    Note: As a development tool the graphQL playground will continuously query the data base for the schema. It is recomened that you disable this functionality if you are not makeing direct changes to the schema.

        On the graphQL playground page, in the top right there is a settings buttons you can click on this to bring up the settings menu.

       Set the option for schema.polling.enable to false to only fetch the schema on the intial load of the page.

          "schema.polling.enable": false