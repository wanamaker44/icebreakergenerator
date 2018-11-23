# icebreakergenerator
The Ice Breaker Generator is to be used in small group meeting settings where an ice breaker is needed but no one can think of a good one.
By hitting the website they are given an ice breaker. If they don't like that one or they need another one, they can click the button to 
get another. (Button not implemented as of 11/23/2018)

## Tech Stack
The server is a NodeJS Express REST API. The Express Static library is used for serving static content and there is one endpoint implemented for getting a random ice breaker object (GET /randomicebreaker). This endpoint gets the total number of rows in the Postgresql database "icebreakers" table and then picks a random row from the table to return.

On the front end, jQuery and Bootstrap are used for displaying and styling the content.