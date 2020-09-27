// Check off the todos
$("ul").on("click", "li", function(event){
	let className = event.currentTarget.className;
	let id = event.currentTarget.children[0].id;
	console.log(event);
	$(this).toggleClass("completed");
	$.get(`complete/${id}`, {'isComplete' : className ? false:true})
});


// delete the todos
$("ul").on("click", "span", function(event){
	event.stopPropagation();
	let id = event.currentTarget.id;
	console.log(id);
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	$.get(`delete/${id}`);
});

// adding new todos
$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		// getting the new todo from input
		var todoText = $(this).val();
		$(this).val("");
		
		let CSRFtoken = $('input[name=csrfmiddlewaretoken]').val();

		$.post('add', { 
           text: todoText,
           csrfmiddlewaretoken: CSRFtoken,
       	}).then(function(response){
       		let {id , text } = response;
			
			// creating new li and adding to the ul
       		$("ul").append(`<li>
       			<span id=${id}>
       				<i class='fas fa-trash'></i>
   				</span>
   				${text}
			</li>`);
       	});

	}
});


$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
})

