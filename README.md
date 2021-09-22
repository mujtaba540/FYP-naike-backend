Naik-E Backend APIs

//BASE_URL=https://naike.herokuapp.com

Auth Routes:

POST http://192.168.18.118:3000/v1/auth/login

POST http://192.168.18.118:3000/v1/auth/register


Category Routes:

getCount: GET: http://192.168.18.118:3000/v1/category/count 

create: POST: http://192.168.18.118:3000/v1/category/

getAll: GET: http://192.168.18.118:3000/v1/category/

update: PUT: http://192.168.18.118:3000/v1/category/:id

delete: PATCH: http://192.168.18.118:3000/v1/category/:id


SubCategory Routes:

getCount: GET: http://192.168.18.118:3000/v1/subcategory/count 

create: POST: http://192.168.18.118:3000/v1/subcategory/ 

getAll: GET: http://192.168.18.118:3000/v1/subcategory/

update: PUT: http://192.168.18.118:3000/v1/subcategory/:id

delete: PATCH: http://192.168.18.118:3000/v1/subcategory/:id


Need Routes:

getCount: GET: http://192.168.18.118:3000/v1/need/count 

create: POST: http://192.168.18.118:3000/v1/need/ 

getAll: GET: http://192.168.18.118:3000/v1/need/

byID: GET: http://192.168.18.118:3000/v1/need/:id

update: PUT: http://192.168.18.118:3000/v1/need/:id

delete: PATCH: http://192.168.18.118:3000/v1/need/:id

user_Needs: get: http://192.168.18.118:3000/v1/need/user/94

Donation Routes:

getCount: GET: http://192.168.18.118:3000/v1/donation/count 

create: POST: http://192.168.18.118:3000/v1/donation/ 

getAll: GET: http://192.168.18.118:3000/v1/donation/

byID: GET: http://192.168.18.118:3000/v1/donation/:id

update: PUT: http://192.168.18.118:3000/v1/donation/:id

delete: PATCH: http://192.168.18.118:3000/v1/donation/:id

user_Donations: get: http://192.168.18.118:3000/v1/donation/user/94

Guest Routes:

AllNeeds: GET: http://192.168.18.118:3000/v1/guest/need 

needByID: GET: http://192.168.18.118:3000/v1/guest/need/:id 

NeedCount: GET: http://192.168.18.118:3000/v1/guest/needcount

AllDonations: GET: http://192.168.18.118:3000/v1/guest/donation 

donationByID: GET: http://192.168.18.118:3000/v1/guest/donation/:id 

donationCount: GET: http://192.168.18.118:3000/v1/donationcount

User Routes:

userByID: GET: http:///192.168.18.118:3000/v1/user/:id


