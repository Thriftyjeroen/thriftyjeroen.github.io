

// ISOTOPE FILTER

jQuery(document).ready(function($){

	if ( $('.iso-box-wrapper').length > 0 ) { 

	    var $container 	= $('.iso-box-wrapper'), 
	    	$imgs 		= $('.iso-box img');



	    $container.imagesLoaded(function () {

	    	$container.isotope({
				layoutMode: 'fitRows',
				itemSelector: '.iso-box'
	    	});

	    	$imgs.load(function(){
	    		$container.isotope('reLayout');
	    	})

	    });

	    //filter items on button click

	    $('.filter-wrapper li a').click(function(){

	        var $this = $(this), filterValue = $this.attr('data-filter');

			$container.isotope({ 
				filter: filterValue,
				animationOptions: { 
				    duration: 750, 
				    easing: 'linear', 
				    queue: false, 
				}              	 
			});	            

			// don't proceed if already selected 

			if ( $this.hasClass('selected') ) { 
				return false; 
			}

			var filter_wrapper = $this.closest('.filter-wrapper');
			filter_wrapper.find('.selected').removeClass('selected');
			$this.addClass('selected');

	      return false;
	    }); 

	}

});


// MAIN NAVIGATION

 $('.main-navigation').onePageNav({
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        scrollOffset: 75, //Height of Navigation Bar
        filter: ':not(.external)',
        changeHash: true
    }); 

    /* NAVIGATION VISIBLE ON SCROLL */
    mainNav();
    $(window).scroll(function () {
        mainNav();
    });

    function mainNav() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40) $('.sticky-navigation').stop().animate({
            "opacity": '1',
            "top": '0'
        });
        else $('.sticky-navigation').stop().animate({
            "opacity": '0',
            "top": '-75'
        });
    }


// HIDE MOBILE MENU AFTER CLIKING ON A LINK

    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });


// Shows the portfolio text when visible on mobile
document.addEventListener("DOMContentLoaded", function () {
	const portfolioItems = document.querySelectorAll(".portfolio-thumb");
	
	// Function to enable Intersection Observer
	const enableObserver = () => {
		const options = {
		root: null, // Uses the viewport as the boundary
		rootMargin: "0px",
		threshold: 1, // Trigger when % of the item is visible
		};
	
		const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const overlay = entry.target.querySelector(".portfolio-overlay");
			if (entry.isIntersecting) {
			overlay.classList.add("active"); // Show the description
			} else {
			overlay.classList.remove("active"); // Hide the description
			}
		});
		}, options);
	
		portfolioItems.forEach((item) => observer.observe(item));
	};
	
	// Run observer logic only for screens smaller than 768px
	if (window.innerWidth < 768) {
		enableObserver();
	}
	
	// Add a resize listener to reapply logic if the screen size changes
	window.addEventListener("resize", () => {
		if (window.innerWidth < 768) {
		enableObserver();
		} else {
		// Remove any active overlays when screen size increases
		portfolioItems.forEach((item) => {
			const overlay = item.querySelector(".portfolio-overlay");
			overlay.classList.remove("active");
		});
		}
	});
	});
	