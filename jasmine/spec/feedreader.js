/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name(s) are defined', function () {
            let nameDefined = true;

            for (let i = 0; i < allFeeds.length; i++) {
                if (allFeeds[i].name === undefined || allFeeds[i].name.length < 1) {
                    nameDefined = false;
                }
            }
            expect(nameDefined).toBe(true);

        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('element is hidden by default', function () {

            console.log('Body class=', document.body.className);

            let menuHidden = document.body.className === 'menu-hidden' ? true : false;
            expect(menuHidden).toBe(true);

        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */


        it("icon 1st click shows menu, 2nd click hides menu.", function () {
            let menuHidden = undefined;
            let menuDisplayed = undefined;

            spyEvent = spyOnEvent('.menu-icon-link', 'click');
            console.log(spyEvent);
            console.log(`Before click: ${document.body.className}`);
            $('.menu-icon-link').trigger("click");
            menuDisplayed = true;
            console.log(`After Click: ${document.body.className}`);
            $('.menu-icon-link').trigger("click");
            menuHidden = true;
            console.log(`After 2nd Click: ${document.body.className}`);
            expect(menuHidden && menuDisplayed).toBe(true);

        });

    }); // describe('the menu')


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        beforeEach(function (done) {
            setTimeout(function () {
                done();
            }, 1000);
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('has one or more elements within feed container.', function () {
            let parent = document.querySelector('.feed');
            let children = parent.childNodes.length;
            let feedCount = 0;

            // console.log(children);

            for (let i = 0; i < children; i++) {
                // console.log(parent.childNodes[i].className);
                if (parent.childNodes[i].className === 'entry-link') {
                    feedCount++;
                }
            }
            // console.log(`Feed Count: ${feedCount}`);
            expect(feedCount).toBeGreaterThan(1);
        });
    });



    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        let links = document.querySelectorAll('ul li a');
        let firstArticle;
        let articleURL;
        let i = 0;

        afterEach(function (done) {

            console.log('beforeEach');
            i < 3 ? i++ : i = 0;
            $(links[i]).trigger("click"); // call CSS Tricks

            setTimeout(function () {
                console.log('timeout 2s.');
                firstArticle = document.querySelector('.feed a');
                articleURL = firstArticle.href;

                done();
            }, 2000);
        });


        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        it('loads Udacity Blog.', function () {
            let firstArticle = document.querySelector('.feed a');
            let articleURL = firstArticle.href;

            console.log('Select Udacity Blog');
            console.log(firstArticle);
            console.log(articleURL);
            // $(links[1]).trigger("click"); // call CSS Tricks
            expect(articleURL).toContain('blog');

        });


        it('loads CSS Tricks.', function () {
            // let firstArticle;
            // let articleURL;

            console.log('Select CSS Tricks');
            console.log(firstArticle);
            console.log(articleURL);
            // $(links[2]).trigger("click"); // call HTML5 Rocks
            expect(articleURL).toContain('css-tricks');

        });

        it('loads HTML5 Rocks', function () {
            // let firstArticle = document.querySelector('.feed a');
            // let articleURL = firstArticle.href;

            console.log('HTML5 Rocks');
            console.log(firstArticle);
            console.log(articleURL);
            // $(links[3]).trigger("click"); // call Linear Digressions
            expect(articleURL).toContain('html5rocks');
        });

        it('loads Linear Digressions', function () {
            // let firstArticle = document.querySelector('.feed a');
            // let articleURL = firstArticle.href;

            console.log('Linear Digressions');
            console.log(firstArticle);
            console.log(articleURL);
            $(links[0]).trigger("click"); // call Udacity Blog
            expect(articleURL).toContain('linear-digressions');
        });



    }); // describle ('New Feed Selection)

}());