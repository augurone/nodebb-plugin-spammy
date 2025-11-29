'use strict';

/*
	Admin panel client-side logic for spam prevention plugin.
	This file is loaded when navigating to /admin/plugins/spammy
*/

import { save, load } from 'settings';

export function init() {
	handleSettingsForm();
}

function handleSettingsForm() {
	// Load existing settings
	load('spammy', $('.spammy-settings'));

	// Save settings when save button is clicked
	$('#save').on('click', () => {
		save('spammy', $('.spammy-settings'));
	});
}

