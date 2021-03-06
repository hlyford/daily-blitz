var removeDiacritics = require('./removeDiacritics');

module.exports = {

	formatPlayerNames: function(data) {

		data.players.forEach( function (player, index) {
			// loop from the back of the player name looking for space and forming last name
			var lastName = '', firstName;
			for (var i = player.name.length - 1; i > 0; i--) {

				if (player.name[i] === ' ') {
					data.players[index].lastName = lastName.split("").reverse().join("");
					// the rest of the string is the first name
					var endFirstNameIndex = i;
					firstName = player.name.slice(0, endFirstNameIndex);
					break;
				} else {
					lastName += player.name[i];
				}
			}
			data.players[index].firstName = firstName;
			data.players[index].firstNameLower = firstName.toLowerCase();
			data.players[index].lastNameLower = data.players[index].lastName.toLowerCase();
			// add the full name and lowercase
			data.players[index].fullName = data.players[index].name;
			data.players[index].fullNameLower = data.players[index].name.toLowerCase();
			// also add each type of name with diacritics removed
			data.players[index]['firstName_r'] = removeDiacritics(firstName);
			data.players[index].firstNameLower_r = removeDiacritics(firstName.toLowerCase());
			data.players[index].lastNameLower_r = removeDiacritics(data.players[index].lastName.toLowerCase());
			data.players[index].lastName_r = removeDiacritics(data.players[index].lastName);
			data.players[index].fullName_r = removeDiacritics(data.players[index].name);
			data.players[index].fullNameLower_r = removeDiacritics(data.players[index].name.toLowerCase());
		});

		return data;
	}

};