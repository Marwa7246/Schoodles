
<<<<<<< HEAD

// Function to generate a random string depending on the length of the string. Will be used with length =4 for the token, and length=32 for the url
 const generateRandomString= function(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

 const generateRandomUrl= function(length) {
  return 'http://localhost:8080/api/polls/'+generateRandomString(length);
};


=======
>>>>>>> 0f69961c92ee5fe5b963686440b1d5547e031c4b
