var fastUpdateInterval = 400
var slowUpdateInterval = 2500
var slowUpdateProbability = 0
var updateInterval = fastUpdateInterval

var firstCharToResult = 0
var usingPlaceholders = true

var inputHasChanged = false;
var charsTyped = 0
$('#textbox').val("")
$('#textbox').focus()

$('#textbox').on('keydown', (e) => {
	charsTyped = $('#textbox').val().length
	if (charsTyped == 0) {
		usingPlaceholders = true
		$('#upper, #lower').addClass('placeholder')
		setTimeout(() => {
			$('#upper, #lower').removeClass('placeholder')
			usingPlaceholders = false;
			update();
		}, firstCharToResult)
	}
})

$('#textbox').on('keyup', (e) => {
	// Return if no string change has happened
	if (charsTyped == $('#textbox').val().length) {
		return
	}
	charsTyped = $('#textbox').val().length
	inputHasChanged = true;

	$('#instant-result .title').text($('#textbox').val() + ' - Search on Google')

	if (charsTyped > 0) {
		$('#upper, #lower').removeClass('hidden')
	} else {
		$('#upper, #lower').addClass('hidden')
	}

		// $('#upper').removeClass('hidden').addClass('placeholder')
		// $('#lower').removeClass('hidden').addClass('placeholder')
		// setTimeout(() => {
		// 	$('#upper').removeClass('placeholder')
		// 	setTimeout(() => {
		// 		$('#lower').removeClass('placeholder')
		// 	}, 500)
		// }, 200)
})

function update() {
	if (usingPlaceholders) return

	if (inputHasChanged == true) {
		var numHistoryResults = Math.floor(Math.random()*4)
		var numBackendResults = Math.floor(Math.random()*4)
		for (var i=0; i<3; i++) {
			if (i < numHistoryResults) {
				$('.row.history')[i].classList.remove('hidden')
			} else {
				$('.row.history')[i].classList.add('hidden')
			}
			if (i < numBackendResults) {
				$('.row.backend')[i].classList.remove('hidden')
			} else {
				$('.row.backend')[i].classList.add('hidden')
			}
		}
		$('#upper').css({height: (1+numHistoryResults)*36+'px'})
		$('#lower').css({height: (numBackendResults)*52+'px'})

		// fill upper
		$('.row.history').each((i, item) => {
			if (Math.random() < 0.5) {
				$(item).find('.title>span').text(generateLoremIpsum(Math.ceil(Math.random()*6+2)))
				$(item).find('.description>span').text(generateLoremIpsum(Math.ceil(Math.random()*6+2)))
			}
		})
		// fill lower
		$('.row.backend').each((i, item) => {
			if (Math.random() < 0.5) {
				$(item).find('.title>span').text(generateLoremIpsum(Math.ceil(Math.random()*6+2)))
				$(item).find('.description>span').text(generateLoremIpsum(Math.ceil(Math.random()*6+2)))
			}
		})
	}

	updateInterval = fastUpdateInterval
	if (Math.random() < slowUpdateProbability) updateInterval = slowUpdateInterval
	inputHasChanged = false

	window.setTimeout(update, updateInterval)
}

window.setTimeout(update, updateInterval)