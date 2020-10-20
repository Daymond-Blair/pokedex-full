$(function() {
	var pokemonName;
	$('#blue-button-left').on('click', function() {
		pokemonName = $('#pokedex input[type="text"]').val();
		var request = $.ajax({
			url: 'https://pokeapi.co/api/v2/pokemon/' + pokemonName,
			method: 'GET'
		});

		request.done(function(data) {
			var name = data.species.name;
			var image = data.sprites.front_default;
			var id = data.id;
			var pokeNum = id.toString();
			// console.log('You chose ' + name + '!!!');
			if (data.types.length == 2) {
				var typeOne = data.types[0].type.name;
				var typeTwo = data.types[1].type.name;
				$('.primary-type').text(
					`${typeOne.charAt(0).toUpperCase() + typeOne.slice(1)}`
				);
				$('.secondary-type').text(
					`${typeTwo.charAt(0).toUpperCase() + typeTwo.slice(1)}`
				);

			} else {
				var typeOne = data.types[0].type.name;
				var typeTwo = '';
				$('.primary-type').text(
					`${typeOne.charAt(0).toUpperCase() + typeOne.slice(1)}`
				);
				$('.secondary-type').text(`${typeTwo}`);
			}
			console.log(data);
			console.log(name, image, id, typeOne, typeTwo);
			console.log(`You chose ${name}!!! The id is ${id}`);
			$('#screen').css('background-image', 'url(' + image + ')');
			$('#pokedex input[type="text"]').val('');
			$('.poke-name').text(name.charAt(0).toUpperCase() + name.slice(1));
			$('.poke-id').text(`#${pokeNum.padStart(3, '0')}`);
		});

		request.fail(function(textStatus) {
			alert('Request failed.' + textStatus);
		});
	});
});