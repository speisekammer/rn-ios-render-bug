This is an example [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
This is used to track down unexpected behaviour in React rendering / caching for **iOS**.

## Update: This task can only be solved using iOS, because the bug only is reproducible there.

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _iOS_ app:


```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Xcode.

## Step 3: Reproduce the bug

1. Open the app in the simulator
2. See the screenshot below:
![simulator_screenshot.png](doc%2Fsimulator_screenshot.png)
3. See the following output in the Metro bundler terminal:
![console_screenshot.png](doc%2Fconsole_screenshot.png)
4. The object src/UserProfileFirestorePersistence.ts contains `"unsubscribeUserProfile` in the console output, but not in the rendered component. This leads to unexpected behaviour, e.g. the `useUserProfile()` method loading forever - but not deterministically.
5. Find the issue and report it to schmid@speisekammer.app

