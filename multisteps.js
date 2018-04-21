$(document).ready(function(){
	//jQuery time
	var current_fs, next_fs, previous_fs; //fieldsets
	var left, opacity, scale; //fieldset properties which we will animate
	var animating; //flag to prevent quick multi-click glitches
	var last_step_num = "5";

	var rebusphrasegroup = Math.floor(Math.random()*2); 
	console.log(rebusphrasegroup);
	var rebusphrases = [
	["aa", "bb"],
	["cc", "dd"]
	];

	$(".rebustitle").each(function(index){
		$(this).html(rebusphrases[rebusphrasegroup][index]);
	});

	$("input[name='rebusunderstand']").click(function(){
		switch(this.value){
			case "sel1":
				$("#rebusunderstandfeedback").html("Incorrect answer. This rating is not about how difficult it is fo ryou");
				$("#next[name=next_rebusunderstand]").prop('disabled', true);
				break;
			case "sel2":
				$("#rebusunderstandfeedback").html("Incorrect answer.");
				$("#next[name=next_rebusunderstand]").prop('disabled', true);
				break;
			case "sel3":
				$("#rebusunderstandfeedback").html("Correct answer");
				$("#next[name=next_rebusunderstand]").prop('disabled', false);
				break;
			default:
				console.log("Error. Unknown value of rebus question");
		}
		console.log("selection clicekd! " + this.value);
	});

	$('.puzzlename').bind('keyup', function() {
		if(allFilled()) {
			$('#next[name=next_rebus1]').prop('disabled', false);
			console.log("All fields filled. Button enabled");
		}
		else{
			$('#next[name=next_rebus1]').prop('disabled', true);
			console.log("All fields not filled");
		}
	});

	function allFilled() {
		var filled = true;
		$('.puzzlename').each(function() {
			if($(this).val() == '') {
				console.log($(this));
				filled = false;
			}
		});
		console.log("allFilled returned " + filled);
		return filled;
	}

	$('.puzzlename2').bind('keyup', function() {
		if(allFilled2()) {
			$('#next[name=next_rebus2]').prop('disabled', false);
			console.log("All fields filled. Button enabled");
		}
		else{
			$('#next[name=next_rebus2]').prop('disabled', true);
			console.log("All fields not filled");
		}
	});

	function allFilled2() {
		var filled = true;
		$('.puzzlename2').each(function() {
			if($(this).val() == '') {
				console.log($(this));
				filled = false;
			}
		});
		console.log("allFilled2 returned " + filled);
		return filled;
	}


	$(".next").click(function(){
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		console.log("current_fs: "); console.log(current_fs["0"].elements.fsnum.value);
		var current_fsnum = current_fs["0"].elements.fsnum.value;

		if (current_fsnum != last_step_num){ //not last fieldset
			next_fs = $(this).parent().next();
			console.log("next_fs: "); console.log(next_fs["0"].elements.fsnum.value);
			var next_fsnum    = next_fs["0"].elements.fsnum.value;	
		}

		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		

		if (next_fsnum == "2"){
			init(next_fsnum);
		}
		else if (next_fsnum >= 3 && next_fsnum <= 5){ //TODO Magic Numbers
			submitForm(next_fsnum);
			init(next_fsnum);
		}

		console.log("current_fsnum = " + current_fsnum);

		//show the next fieldset
		next_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
					'transform': 'scale('+scale+')',
					'position': 'absolute'
				});
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});

	$(".previous").click(function(){
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();
		
		//de-activate current step on progressbar
		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
		
		//show the previous fieldset
		previous_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale previous_fs from 80% to 100%
				scale = 0.8 + (1 - now) * 0.2;
				//2. take current_fs to the right(50%) - from 0%
				left = ((1-now) * 50)+"%";
				//3. increase opacity of previous_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'left': left});
				previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});

	$(".submit").click(function(){
		return false;
	})
})
