insert into "users" ("username", "hashedPassword", "link", "location", "tagline", "profilePicture", "whatContent", "whyContent")
values
  ('Jayce Fuller ', '$argon2i$v=19$m=4096,t=3,p=1$aMW6Rcbecxx6Sf5XtnYmUg$o8cm9wUYS0UDebxR6g/C2+UYJ50LnLAaydpdaGPvuvY', 'n/a', 'Seattle, WA', 'Freelance Shopify Developer', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80', 'I work with small businesses and entrepreneurs to build their brands online', 'I think that e-commerce and the internet are the future'),
  ('Millie Adams', '$argon2i$v=19$m=4096,t=3,p=1$5w0KZe+3nZilR2d2huLNXA$ida4CB8ke8BGB4KojhffqW/5JnDCEoQpiz7gMmBo2dY', 'n/a', 'Bali, Indonesia', 'Globe Trotter', 'https://images.unsplash.com/photo-1488680411726-63df9d7bd95e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80', 'I traveled to over 50+ countries' , 'because life is an adventure'),
  ('Kate Thomas', '$argon2i$v=19$m=4096,t=3,p=1$F33uPFQS9oeSURskel3b+A$Ol/T8aDMHvLwalQxO89v4uFUrbpcqNB0+2Cs/vweKbE', 'n/a', 'Worldwide', 'Philanthropist', 'https://images.unsplash.com/photo-1519568470290-c0c1fbfff16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2633&q=80', 'My partner and I established donation center across the globe', 'I think the world can use a more kind gestures!'),
  ('Jake Morales', '$argon2i$v=19$m=4096,t=3,p=1$brJg3NS6LM09oYDuXv7Bww$Oxg0KQDzKhpgcusGU3hRM3fONCiPSo3VX3kxgEjCmKk', 'n/a', 'Los Angeles, CA', 'Photographer & Videographer', 'https://images.unsplash.com/photo-1616817846957-aa2b827d600b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80', 'Capturing moments and memories on my Canon DSLR', 'Life is made of moments like these'),
  ('Anthony Ngo', '$argon2i$v=19$m=4096,t=3,p=1$Fh7SAVV4Hu9PDCB+xeJNMA$gaIiR9ja/vBYeTDI7qohE9zrP8uneIdlLXMc9HmrmGM', 'https://www.linkedin.com/in/anthony-ngo-480564114/', 'Los Angeles, California', 'Software Engineer', 'https://images.unsplash.com/photo-1552301726-548e12c4097c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'I use technology to solve problems', 'I''ve always found myself tinkering with things around me and now I''ve found a way to channel my curiosity to help others');

insert into "categories" ("name")
values
  ('family'),
  ('financial'),
  ('health & fitness'),
  ('hobbies'),
  ('learning'),
  ('professional'),
  ('playing'),
  ('reading'),
  ('wanted'),
  ('watching'),
  ('wisdom'),
  ('misc')
