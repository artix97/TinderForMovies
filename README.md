# TinderForMovies
To start the application start by turning on the server:
```
cd server
npm run start
```
Server will start on port 8080.
there are 3 end-points:
```
localhost:8080/recommendations
localhost:8080/recommendations/{id}/accept
localhost:8080/recommendations/{id}/reject
```
After starting the server, we can take care the appropriate application; 
to do this, run terminal 2:
```
cd client
npm run start
```
If the server is enabled, the application should start after initialization. 
Each card has an information button located in the upper left corner, which renders the summary about the video. 
Moving or pressing the buttons disables the description window. 
By default, moving the window down sends /recommendations / {id} / accept from the movie id that was visible on the 1st set. 
Moving up, left, or right sends /recommendations / {id} / reject. 
In response to each of the queries, we can observe a list of movies currently added to them. 
Additionally added buttons that mimic swipe.
__________________
Tests have also been prepared to check whether the application displays and works correctly.
When running tests, the operation of the "server"application is not required
```
cd client
npm run test
```
