# 🃏 PokerSocial
This was a personal MERN project with CRU functionalities that I built in a week (with a lot of help from youtube)! It's a social media site for poker players to share their games. The site supports features such as registering a new user, logging in as an existing user, creating and liking posts, and adding friends etc. 

> Poker Social is a social media app for poker players by poker player(s)! Played a good game recently? Flopped a full house? Share your game and let your friends know!


# 👨‍💻 Tech Stack:
<li><b>Front End:</b> React.js, Material-UI</li>
<li><b>Back End:</b>  Express.js/Node.js</li>
<li><b>Persistent Storage (Database):</b>  MongoDB</li>
<li><b>State Management:</b>  Redux</li>
<li><b>Form Handling/Validation:</b> Multer, Formik</li>
<li><b>Password Hashing, Encryption, HTTP Authentication:</b> BCrypt, JSON Web Tokens (JWT)</li>

# 📀 Install
If you want to try and run this for any reason, use the following: 

1) To get a local copy of the code, clone it using git
```
git clone http://url-to-my-repo
```
2) Install dependencies:
```
npm install
```
3) Now, you can start the local client-server app by running:
```
// run this in both client and server directories 
npm run start
```
# 📌 Main Features 
## 1️⃣ Home Page
The home feed shows all your friends' posts (and yours!). Features include:
<li>My profile widget</li>
<li>Posting widget (Post function)</li>
<li>Friends List (Add/remove function)</li>
<li> Navigation bar (Switch day/night mode function)</li>
<p></p>
User-specific public information is stored on MongoDB and a `GET` request populates our redux store with the necessary user information. Posts on the feed as well as their associated 'likes' functionality etc, are also fulfilled via similar HTTP requests. See [HTTP Endpoints](#-http-endpoints)

#### Day Mode
<img width="1427" alt="Screenshot 2023-03-14 at 12 19 19 AM" src="https://user-images.githubusercontent.com/60395624/224762769-a1b57f93-3bf6-47da-85e7-debed4bf4332.png">

#### Night Mode
<img width="1424" alt="Screenshot 2023-03-14 at 12 19 32 AM" src="https://user-images.githubusercontent.com/60395624/224763046-eb7fb58c-b46d-4f91-ae93-3c4edc2a7445.png">

## 2️⃣ Posting about a session
To tell everyone about your last game, enter in the following information:
<li>Buy in amount</li>
<li>Cash out amount</li>
<li>Hours played</li>
<p></p>
... and the app will calculate some key statistics to show your friends! A `POST` request sends your post information to a MongoDB database.

#### Enter session information
<img width="640" alt="Screenshot 2023-03-14 at 11 12 45 AM" src="https://user-images.githubusercontent.com/60395624/224883616-37e727ed-db26-4fb3-bb7c-4e7a5ecb0583.png">

#### Upload a photo of the game if you want!
<img width="631" alt="Screenshot 2023-03-14 at 11 13 39 AM" src="https://user-images.githubusercontent.com/60395624/224883790-27d1a5c1-1d52-4865-b117-e7167553a63b.png">

#### Your post will look something like this:
![Screenshot 2023-03-14 at 11 15 37 AM](https://user-images.githubusercontent.com/60395624/224884032-50ef9dd5-53a1-47c7-8d91-8c2461304850.png)

#### Like and comment on your friends posts!
![Screenshot 2023-03-14 at 1 34 35 PM](https://user-images.githubusercontent.com/60395624/224905801-939153af-7584-4a9b-ba07-11836eb04e5b.png)

## 3️⃣ Friend's profile
#### Check out all your friend's posts and statistics! All user information is also stored in a seperate collection in MongoDB.
![Screenshot 2023-03-14 at 1 36 24 PM](https://user-images.githubusercontent.com/60395624/224906067-16e9b295-a42e-4847-9461-a700676bd58b.png)

## 4️⃣ Register Page
#### Registration page built with Formik and Multer
![Screenshot 2023-03-14 at 1 40 35 PM](https://user-images.githubusercontent.com/60395624/224906684-2e3b3aa6-db55-4bce-b69e-3c4ab2291719.png)
#### Registered users can subsequently use the log-in page
![Screenshot 2023-03-14 at 1 52 12 PM](https://user-images.githubusercontent.com/60395624/224908502-09da6be6-b2e4-461d-8f2e-18543be8fdb6.png)
<p>... And thats about it so far! Some future features to include are:
  <li>Historical game statistics on player profiles</li>
  <li>Tags for high roller or high frequency players</li>
  <li>Support for commenting</li>
</p>
  
# ⌛ HTTP Endpoints
|CRUD|HTTP Method|URL|Description|
|---|---|---|---|
|CREATE|`POST`|http://localhost:3000/auth/register| Create and register new User|
|CREATE|`POST`|http://localhost:3000/auth/login| Create login request and auth credentials|
|CREATE|`POST`|http://localhost:3000/posts| Create new social post by User|
|READ|`GET`|http://localhost:3000/posts| Get feed posts|
|READ|`GET`|http://localhost:3000/posts/{userId}/posts| Get specific user's posts|
|READ|`GET`|http://localhost:3000/users/{userId}| Get specific user's public information|
|READ|`GET`|http://localhost:3000/users/{userId}/friends| Get specific user's friends list|
|UPDATE|`PATCH`|http://localhost:3000/posts/{postID}/like| Update likes on specific post|
|UPDATE|`PATCH`|http://localhost:3000/users/{userId}/{friendID}| Add or remove a friend|
