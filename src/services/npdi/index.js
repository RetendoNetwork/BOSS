// handles "npdi.cdn.nintendo.net" endpoints

const path = require('node:path');
const fs = require('fs');
const express = require('express');
const subdomain = require('express-subdomain');
const { ENCRYPTED_FOLDER_ENTIRE } = require('../../cdn');

const npdi = express.Router();

npdi.get('/p01/data/1/:titleHash/:dataID/:fileHash', (req, res) => {
    const params = req.params;
	const { titleHash, fileHash } = params;
	const contentPath = path.normalize(`${ENCRYPTED_FOLDER_ENTIRE}/${titleHash}/${fileHash}`);

	if (fs.existsSync(contentPath)) {
		res.set('Content-Type', 'applicatoin/octet-stream');
		res.set('Content-Disposition', 'attachment');
		res.set('Content-Transfer-Encoding', 'binary');
		res.set('Content-Type', 'applicatoin/octet-stream');
		res.sendFile(contentPath);
	} else {
		response.sendStatus(404);
	}
});

const router = express.Router();

router.use(subdomain('npdi.cdn', npdi));

module.exports = router;