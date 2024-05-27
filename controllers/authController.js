const User = require("../models/User")
const jwt = require('jsonwebtoken')
const fs = require('fs');

// const str_privateKey = fs.readFileSync('/workspaces/Broken-Auth-4/private.pem', 'utf8');
// const str_publicKey = fs.readFileSync('/workspaces/Broken-Auth-4/public.pem', 'utf8');

// Base64 encoding Public Key
// const buffer1 = Buffer.from(str_publicKey);
// const enc_publicKey = buffer1.toString('base64');
const enc_publicKey = "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF2VjdFTTRINmFhVW1hcFlRZGZWRwpDQzR3WHZhVE5NN3RGRnpSSnFjdGdZUmtGTFBvMGw2M0VxNFJxeHg0QTIybC9EUDJMaGVEUVBaZTIyakZNZDU1CkFmRmt5K1JsdmZiSmlzUWJEVEI2cU45REduYkViVEtEVlpYd0t3NW9DRW16MGdHUDY0ZkdlUU1FNUJTb0REUSsKa1dPSTdzL2dmSU1iV2ZhVVpwUXY1aGdFNTUzWC9DL293bjJ3QlByV3NXeEZQd3VSQytOOHNjS3Z6MHdLOFhvSwo0by8yVmR0MEo1MGRxTlJqbExxbkh4U2dDUktHWjNaOHhkeVUyNHY0WlUxSXAvNE8rMzAvaWNtWmM5clkxNUpaCkk2Vmo3RDN3NFJxUlZWZE9ITHBVTFR0NUoreUkyQ1dBSXNISGNZc2xUalVUdnkydm9QRWV1N0xYejgzMXZCZVoKRXdJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==";

// Base64 decoding Public Key
const dec_publicKey = Buffer.from(enc_publicKey, 'base64');
const publicKey = dec_publicKey.toString();

