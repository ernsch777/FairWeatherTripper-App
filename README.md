1. I've already did a lot of revisions of this code offline, but here is my first commit for my new app "Fair Weather Tripper".  It will pull in weather and map data from two separate APIs online and generate the weather for your upcoming trip. This would allow the user to plan/prepare for the weather during each step of their trip no matter if they are in the mountains, low elevation, or different weather zones all together.  Will use Weatherbit.io for the weather forecast up to 16 days and google maps for the map piece eventually.
2. I have the weather API pulling in accurate weather for one stop at a time, I've updated how I want the weather data cards to display, and set up the overall HTML layout for the site. I've also started on handling the weather API error messages and a "loading" indicator since the weather API can be delayed by a second or two depending on internet connection.
3. Next steps are to fix the error message, working on a loading indicator/screen, and adding the multi-stop buttons and input fields.
4. Added title and adjusted html page layout and fonts.
5. Finally nailed down error handling on the search terms entered. Added media queries and responsive layout for title and search/map main sections. 
6. Fine tuned error handling and working on loading screen and spacing.
7. Added thrown error when necessary and added Async/Await code to replace straight forward fetch syntax.
8. Added number of days layout, array, error handling, and location array to store all of the locations entered up to a maximum of 16 days - which is the max the Weatherbit.io api can handle. It was the longest forecast api I could find. Ready to start generating the cards as needed for each day and location entered. 
9. Skipped to adding multi trip day fields, but could not get the javascript-created buttons to respond to a click event listener, only the first button of that class would. So I am going to add the text above the button separately and keep only one button on the page at a time. I think that will look better anyway. 
10. Fixed formatting, added card functionality and callbacks, but weather calls not working for more than one day/call at a time.  Rearranging the structure of the code currently.
11. Fixed multiple day weather calls, card formatting and flex wrapping. Will need to move away from Async/Await because the days of weather information are not coming back in sequential order. Will fetch and promise. Next step is to format the trip math and information card. 
12. Fetch is also returning cards out of numerical order. So I will need to sort, and I had a solution working for most numbers up to 9.  However, I had to bring in a compare function to handle the numerical comparisons and in so doing broke the sort I had.  Should have updated my files on git more often this week, but got caught up in coding one thing after another and traveling. Will try to upload after each new feature I add or bug I fix. For this 12th revision, I reformatted the card layout, adding sorting, and fixed placeholders. Next steps are to fix sorting issue, add the "delete" button functionality, add the trip highlights section, and form validation. From there I can move onto final styling and design choices and responsiveness. 
13. Sorting fixed but hit a random CORS error for larger number of locations and days entered. Documentation from weatherbit.io is sparse and when asked about the CORS error, their support says it's allowed on their API but gives no further help. All calls to the API have worked until now and I am not over the 500/day limit.  
14. Error had more to do with a "504" timeout error than a CORS issue on the API server side, so I'm led to believe that it's poor internet connectivity that I am testing this on right now.  I can no longer generate the error, but will try to open more chrome tabs and run several other apps to see if I can regenerate it in order to put an error message in for the user. As it stands right now, if the connectivity is bad enough to throw a 504 timeout, there is not a heads up to the user and weather cards will simply be missing. Glad it's not a bigger server side issue outside of my control though. 
15. Great day today with lots of progress.  Added and finalized error handling on input fields. Re-wrote code and comments throughout. Fixed multiple typo errors and made the code more clear. Figured out a way to speed up the program. Instead of making a fetch call to the API for each and every day, I will put some logic in the code to only fetch for each city/location indicated.  So the number of API calls will greatly go down and I should avoid the 504 error and longer wait times. Should finalize this step tomorrow. 
16. Spent hours reorganizing and simplifying the code. Once it was more clean, cut the number of calls to weatherbit.io and this should help with 504 error. Their server is still slow, so there is still a chance for this error to show itself for large number of stops and simultaneous data calls. But the code is clean now, all calls are working properly, and cards are being created, sorted, and displayed properly. 
17. Added trip highlight section. Needs formatting but functionality is working.
18. Added delete button functionality. Was a little tricky to remove the stop's location and days from the running totals while renaming the weather card divs previously added. Proud of it.
19. Got rid of the double click problem on the add stop and generate buttons. More reformatting, code comments updated, and sorted. 
20. After a month break away from this project, it's time to design the final front end design and layout. Will add some animations and get it production ready. 
21. Found new background image, title font, new logo and catch phrases for the site, and new layout idea. Also fixed a math error in low temp calculation. Need a good cursive font and figure out how to hide necessary sections as next steps. 
22. After a holiday break, 1) fixed background image position and responsiveness 2) cleaned up css code 3) hid search and loading screens properly 4) added animation for loading screen instead of loading text 5) made cards readable and fixed fonts 6) moved cursive font to make it work visually. Landing page is now responsive except for small phones, but also need to make results and loading screens to catch up. Spice up the results window and make size match other windows. After that should be production ready. 
23. Site is production ready. Finished results window, responsiveness and layout, and tweeked a couple of final errors. Excited. 




Future improvements, new features, and known bugs list:
1) Host site online with Netlify
2) Redesign searchMain, loading, and highlight window visibility - DONE
3) Get better fonts to make weather cards more readable - DONE
4) Add google maps interface and display
5) Research 504 error handling more and try to fix for large # of stops
6) Research error when selecting a bad location but a valid number of nights. Error message displays correctly, but page will no longer generate results without refresh. 



