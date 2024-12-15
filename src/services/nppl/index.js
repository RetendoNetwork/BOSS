// handles "nppl.app.nintendo.net" endpoints

const xmlbuilder = require('xmlbuilder');
const moment = require('moment');
const express = require('express');
const subdomain = require('express-subdomain');

const nppl = express.Router();

nppl.get([
	'/p01/policylist/:majorVersion/:countryCode',
	'/p01/policylist/:consoleType/:majorVersion/:countryCode'
], (req, res) => {
    const params = req.params;
	const { majorVersion, countryCode } = params;
	const consoleType = params.consoleType || '0';

	let policylist;

	if (consoleType === '0') {
		policylist = get3DSPolicyList(countryCode, majorVersion);
	} else if (consoleType === '1') {
		policylist = getWiiUPolicyList(countryCode, majorVersion);
	} else {
		res.sendStatus(500);
		return;
	}

	if (!policylist) {
		res.sendStatus(404);
		return;
	}

	res.set('Content-Type', 'application/xml; charset=utf-8');
	res.send(xmlbuilder.create(policylist, { headless: true }).end({ pretty: true }));
});

function get3DSPolicyList(countryCode, majorVersion) {
	if (majorVersion !== '3') {
		return null;
	}

	return {
		PolicyList: {
			MajorVersion: Number(majorVersion),
			MinorVersion: 0,
			ListId: 1891,
			DefaultStop: false,
			ForceVersionUp: false,
			UpdateTime: moment().utc().format('YYYY-MM-DDTHH:MM:SS+0000'),
			Priority: [
				{
					TitleId: '0004003000008f02',
					TaskId: 'basho0',
					Level: 'HIGH',
					Persistent: true,
					Revive: true
				},
				{
					TitleId: '000400300000bc00',
					TaskId: 'OlvNotf',
					Level: 'HIGH',
					Persistent: true,
					Revive: true
				},
				{
					TitleId: '000400300000bd00',
					TaskId: 'OlvNotf',
					Level: 'HIGH',
					Persistent: true,
					Revive: true
				},
				{
					TitleId: '000400300000be00',
					TaskId: 'OlvNotf',
					Level: 'HIGH',
					Persistent: true,
					Revive: true
				},
				{
					TitleId: '0004003000008f02',
					TaskId: 'pl',
					Level: 'HIGH',
					Persistent: true,
					Revive: true
				},
				{
					TitleId: '0004013000003400',
					TaskId: 'sprelay',
					Level: 'HIGH',
					Persistent: true,
					Revive: true
				}
			]
		}
	};
}

function getWiiUPolicyList(countryCode, majorVersion) {
	if (majorVersion !== '1') {
		return null;
	}

	return {
		PolicyList: {
			MajorVersion: Number(majorVersion),
			MinorVersion: 0,
			ListId: 1924,
			DefaultStop: false,
			ForceVersionUp: false,
			UpdateTime: moment().utc().format('YYYY-MM-DDTHH:MM:SS+0000'),
			Priority: [
				{
					TitleId: '0005003010016000',
					TaskId: 'olvinfo',
					Level: 'EXPEDITE'
				},
				{
					TitleId: '0005003010016100',
					TaskId: 'olvinfo',
					Level: 'EXPEDITE'
				},
				{
					TitleId: '0005003010016200',
					TaskId: 'olvinfo',
					Level: 'EXPEDITE'
				},
				{
					TitleId: '000500301001600a',
					TaskId: 'olv1',
					Level: 'EXPEDITE'
				},
				{
					TitleId: '000500301001610a',
					TaskId: 'olv1',
					Level: 'EXPEDITE'
				},
				{
					TitleId: '000500301001620a',
					TaskId: 'olv1',
					Level: 'EXPEDITE'
				},
				{
					TitleId: '0005001010040000',
					TaskId: 'oltopic',
					Level: 'EXPEDITE'
				},
				{
					TitleId: '0005001010040100',
					TaskId: 'oltopic',
					Level: 'EXPEDITE'
				},
				{
					TitleId: '0005001010040200',
					TaskId: 'oltopic',
					Level: 'EXPEDITE'
				},
				{
					TitleId: '000500101005a000',
					TaskId: 'Chat',
					Level: 'EXPEDITE'
				},
				{
					TitleId: '000500101005a100',
					TaskId: 'Chat',
					Level: 'EXPEDITE'
				},
				{
					TitleId: '000500101005a200',
					TaskId: 'Chat',
					Level: 'EXPEDITE'
				},
				{
					TitleId: '000500101004c100',
					TaskId: 'plog',
					Level: 'EXPEDITE'
				}
			]
		}
	};
}

const router = express.Router();

router.use(subdomain('nppl.c.app', nppl)); // * 3DS Consoles
router.use(subdomain('nppl.app', nppl)); // * WiiU Consoles

module.exports = router;