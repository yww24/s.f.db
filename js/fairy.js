$(document).ready(()=>{
	$.ajaxSetup({
		error:function(x,e){
			if(x.status==0){
			alert('You are offline!!n Please Check Your Network.');
			}else if(x.status==404){
			alert('Requested URL not found.');
			}else if(x.status==500){
			alert('Internel Server Error.');
			}else if(e=='parsererror'){
			alert('Error.nParsing JSON Request failed.');
			}else if(e=='timeout'){
			alert('Request Time out.');
			}else {
			alert('Unknow Error.n'+x.responseText);
			}
		}
	});
	$.ajax('../json/fairy.json',{
		contentType:'application/json',
		dataType:'json',
		success:result=>{
			var itemcon = '<div class="w3-hover-shadow fairy item-content">',
			allCharacters = $.map(result,(fairy,index)=>{
				var character = $('<div class="item" data-sort="'+fairy.time+'" data-type="'+fairy.type+'" data-event="'+fairy.event+'"></div>'),
				fairycon = '<p class="name pofa er2">'+fairy.name+'</p><i class="tools '+fairy.type+'_Fairy_info_cage incage"></i><i class="tools '+fairy.type+'_Fairy_Tag ftype"></i><i class="tools info_cage_up cover"></i><i class="skill	'+fairy.skill+'"></i><i class="fairy_i	'+fairy.skill+'_i	icon3"></i><div class="tag">'+fairy.tag+'/'+fairy.time+'</div>';
				$(character).append(itemcon).find(".item-content").html(fairycon);
				return character;
			});
			$('.grid').append(allCharacters);
		},
		timeout:3000
	});
}).ajaxStop(()=>{loadComplete()});
function sortnum(){grid.sort('num')};
function sortsort(){grid.sort('time')};
function sorttype(){grid.sort('type')};
$("select").change(()=>{
	$("select:focus option:selected").each(function(){
		var query=$(this).text();
		switch (query){
		case "도감번호":
			new Muuri('.grid',{sordData:null});
		break;
		case "제조시간":
			sortsort();
		break;
		case "종류":
			sorttype();
		break;
		};
	});
});
function loadComplete(){
	$('.grid').removeClass('w3-hide');
	grid = new Muuri('.grid',{
		sortData:{
			time:(item,element)=>element.getAttribute('data-sort'),
			type:(item,element)=>element.getAttribute('data-type').toUpperCase(),
			num:(item,element)=>element.getAttribute('data-no')
		},
		layout:{fillGaps:true,rounding:true}
	});
	$('input#search').quicksearch('.grid .item',{
		noResults:"#noResultMessage",
		'bind':'keyup keydown click input',
		'hide':()=>{
			$(this).removeClass('muuri-item-shown').addClass('muuri-item-hidden').css("display","none")
			grid.filter('.muuri-item-shown')
		},
		'show':()=>{
			$(this).addClass('muuri-item-shown').removeClass('muuri-item-hidden').css("display","block")
			grid.filter('.muuri-item-shown')
		}
	});
	function active(){$('.fc').removeClass('active')};
	$(".fc").click(function(){
		var query = $(this).text();
		switch (query){
		case "전투":
			grid.filter('[data-type="Battle"]')
			active()
			$(this).addClass('active')
		break;
		case "전략":
			grid.filter('[data-type="Strategy"]')
			active()
			$(this).addClass('active')
		break;
		case "이벤트":
			grid.filter('[data-event="1"]')
			active()
			$(this).addClass('active')
		break;
		case "All":
			grid.filter('[data-type]')
			active()
			$(this).addClass('active')
		break; 
		}
	});
}