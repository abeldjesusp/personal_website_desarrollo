if( 'ontouchstart' in window ){ var click = 'touchstart'; }
else { var click = 'click'; }

$('.burger').on(click, function(){
		if( !$(this).hasClass('open') ){ openMenu(); } 
		else { closeMenu(); }
});	

$('.menu ul li a').on(click, function(e){
	e.preventDefault();
	closeMenu();
});

function openMenu(){
	
	$('.menu-bg').addClass('animate');					

	$('.burger').addClass('open');	
	$('.x, .z').addClass('collapse');
	$('.menu li').addClass('animate');
	
	setTimeout(function(){ 
		$('.y').hide(); 
		$('.x').addClass('rotate30'); 
		$('.z').addClass('rotate150'); 
	}, 70);
	setTimeout(function(){
		$('.x').addClass('rotate45'); 
		$('.z').addClass('rotate135');  
	}, 120);		
}

function closeMenu(){
	$('.menu li').removeClass('animate');
	setTimeout(function(){ 			
		$('.burger').removeClass('open');	
		$('.x').removeClass('rotate45').addClass('rotate30'); 
		$('.z').removeClass('rotate135').addClass('rotate150');				
		$('.menu-bg').removeClass('animate');			
		
		setTimeout(function(){ 			
			$('.x').removeClass('rotate30'); 
			$('.z').removeClass('rotate150'); 			
		}, 50);
		setTimeout(function(){
			$('.y').show(); 
			$('.x, .z').removeClass('collapse');
		}, 70);
	}, 100);
}