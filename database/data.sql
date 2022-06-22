insert into "users" ("username", "link", "location", "tagline", "profilePicture", "whatContent", "whyContent")
values
  ('Kermit Da Kid', 'www.example.com', 'Ye old Barn', 'Sesame St Outlaw', 'https://www.gannett-cdn.com/-mm-/eb9153ef471ec1cb22faf645d7d063754d336115/c=0-330-2006-3000&r=2006x2670/local/-/media/USATODAY/test/2013/08/09/1376068652000-mmiin07p.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed incididunt ut labore et dolore magna aliqua.', 'As far back as I can remember, I always wanted to be a gangster.'),
  ('nole ksum', 'www.ancientaliens.com', 'Area 51', 'JellyFish huntaaaa', 'https://i.kym-cdn.com/entries/icons/original/000/025/580/Screen_Shot_2018-03-01_at_12.59.37_PM.png', 'I wumbo, you wumbo, he-she-me wumbo. Wumboing, wumbology, the study of wumbo!.' , 'because it''s first grade, Spongebob'),
  ('Rob Boss', 'www.happyaccidents.com', 'Happy Forrest', 'Professional Treat Taster', 'https://video-images.vice.com/articles/58f7bfc7691cd44e59685ed0/lede/1492631497526-stoned-dog.jpeg?crop=1xw:0.9999387855044074xh;center,center&resize=1200:*', 'bark bark bark grrrr urf urf', 'X gon give it to ya, he gon give it to ya'),
  ('Doge', 'www.doge.com', 'lleH', 'Dog Sitter', 'https://i.kym-cdn.com/photos/images/facebook/001/476/528/d03', 'I created a place for dante to stroll in', 'I like a good laugh');

insert into "categories" ("name")
values
  ('reading'),
  ('watching'),
  ('health & fitness'),
  ('professional'),
  ('financial'),
  ('hobbies'),
  ('learning'),
  ('playing'),
  ('wanted'),
  ('wisdom'),
  ('misc')
