# icebreakergenerator
The Ice Breaker Generator is to be used in small group meeting settings where an ice breaker is needed but no one can think of a good one.
By hitting the website they are given an ice breaker. If they don't like that one or they need another one, they can click the button to 
get another. (Button not implemented as of 11/23/2018)

## Tech Stack
The server is a NodeJS Express REST API. The Express Static library is used for serving static content and the following endpoints are implemented:

GET /randomicebreaker: This endpoint gets the total number of rows in the Postgresql database "icebreakers" table and then picks a random row from the table to return.

POST /submiticebreaker {submission: [submission text]}: This endpoint takes a JSON object containing a submission attribute. The submission text is inserted into the ibsubmissions database along with the time of submission and an automatically incremented primary key index.

On the front end, jQuery and Bootstrap are used for displaying and styling the content.

## Local development
Local development requires a Postgres DB as defined in the config.json.local file. Simply edit the reference to the config file to point to this instead of config.json until we update the app to use profiles.