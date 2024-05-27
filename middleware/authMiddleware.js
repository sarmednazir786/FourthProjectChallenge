const jwt = require ('jsonwebtoken');
const User = require ('../models/User');
const fs = require('fs');

// const str_publicKey = fs.readFileSync('/workspaces/Broken-Auth-4/public.pem', 'utf8');

// const buffer1 = Buffer.from(str_publicKey);
// const enc_publicKey = buffer1.toString('base64');

// const dec_publicKey = Buffer.from(enc_publicKey, 'base64');
// const publicKey = dec_publicKey.toString();

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	const enc_publicKey2 = req.cookies.publickey

	const dec_publicKey2 = Buffer.from(enc_publicKey2, 'base64');
	const publicKey2 = dec_publicKey2.toString();

	if (token) {
		jwt.verify(token, publicKey2, { algorithms: ['RS256'] }, async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect('/login');
			} else {
				console.log(decodedToken);
				next();
			}
			});
			} else {
				res.redirect('/login');
				}
				};

const requireAuth3 = (req, res, next) => {
	const token = req.cookies.jwt;
	const enc_publicKey2 = req.cookies.publickey

	const dec_publicKey2 = Buffer.from(enc_publicKey2, 'base64');
	const publicKey2 = dec_publicKey2.toString();

	if (token) {
		jwt.verify(token, publicKey2, { algorithms: ['RS256'] }, async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect('/login');
			} else {
				if (decodedToken.id === "jo-philippwich@masteruser.com"){
					console.log(decodedToken);
					next();
				}
				else{
					return res.status(403).send('Forbidden');
				}
			}
			});
			} else {
				res.redirect('/login');
				}
				};

const requireAuth2 = (req, res, next) => {
	const token = req.cookies.jwt;
	const enc_publicKey2 = req.cookies.publickey

	const dec_publicKey2 = Buffer.from(enc_publicKey2, 'base64');
	const publicKey2 = dec_publicKey2.toString();

	if (token) {
		jwt.verify(token, publicKey2, { algorithms: ['RS256'] }, async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect('/login');
			} else {
				if (decodedToken.id === "admin@admin.com"){
					console.log(decodedToken);
					next();
				}
				else{
					return res.status(403).send('Forbidden');
				}
			}
			});
			} else {
				res.redirect('/login');
				}
				};

const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	const enc_publicKey2 = req.cookies.publickey

	if (token) {
		const dec_publicKey2 = Buffer.from(enc_publicKey2, 'base64');
		const publicKey2 = dec_publicKey2.toString();
		jwt.verify(token, publicKey2, async (err, decodedToken) => {
			if (err){
				res.locals.user = null;
				next();
			} else {
				let user = await User.findOne({email: decodedToken.id});
				res.locals.user = user;
				next();
			}
			});
			} else {
				res.locals.user = null;
				next();				
			}
			};
			
				
module.exports = { requireAuth, checkUser, requireAuth2, requireAuth3 };
