'use strict';

const meta = require.main.require('./src/meta');
const winston = require.main.require('winston');
const routeHelpers = require.main.require('./src/routes/helpers');

const controllers = require('./lib/controllers');

const plugin = {};

plugin.init = async (params) => {
	const { router } = params;
	
	winston.info('[plugin/spammy] Initializing spam prevention plugin');
	
	// Setup admin page route
	routeHelpers.setupAdminPageRoute(router, '/admin/plugins/spammy', controllers.renderAdminPage);
};

plugin.checkRegistration = async (data) => {
	winston.info('[plugin/spammy] Hook called - filter:user.create');
	
	// Log raw data structure
	winston.info('[plugin/spammy] Raw data keys:', Object.keys(data));
	winston.info('[plugin/spammy] userData:', data.userData);
	winston.info('[plugin/spammy] data.data:', data.data);
	winston.info('[plugin/spammy] data.user:', data.user);
	
	// Get email and username from the correct data structure
	const email = data.data ? data.data.email : null;
	const username = data.data ? data.data.username : null;
	
	winston.info(`[plugin/spammy] Checking registration: username="${username}", email="${email}"`);
	
	if (!email || !username) {
		winston.info('[plugin/spammy] Missing email or username, skipping check');
		return data;
	}
	
	// Check if username matches email local-part (case-insensitive)
	const [localPart, domain] = email.split('@');
	
	winston.info(`[plugin/spammy] Comparing username="${username}" with email local-part="${localPart}"`);
	
	if (username === localPart && domain === 'gmail.com') {
		winston.warn(`[plugin/spammy] BLOCKED registration: username "${username}" matches email local-part "${localPart}"`);
		throw new Error('Your username cannot be the same as your email address. Please choose a different username.');
	}
	
	winston.info('[plugin/spammy] Username check passed');
	
	// Get configured patterns from settings
	const settings = await meta.settings.get('spammy');
	if (!settings || !settings.patterns) {
		return data;
	}
	
	const patterns = settings.patterns
		.split('\n')
		.map(p => p.trim())
		.filter(p => p.length > 0);
	
	// Check each pattern
	for (const pattern of patterns) {
		if (matchesPattern(email, pattern)) {
			winston.warn(`[plugin/spammy] BLOCKED registration: ${email} (matched pattern: ${pattern})`);
			throw new Error('Email address is not allowed');
		}
	}
	
	return data;
};

function matchesPattern(email, pattern) {
	email = email.toLowerCase();
	pattern = pattern.toLowerCase();
	
	// Regex pattern: /pattern/flags
	if (pattern.startsWith('/')) {
		const lastSlash = pattern.lastIndexOf('/');
		if (lastSlash > 0) {
			const regexPattern = pattern.substring(1, lastSlash);
			const flags = pattern.substring(lastSlash + 1);
			try {
				const regex = new RegExp(regexPattern, flags);
				return regex.test(email);
			} catch (e) {
				winston.error(`[plugin/spammy] Invalid regex pattern: ${pattern}`, e);
				return false;
			}
		}
	}
	
	// Wildcard pattern: *@domain.com
	if (pattern.includes('*')) {
		const regexPattern = pattern
			.replace(/[.+?^${}()|[\]\\]/g, '\\$&')
			.replace(/\*/g, '.*');
		const regex = new RegExp(`^${regexPattern}$`);
		return regex.test(email);
	}
	
	// Exact match
	return email === pattern;
}

plugin.addAdminNavigation = (header) => {
	header.plugins.push({
		route: '/plugins/spammy',
		icon: 'fa-shield',
		name: 'Spam Prevention',
	});
	return header;
};

module.exports = plugin;
