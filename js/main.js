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

    // Home product carousel
    $(".home-product-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: false,
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
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
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


    // Magnifying / Panning Zoom Effect (similar to ultrafab.com)
    function initMagnifier() {
        const magnifierTargets = document.querySelectorAll('.magnifier-target');
        
        magnifierTargets.forEach(target => {
            // Wrap image in container if not already wrapped
            if (!target.parentElement.classList.contains('magnifier-container')) {
                const container = document.createElement('div');
                container.className = 'magnifier-container';
                
                // Transfer margin classes from image to container so spacing is preserved
                const classesToRemove = [];
                target.classList.forEach(cls => {
                    if (/^(m[tbyxse]?-\d+|m-auto)$/.test(cls)) {
                        container.classList.add(cls);
                        classesToRemove.push(cls);
                    }
                });
                classesToRemove.forEach(cls => target.classList.remove(cls));

                // Transfer width styles to container if present
                if (target.style.maxWidth) {
                    container.style.maxWidth = target.style.maxWidth;
                }
                if (target.style.width) {
                    container.style.width = target.style.width;
                }

                target.parentNode.insertBefore(container, target);
                container.appendChild(target);
            }

            const container = target.parentElement;
            
            // Apply inline container styles
            container.style.overflow = 'hidden';
            container.style.position = 'relative';
            container.style.cursor = 'zoom-in';
            
            // Image styling
            target.style.transition = 'transform 0.1s ease-out';
            target.style.transformOrigin = 'center center';

            // Hover tracking
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const xPercent = (x / rect.width) * 100;
                const yPercent = (y / rect.height) * 100;

                target.style.transform = 'scale(2.2)';
                target.style.transformOrigin = `${xPercent}% ${yPercent}%`;
            });

            // Reset image on mouse leave
            container.style.transition = 'none';
            container.addEventListener('mouseleave', () => {
                target.style.transform = 'scale(1)';
                target.style.transformOrigin = 'center center';
            });
        });
    }

    // Initialize magnifier after window load to ensure images are loaded
    $(window).on('load', function() {
        initMagnifier();
    });

})(jQuery);

