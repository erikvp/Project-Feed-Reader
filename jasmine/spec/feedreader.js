/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* All tests are within the $() function, since some of these tests 
 * may require DOM elements. This insures tests are not executed unit
 * the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loop through each feed in the allFeeds object.
         * Check each feed url and confirm it is not 'undefined'.
         * Verify there is a url.
         * Note: Assumes a minimum valid url is four characters long(e.g.x.io)
         */
        it('URL(s) are defined', function () {
            let urlDefined = true;

            for (let i = 0; i < allFeeds.length; i++) {
                if (allFeeds[i].url === undefined || allFeeds[i].url.length < 4) {
                    urlDefined = false;
                }
            }
            expect(urlDefined).toBe(true);
        });

        /* Loop through each feed in the allFeeds object and verify allFeeds[i].name
         * is not 'undefined'
         * has a length of at least 1 (assumes length=1 is the minimum aceptable length)
         */
        it('name(s) are defined', function () {
            let nameDefined = true;
            // Check each feed name and confirm it is not 'undefined' and is at least one char in length
            for (let i = 0; i < allFeeds.length; i++) {
                if (allFeeds[i].name === undefined || allFeeds[i].name.length < 1) {
                    nameDefined = false;
                }
            }
            expect(nameDefined).toBe(true);

        });
    });

    /* 'The menu' is a suite of tests for the menu navigation
     * Menu is accessed via the hamburger icon in the upper left corner
     */
    describe('The menu', function () {

        /* Verify menu changes visibility when the menu icon is clicked.
         * The body class='menu-hidden' will toggle for each case.
         * First Click: Menu is displayed. <body class>
         * Second Click: Menu is hidden. <body class="menu-hidden">
         */
        it("icon 1st click shows menu, 2nd click hides menu.", function () {

            // DISPLAY MENU: This is the first click on the menu icon.
            $('.menu-icon-link').trigger("click");
            console.log(`After 1st Click: ${document.body.className}`);
            // Body should not contain class 'menu-hidden' since menu is displayed
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // HIDE MENU: This is the second click on the menu icon.
            $('.menu-icon-link').trigger("click");
            console.log(`After 2nd Click: ${document.body.className}`);
            // Body should have class 'menu-hidden' since menu is hidden.
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });

    }); // describe('the menu')


    /* 'Initial Entries' is a test suite for checking the initial article
     * feed content.
     */
    describe('Initial Entries', function () {
        // One second timeout called before test function
        beforeEach(function (done) {
            setTimeout(function () {
                done();
            }, 1000);
        });


        /* Verify that the loadFeed function loads at least one entry within the
         * feed container.
         */
        it('has one or more elements within feed container.', function () {
            // Target parent: <div class="feed"> and all children: <article class="entry">
            let entries = document.querySelectorAll('.feed .entry').length;

            console.log('Entries:', entries);
            expect(entries).toBeGreaterThan(0)
        });
    });


    /* 'New Feed Selection' is a test suite for checking the functionality of
     * loadFeed().  When loadFeed is called, it should update feed with new articles
     * loadFeed(0): Udacity Blog
     * loadFeed(1): CSS-Tricks
     * loadFeed(2): HTML5 Rocks
     * loadFeed(3): Linear Digressions
     */
    describe('New Feed Selection', function () {
        let oldFeed;
        let newFeed;

        beforeEach(function (done) {

            loadFeed(0, function () {
                oldFeed = $('.feed').html();

                loadFeed(1, function () {
                    newFeed = $('.feed').html();
                    done(); // feed variables loaded.  Ready for testing
                }); // loadFeed(1)

            }); // loadFeed(0)

        }); // beforeEach()


        /* Compare article feed for oldFeed (loadFeed(0): Udacity Blog) and
         * newFeed(loadFeed(1): CSS-Tricks)
         */
        it('new articles loaded.', function () {
            console.log(`oldFeed: ${oldFeed}`);
            console.log(`newFeed: ${newFeed}`);
            expect(oldFeed).not.toMatch(newFeed);
        });

    }); // describle ('New Feed Selection)

}());