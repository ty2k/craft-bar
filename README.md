# craft-bar

React front-end and Express back-end web app.

Scaffolded from [Create React App](https://create-react-app.dev/) and [heroku-cra-node](https://github.com/mars/heroku-cra-node) with upstream documentation in `/docs/upstream/`. Emoji from [Noto Emoji](https://github.com/googlefonts/noto-emoji).

## Local Development

Clone this repository and `npm install` in the root folder.

### Back-end

`npm run start:dev` to launch Express with Nodemon (automatic reloading when file changes are detected).

### Front-end

From the root folder, `cd react-ui` and `npm start` to start the React server.

`npm test` will run React component tests.

`npm build` creates a production build at `./react-ui/build`.

## Deploy to Production

With the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed and configured, in this project's root folder:

```sh
heroku create
git push heroku master
```

Using [heroku-cra-node](https://github.com/mars/heroku-cra-node), the above deployment method will automatically:
- detect Node buildpack
- build the app with
  - `npm install` for the Node server
  - `npm run build` for `react-ui`
- launch the web process with `npm start`
  - serves `../react-ui/build/` as static files
  - customize by adding API, proxy, or route handlers/redirectors

## Author

[Tyler Krys](https://www.tylerkrys.ca)

## License

MIT
