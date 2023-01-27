# Images-Gallary
**Image-Gallery** is a web app for uploading images to the cloud. It is built in **nodejs**. Images in this app can be stored on the cloud just like Google's Photos app. I have coded this project with some features. Anyone can register and after logging in it can upload images, and delete if not required. Only authorized users can view and delete their saved images.

Below are some of the modules used to feature the app.
> ```multer``` - to upload images.

> ```jsonwebtoken``` - Used to generate JWT token for token based authorization.

> ```bcryptjs``` - Used to store passwords as hashed passwords.

> ```ejs``` - used to render veiw template.

> ```express``` - used to managing backend server feature.

> ```express-ejs-layouts``` - to create common layout for all template views.

> ```express-session``` - to create a session for an authorized user.

>```mongoose``` - ORM to connect with mongodb database.

## Installation
You can used this project on your local computer follow bellow steps.

1. Make sure nodejs is installed in your local computer, if not then download and install nodejs.

2. clone repository.

```
git clone https://github.com/bhrtwork96/Images-Gallary.git
``` 

3. Open the folder with Terminal or VS Code.

4. Run below command to install dependecies modules.

```
npm install

```

5. Create .env file and add the following details.
```
SESSION_KEY = <any secret key>
DB = <mongo db database connection url>
SECRATE_KEY = < any secret key>
```
6. Start server use following command in terminal.

```
node index.js

```
7. Open browser and type url http://localhost:2301.

## Features of projects.

![image](https://user-images.githubusercontent.com/88784869/215139671-679316f4-b5ca-4731-864e-6284da0726ca.png)


## Any one can register.



![image](https://user-images.githubusercontent.com/88784869/215139906-7b4d0fe2-a91a-4674-9856-ecb63b651bec.png)

## After register user can login.



![image](https://user-images.githubusercontent.com/88784869/215140102-425db92a-3e1b-4e0d-868b-17ccb3a7852e.png)

## Upload image through upload button.



![image](https://user-images.githubusercontent.com/88784869/215140378-42582a13-16be-46a5-b6c8-2061cbcb3978.png)

## View image click on image.



![image](https://user-images.githubusercontent.com/88784869/215140622-e056765f-8eb2-476c-b2cd-75664d27915d.png)

## Some image view features.



![image](https://user-images.githubusercontent.com/88784869/215142130-f54ed066-99e6-4272-944c-f44fa7ecd7d2.png)



