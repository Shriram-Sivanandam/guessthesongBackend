const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebAPI = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const clientId = 'c111d8cd377f4cf0946e51bf5470f005';
const clientSecret = '521649fe5be74519909ed6e9b9139910';

app.post('/login', (req, res) => {
	const code = req.body.code;
	const spotifyAPI = new SpotifyWebAPI({
		redirectUri: 'http://localhost:3000',
		clientId: clientId,
		clientSecret: clientSecret,
	});

	spotifyAPI
		.authorizationCodeGrant(code)
		.then((data) => {
			console.log('helllooo', code);
			res.json({
				accessToken: data.body.access_token,
				refreshToken: data.body.refresh_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch((err) => {
			console.log('errr errr errr', err);
			res.sendStatus(400);
		});
});

app.listen(3001);
