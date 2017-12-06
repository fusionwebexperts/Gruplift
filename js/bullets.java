$(document).ready(function(){
	$('ul li a').on('click', function(){
		$(this).closest('ul').find('a').removeClass('is-active');
		$(this).addClass('is-active');
		return false;
	});
});