// Base64 encoding Private Key
// const buffer2 = Buffer.from(str_privateKey);
// const enc_privateKey = buffer2.toString('base64');
const enc_privateKey = "LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2Z0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktnd2dnU2tBZ0VBQW9JQkFRQzlYc1F6Z2ZwcHBTWnEKbGhCMTlVWUlMakJlOXBNMHp1MFVYTkVtcHkyQmhHUVVzK2pTWHJjU3JoR3JISGdEYmFYOE0vWXVGNE5BOWw3YgphTVV4M25rQjhXVEw1R1c5OXNtS3hCc05NSHFvMzBNYWRzUnRNb05WbGZBckRtZ0lTYlBTQVkvcmg4WjVBd1RrCkZLZ01ORDZSWTRqdXorQjhneHRaOXBSbWxDL21HQVRubmRmOEwrakNmYkFFK3RheGJFVS9DNUVMNDN5eHdxL1AKVEFyeGVncmlqL1pWMjNRbm5SMm8xR09VdXFjZkZLQUpFb1puZG56RjNKVGJpL2hsVFVpbi9nNzdmVCtKeVpsegoydGpYa2xranBXUHNQZkRoR3BGVlYwNGN1bFF0TzNrbjdJallKWUFpd2NkeGl5Vk9OUk8vTGErZzhSNjdzdGZQCnpmVzhGNWtUQWdNQkFBRUNnZ0VBQjlaNngyajdUTkVWa0hiS2twOUd1VUwwSkpJUEVMSDUxUXhzYWEya3NBWWoKUUVvYitrMEtSYjhub3czb0Y3ZzdsUDh2a3NQTlhteDBDNSsvL2Fyb0ZrRC8rNEptQmFGSHdUTVJyWStTbkJlMQpoc3hnbitabDBpNkZCTHN4YWhwbTAydldJWmo2aVhxckFxZXFOdXNZcGRyWlNZMFlEUDgrTEJDTkh0dkdTYjhsCmRoUGZBTi9Scmsya0s0YTVBMDM5RHZCUEJhQmJPRStHMTcrQjNJWHdCMVJJSnRhQkRvakRjZ1lBN1N4VzJiS3IKd1V5NGM2Y3RYNVRWNzkvTDh2Q0pLSERKSUZ0R0N2U3FQRnIvWnh2RFBLS3pQYUpUazVQZ2p2TkJQcUZua0Q5NgpTSFRVUkh0d2NvemZBSE5kTTJXbTVQMGJZamhOKzZ2ZWphNmN0UXE4OVFLQmdRRHZzdzB6VWl5U082NlpuV2NwClFwZ0hPMlhRY2p1STNaOEF0OVBsM0pWQmRocFJsdmd3c1YwbnhSczRlS2R1Q2ZPRjRNdzlWQ1N1SkdYTzhyL1kKMER3VXdXOXlBT0dTQ0cvVmUwOVZiK1NRODkyZlEyMU9wdmlacnVDUUFCY3NRYWRTNjNjSVRaMUEvR3NnWXJUZQpHTmt6UDZDR3ppS01Fc3NRQzV5Z0RGYzNId0tCZ1FES1A0ZFczNkx0QUNZREZxaHYyVW1GQ2x4Z2s2eXZrK1JYCmg3NzNFY3hXaW1VdEtGY2ZUOEs1RlViSmdabkJwTkZQWTZQNm5MaTVSdU4rb2w2UlBQZUYwcVlQVGVmeDBDOEsKbkZ6cDE1aHJoR1ZrRkU0VzF3cFFHVDYyQVpXQUFmRkFEZ08xWFFYR29WUjZHbzF6aXBpVTQyY3ZOZGEzcUg2ZgpSZjV0cE5zampRS0JnUUNaWS9pWGxnZUYwUUdMdGttMUFyT3ROUnFUaVBhR1FHU25IZnhSQlpiU0hGVDlUMkltCkx1cFJML2FhYmNPZlRHajFqSVRHM2xqV3c5NE8wQk5yR043SjNYdUc5ZjlqNTFoQndqWmprMFl1YUpDemdYK3EKckhrOFI4ZlcvdWZWWDNKSFF2MmFaNml4VkpidFU1MHczNi9tOXRtd1NxdWEvYy9LeGRPR0xEK0h1d0tCZ1FDSgpmQ3c5a3lOSFowMXYxZ3hFbEhwVTlWa2MwZWFYS0xzV0FaS0FsRm5MRHFOKzBpaC9nWklHalg4a1puU21YYXRvCkEzMHFWVFdCeGIzS2pRZ3FSVDZpZXpNbHZqa0plaE13YkdFQkdlMWtVWWszUWxKZlZtbU5UOHdBb0EwSUNzbjgKV0VxUEZLQmppYkpLbXhoRFRoa3hSWEVVZDgzeDVabkdIaWU2VTFJZzFRS0JnRWtzZmk2am1sc0lKNnJtL3plNApQS3U4NkJjdUVlblFlWmlvNWh6ZGhvOHdJaUxpclBoaTg0UmtZTTVpQjZzTXg3MGlkU2pvYnBhdk1PcTlSak5RCm5WQjFqVXRtWHRmM1p3TURoZFArazQ1ZElkNmxGQ3FFL3B4aDA1VUNidlM4NUZVVDNrOGRvWkE3ZWhQVTdDcFUKS3lURzN6WEpZVVIxU05MR1JxRzV2WkdLCi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K";

// Base64 decoding Private Key
const dec_privateKey = Buffer.from(enc_privateKey, 'base64');
const privateKey = dec_privateKey.toString();


//handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { email: '', password: '' };
	
	if (err.message === 'incorrect email') {
		errors.email = 'That email is not registered';
	}
	
	if (err.message === 'incorrect password') {
		errors.password = 'That password is incorrect';
	}
	
	if (err.code == 11000) {
		errors.email = 'that email is already registered';
		return errors;
	}
	
	//validation errors
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
			});
			}
	return errors;
	}
	
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, privateKey, {
		algorithm: 'RS256',
		expiresIn: maxAge
	});
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
	res.render('login');
}

module.exports.signup_post = async (req, res) => {
	  const { email, password } = req.body;
	  
	  try {
	  	const user = await User.create({ email, password });
	  	const token = createToken(user.email);
	  	res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.cookie('publickey', enc_publicKey)
	  	res.status(201).json({ user: user._id });  
	  }  
	  catch(err) {
	  	console.log(err);
	  	const errors = handleErrors(err);
	  	res.status(400).json({ errors });
	  }
}

module.exports.login_post = async (req, res) => {
	const { email, password } = req.body;
	
	try {
		const user = await User.login (email, password);
		const token = createToken(user.email);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.cookie('publickey', enc_publicKey)
		res.status(200).json({ user:user._id });
	}
	catch (err) {
		console.log(err);
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
}

module.exports.logout_get = (req, res) => {
	res.cookie('jwt', '', {maxAge: 1});
	res.redirect('/login');
	}