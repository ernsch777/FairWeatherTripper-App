1. I've already did a lot of revisions of this code online, but here is my first commit for my new app "Fair Weather Tripper".  It will pull in weather and map data from two separate APIs online and generate the weather for your upcoming trip. This would allow the user to plan/prepare for the weather during each step of their trip no matter if they are in the mountains, low elevation, or different weather zones all together.  Will use Weatherbit.io for the weather forecast up to 16 days and google maps for the map piece.
2. I have the weather API pulling in accurate weather for one stop at a time, I've updated how I want the weather data cards to display, and set up the overall HTML layout for the site. I've also started on handling the weather API error messages and a "loading" indicator since the weather API can be delayed by a second or two depending on internet connection.
3. Next steps are to fix the error message, working on a loading indicator/screen, and adding the multi-stop buttons and input fields.
4. Added title and adjusted html page layout and fonts.
5. Finally nailed down error handling on the search terms entered. Added media queries and responseive layout for title and search/map main sections. 
6. Fine tuned error handling and working on loading screen and spacing.
7. Added thrown error when necessary and added Async/Await code to replace straight forward fetch syntax.
8. Added number of days layout, array, error handling, and location array to store all of the locations entered up to a maximum of 16 days - which is the max the Weatherbit.io api can handle. It was the longest forecast api I could find. Ready to start generating the cards as needed for each day and location entered. 
9. Skipped to adding multi trip day fields, but could not get the javascript-created buttons to respond to a click event listner, only the first button of that class would. So I am going to add the text above the button separately and keep only one button on the page at a time. I think that will look better anyway. 
10. Fixed formatting, added card functionality and callbacks, but weather calls not working for more than one day/call at a time.  Rearranging the structure of the code currently.
