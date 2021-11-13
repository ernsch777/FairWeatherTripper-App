1. I've already did a lot of revisions of this code offline, but here is my first commit for my new app "Fair Weather Tripper".  It will pull in weather and map data from two separate APIs online and generate the weather for your upcoming trip. This would allow the user to plan/prepare for the weather during each step of their trip no matter if they are in the mountains, low elevation, or different weather zones all together.  Will use Weatherbit.io for the weather forecast up to 16 days and google maps for the map piece.
2. I have the weather API pulling in accurate weather for one stop at a time, I've updated how I want the weather data cards to display, and set up the overall HTML layout for the site. I've also started on handling the weather API error messages and a "loading" indicator since the weather API can be delayed by a second or two depending on internet connection.
3. Next steps are to fix the error message, working on a loading indicator/screen, and adding the multi-stop buttons and input fields.
4. Added title and adjusted html page layout and fonts.
5. Finally nailed down error handling on the search terms entered. Added media queries and responseive layout for title and search/map main sections. 
6. Fine tuned error handling and working on loading screen and spacing.
7. Added thrown error when necessary and added Async/Await code to replace straight forward fetch syntax.
8. Added number of days layout, array, error handling, and location array to store all of the locations entered up to a maximum of 16 days - which is the max the Weatherbit.io api can handle. It was the longest forecast api I could find. Ready to start generating the cards as needed for each day and location entered. 
9. Skipped to adding multi trip day fields, but could not get the javascript-created buttons to respond to a click event listner, only the first button of that class would. So I am going to add the text above the button separately and keep only one button on the page at a time. I think that will look better anyway. 
10. Fixed formatting, added card functionality and callbacks, but weather calls not working for more than one day/call at a time.  Rearranging the structure of the code currently.
11. Fixed multiple day weather calls, card formatting and flex wrapping. Will need to move away from Async/Await because the days of weather information are not coming back in sequential order. Will fetch and promise. Next step is to format the trip math and information card. 
12. Fetch is also returning cards out of numerical order. So I will need to sort, and I had a solution working for must numbers up to 9.  However, I had to bring in a compare function to handle the numerical comparisions and in so doing broke the sort I had.  Should have updated my files on git more often this week, but got caught up in coding one thing after another and traveling. Will try to upload after each new feature I add or bug I fix. For this 12th revision, I reformatted the card layout, adding sorting, and fixed placeholders. Next steps are to fix sorting issue, add the "delete" button functionality, add the trip highlights section, and form validation. From there I can move onto final styling and design choices and responsiveness. 
13. Sorting fixed but hit a random CORS error for larger number of locations and days entered. Documentation from weatherbit.io is sparse and when asked about the CORS error, their support says it's allowed on their API but gives no further help. All calls to the API have worked until now and I am not over the 500/day limit.  
14. Error had more to do with a "504" timeout error than a CORS issue on the API server side, so I'm led to believe that it's poor internet connectivity that I am testing this on right now.  I can no longer generate the error, but will try to open more chrome tabs and run several other apps to see if I can regnerate it in order to put an error message in for the user. As it stands right now, if the connectivity is bad enough to throw a 504 timeout, there is not a heads up to the user and weather cards will simply be missing. Glad it's not a bigger server side issue outside of my control though. 
15. Great day today with lots of progress.  Added and finalized error handling on input fields. Re-read code and comments throughout. Fixed multiple typo errors and made the code more clear. Figured out a way to speed up the program. Instead of making a fetch call to the API for every day, I will put some logic in the code to only fetch for each city/location indicated.  So the number of API calls will greatly go down and I should avoic the 504 error and longer wait times. Should finalize this step tomorrow. 
