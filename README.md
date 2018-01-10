# gci-server

Deployed on [Heroku](https://gci-server.herokuapp.com).

## What is this?

This is the server handling the GitHub API requests for the [GCI website](https://gci.jboss-outreach.org).

It periodically queries the GitHub API for data on the organization's projects and contributors, and caches the data. The server then simply retrieves data from the cache for any queries from the GCI website.
