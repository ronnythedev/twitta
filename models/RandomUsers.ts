export interface RandomUser {
    name:RandomUserName;
    login:RandomUserLogin;
    picture:RandomUserPicture;
}

interface RandomUserName {
    title:string;
    first:string;
    last:string;
}

interface RandomUserLogin {
    uuid:string;
    username:string;
    password:string;
    salt:string;
    md5:string;
    sha1:string;
}

interface RandomUserPicture {
    thumbnail:string;
}

export interface EnumRandomUsers extends Array<RandomUser> {}