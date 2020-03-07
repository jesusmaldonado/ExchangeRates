This is just an exchange "screen" using only hooks and effects. It follows a redux pattern from the exchange screen down, but the idea was to use a minimal toolset and mimic the patterns of redux/sagas without the weight and setup. I've used both snapshotting and react-dom/test-utils, as they are capable of handling hooks.

This project was for Revolut just as much as it was for me; it was very interesting to learn how to use hooks in a functional way and implement Redux without using Redux. :)

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run test`

I focused on e2e integration tests with not a lot of unit tests and snapshots, because they are more assertive and more difficult to manipulate, and I wanted to directly check classes. Normally, I would lean more towards snapshots.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
