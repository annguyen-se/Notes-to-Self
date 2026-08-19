const express = require('express');
const authRoute = require('../routes/auth.route');
const postRoute = require('../routes/post.route');
module.exports(authRoute, postRoute);
