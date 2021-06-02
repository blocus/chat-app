# chat-app

## Template
- [template](https://dribbble.com/shots/14953087-KeyVue-chat)


## How to install :

### Stack
- NodeJS v15.10.0
- MongoDB v4.4.1

### Backend :
1. go to backend and install dependencies with NPM or yarn `npm install` or `yarn install`
2. make a copy of `.env.simple` to a new file `.env`
3. please generate two a random string and change 
```
JWT_ACCESS_SECRET="Change me"
JWT_REFRESH_SECRET="Change me"
```
4. I didn't get time to finish the hole project, so there are some things to add it to the database
   1. Registration and login works fine (You don't need to verify email)
   2. You can create two or more users, and then you should start some conversations (There is no need to have friends or something like that) 
   3. to create some conversations you can:
      1. get a user ID from database
      2. go to `frontend/src/views/Dashboard/Chat/Navigation/NavigationActions.js`
      3. paste the user ID at line 7
      4. got to the UI and click the plus button below the user avatar (at chat UI)
      5. refresh the page 
   4. You can use the database dump (All users have the same password: `azeazeaze`)

### Front end :
1. go to frontend and install dependencies with NPM or yarn `npm install` or `yarn install`
2. copy `params.json.exemple` to a new file `params.json`
3. run `npm start` and make sure you are opening `http://localhost:3000` not `http://127.0.0.1:3000` 
