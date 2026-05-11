(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-150px');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Product carousel
    $(".product-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        loop: true,
        dots: true,
        nav: false,
    });


    // Magnifying Glass Effect
    function initMagnifier() {
        const magnifierTargets = document.querySelectorAll('.magnifier-target');
        
        magnifierTargets.forEach(target => {
            // Wrap image in container if not already wrapped
            if (!target.parentElement.classList.contains('magnifier-container')) {
                const container = document.createElement('div');
                container.className = 'magnifier-container';
                target.parentNode.insertBefore(container, target);
                container.appendChild(target);
            }

            const container = target.parentElement;
            let lens = container.querySelector('.magnifier-lens');
            
            if (!lens) {
                lens = document.createElement('div');
                lens.className = 'magnifier-lens';
                container.appendChild(lens);
            }

            const zoom = 2; // Zoom level

            function moveMagnifier(e) {
                const rect = target.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                
                let clientX, clientY;
                if (e.touches && e.touches.length > 0) {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                } else {
                    clientX = e.clientX;
                    clientY = e.clientY;
                }

                // 1. Position lens exactly under cursor relative to the container
                const xInContainer = clientX - containerRect.left;
                const yInContainer = clientY - containerRect.top;
                
                lens.style.left = (xInContainer - lens.offsetWidth / 2) + "px";
                lens.style.top = (yInContainer - lens.offsetHeight / 2) + "px";

                // 2. Calculate background position relative to the image
                const xInImg = clientX - rect.left;
                const yInImg = clientY - rect.top;

                const targetWidth = target.offsetWidth;
                const targetHeight = target.offsetHeight;

                lens.style.backgroundImage = `url('${target.src}')`;
                lens.style.backgroundSize = (targetWidth * zoom) + "px " + (targetHeight * zoom) + "px";
                
                const bgX = (xInImg * zoom) - (lens.offsetWidth / 2);
                const bgY = (yInImg * zoom) - (lens.offsetHeight / 2);
                lens.style.backgroundPosition = `-${bgX}px -${bgY}px`;
            }

            target.addEventListener("mousemove", moveMagnifier);
            lens.addEventListener("mousemove", moveMagnifier);
            
            target.addEventListener("mouseenter", (e) => {
                lens.style.display = "block";
                target.classList.add('magnifier-active');
                moveMagnifier(e);
            });
            
            container.addEventListener("mouseleave", () => {
                lens.style.display = "none";
                target.classList.remove('magnifier-active');
            });

            // Touch support
            target.addEventListener("touchstart", (e) => {
                lens.style.display = "block";
                moveMagnifier(e);
            });
            target.addEventListener("touchmove", (e) => {
                if (e.cancelable) e.preventDefault();
                moveMagnifier(e);
            }, { passive: false });
            lens.addEventListener("touchmove", (e) => {
                if (e.cancelable) e.preventDefault();
                moveMagnifier(e);
            }, { passive: false });
        });
    }

    // Initialize magnifier after window load to ensure images are loaded
    $(window).on('load', function() {
        initMagnifier();
    });

})(jQuery);

