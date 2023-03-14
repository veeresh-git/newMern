export type User = {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  picturePath: String;
  friends: User[];
  location: String;
  occupation: String;
};

export type Post = {
  _id: String;
  userId: String;
  firstName: String;
  lastName: String;
  location: String;
  description: String;
  picturePath: String;
  userPicturePath: String;
  likes: Map<String, Boolean>;
  comments: any[];
};
