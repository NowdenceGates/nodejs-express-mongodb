var span = $('#index_view_content td span');
span.each(function(index){
	$(this).click(function(){
		span.removeClass('cur');
		span.eq(index).addClass('cur');
		var newscatforcur = $('.cur')[0].innerHTML;
		location.href='/newscat/'+newscatforcur;
	});
});


$('.btn-baidu').click(function(){
	location.href='/';
});
$('.btn-userhome').click(function(){
	location.href='/admin';
});