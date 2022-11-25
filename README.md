# SEM_PCOS_Group_7
SEM Project Work

Welcome to PCOS_Tracker

## Project Introduction



---
## Project Structure

The project is divided into three parts, front-end, back-end, and machine learning. The code structure of our project is also divided into these three parts according to this. 

For the front-end part, we used ***Vue.js*** as the framework, and ***ElementUI*** and ***ECharts*** as our component libraries. For data requests, we use ***Axios*** to encapsulate the requests.

For the back-end part, we used node.js-based ***Express.js*** framework to handle request, and used ***MongoDB*** to store our data.

For the machine learning part, we use various tools such as ***sklearn*** and ***imblearn*** to train the model, and use the ***pickle*** package to store and use the trained model.

---
## Deployment guide

### ***nvm***

The project is based on `Node.js`. If your device has not installed node before, it is not required but **strongly recommended** that you use `nvm` for node version management. As `nvm` is the best npm management system in the world.

For Mac user, you can install `nvm` via `homebrew`
```shell
brew install nvm
```

Also, you can follow the instruction provided by nvm official website. [nvm install and update](https://github.com/nvm-sh/nvm#installing-and-updating)

After you have installed `nvm`, you can check it with the following command.
```shell
nvm -v
```

### ***node***

The project has no restrictions on the `node.js` version, you can use `nvm` to install the latest version of `node.js` through the following command.
```shell
nvm install node
```

This command will let you install the latest version of `node.js` by default, you can also explicitly state the version you want to install.
```shell
nvm install 16.16.0
```

Also, you can download `node.js` directly without `nvm`. Just visit [node.js official website](https://nodejs.org/en/download/) and follow the instruction.

After you have installed `node.js`, you can check it with the following command.
```shell
node -v
```

### ***MongoDB***

Our project use MongoDB v6.0.1. We will also be compatible with different versions of MongoDB. You can use this command to confirm whether MongoDB is installed in the system.
```shell
mongod --version
```
If your system has not installed MongoDB, we recommend that you follow the [official installation guide](https://www.mongodb.com/docs/manual/installation/) to install MongoDB.

### ***Start Front-End Project***

In this step, you should create a new terminal first. And then follow these commands.
```shell
cd FrontEnd
npm install
npm run serve
```
And then, you can see our front-end system starts on [http://localhost:8080/](http://localhost:8080/)

### ***Start Back-End Project***

In this step, you should create a new terminal first. And then follow these commands.
```shell
cd BackEnd
npm install
npm run start
```
And then, you can see our back-end system starts on [http://localhost:3000/](http://localhost:3000/). And a prompt *Connected correctly to server* will be displaed in your terminal.


### ***Python***

Although we use many machine learning related packages. But to start our project, the only necessary package is ***pickle***, a toolkit for reading trained models.

Since it is not easy to install machine learning-related packages on different devices, we **recommend** that you use Kaggle to debug the code of the machine learning part. At the same time, you can export the generated ***.pkl file*** and name it **ml.pkl** to replace the file with the same name under the BackEnd folder.

That way, you just need to make sure that your local computer has the Python and pickle packages.

For Mac users, your system may have installed the Python3 environment by default. You can use this command to test whether you have python environment in your laptop. If not, follow the [official guide](https://www.python.org/downloads/) to install it.
```
python -v
or 
python3 -v
```
And then, you can install pickle  package.
```
pip install pickle
```

---

Now, start your journey in PCOS-Tracker

***Have a nice day :-)***