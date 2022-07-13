$(document).ready(function() {

    $('[data-modal=choose]').on('click', function() {
        $('.overlay, #choose').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #choose, #thanks').fadeOut('slow');
    });

    $(window).on('click', function(e) {
        if (e.target.classList.contains('overlay')) {
            $('.overlay, #choose, #thanks').fadeOut('slow');
        }
    });

    $(window).keyup(function(e) {
        if (e.keyCode === 27) {
            $('.overlay, #choose, #thanks').fadeOut('slow'); 
        }
    });

    // Smooth scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1200) {
          $(".pageup").fadeIn();
        } else {
          $('.pageup').fadeOut();
        }
      });
    
    
      $("a[href^='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"}, 400);
        return false;
      });

    // Valid

    function validateForm(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 3
				},
				phone: "required",
			},
			messages: {
				name: {
					required: "Please enter your name",
					minlength: jQuery.validator.format("Enter {0} symbols")
				},
				phone: "Please enter your phone number",
			}
		});
	}

	validateForm('#choose form');
    validateForm('#contacts form');

    /* maskedinput */

	$("input[name=phone]").mask("+38(099) 999-99-99");

    /* Form */

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('choose').fadeOut();
            $('.overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        });

        return false;
    });
});

