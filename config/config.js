/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var config = {
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses.

	language: "sv",
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},

		{
			module: "compliments",
            position: "lower_third",
            config: {
                compliments: {
                    anytime: [
                        "Hej där!",
												"Spegel spegel på väggen där...",
												"...säg, vem som skönast i landet är?"
                    ],
                    morning: [
                        "Godmorgon solstråle!",
                        "Ha en underbar dag!",
                        "Har du sovit gott?"
                    ],
                    afternoon: [
                        "Hej snygging!",
                        "Vad fin du är!",
                        "Du är fantastisk!"
                    ],
                    evening: [
                        "Tack för idag!",
                        "Du är bäst!",
                        "Vi ses imorgon!"
                    ]
                },
            }
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "Aftonbladet",
            url: "http://www.aftonbladet.se/rss.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
			}
    },
    {
        module: 'MMM-countDown',
        position: 'top_left',
        config: {
            updateInterval: 1000 // update interval in milliseconds
        }
    },
    {
        module: 'MMM-quotes',
        position: 'top_center',
        config: {
            updateInterval: 10 * 1000, // update interval in milliseconds
            fadeSpeed: 2000
        }
    },
		{
        module: 'ReseModul',
        position: 'top_right',
        config: {
            updateInterval: 10 * 1000, // update interval in milliseconds
            fadeSpeed: 2000,
						source: 9180,
						destination: 9302
        }
    }
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
