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
Po uruchomieniu serwera możemy zająć się uruchomieniem aplikacji właściwej; 
aby to zrobić należy uruchomić 2 terminal:
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
