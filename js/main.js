(() => {
    const mobileWidth = 680;
    // Function for making navigation bar chaning opacity depending on zoom level
    const addMenuBackground = () => {
        const pageWidth = window.innerWidth;
        const bodyOffset = document.body.scrollTop || document.documentElement.scrollTop;
        const navigation = document.querySelector("header nav");

        if (pageWidth > mobileWidth) {
            bodyOffset > 0 ? navigation.classList.add("test-nav-fixed") : navigation.classList.remove("test-nav-fixed");
        }
    }

    const reorderResponsiveMenu = () => {
        const pageWidth = window.innerWidth;
        const navContainer = document.querySelector("header nav .test-container");
        const navigation = document.querySelector("header nav .test-navigation");
        const mobileNavigation = document.querySelector("body > .test-navigation");

        if (pageWidth <= mobileWidth && navigation) {
            document.body.insertAdjacentElement("afterbegin", navigation);
        } else if (pageWidth > mobileWidth && mobileNavigation) {
            navContainer.insertAdjacentElement("beforeend", mobileNavigation);
        }
    }

    const mobileMenuToggle = () => {
        const toggleButton = document.querySelector(".test-nav-toggle");
        toggleButton.addEventListener("click", () => {
            const mobileNavigation = document.querySelector("body > .test-navigation");

            mobileNavigation.classList.toggle("test-navigation-opened");
        });
    }

    const onNavItemClick = () => {
        const navItemList = document.querySelectorAll(".test-section-link");
        const navItems = [...navItemList];

        navItems.forEach(item => {
            item.addEventListener('click', event => {
                event.preventDefault();

                const sectionId = event.target.getAttribute('href') || event.target.dataset.href;
                scrollToSection(sectionId);
            });
        });

    }


    const scrollToSection = sectionId => {
        let sectionPosition, sectionOffset;
        const navigationHeight = document.querySelector("header nav").offsetHeight;
        const pageWidth = window.innerWidth;



        if (sectionId !== "#") {
            sectionOffset = document.querySelector(sectionId).offsetTop;
            sectionPosition = pageWidth > mobileWidth ? sectionOffset - navigationHeight : sectionOffset;
        } else {
            sectionPosition = 0;
        }
        window.scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': sectionPosition
        })
    };

    const onTestimonialChange = () => {
            let firstChild, lastChild;

            const prevArrow = document.querySelector("#test-testimonials-prev");
            const nextArrow = document.querySelector("#test-testimonials-next");
            const testimonials = document.querySelector(".test-testimonials ul");

            document.addEventListener('click', () => {
                if (event.target === prevArrow) {
                    lastChild = testimonials.lastElementChild;
                    testimonials.insertAdjacentElement("afterbegin", lastChild);
                } else if (event.target === nextArrow) {
                    firstChild = testimonials.firstElementChild;
                    testimonials.insertAdjacentElement("beforeend", firstChild);

                }
            });
        }
        // Function for opening image window
    const onGalleryImageClick = () => {
        const galleryImageList = document.querySelectorAll("#test-gallery li");
        const galleryImages = [...galleryImageList];

        galleryImages.forEach(image => {
            image.addEventListener('click', event => {
                galleryImageOpen(event.target);
            });
        });
    }

    const galleryImageOpen = image => {
        const imageSrc = image.getAttribute("src");
        const openedImage =
            `<div class='test-backdrop'> <img src='${imageSrc}' alt='' /> 
    <span class="test-backdrop-close">X</span></div>`

        document.body.insertAdjacentHTML("beforeend", openedImage);
        galleryImageClose();
    }

    const galleryImageClose = () => {
        const closeButton = document.querySelector(".test-backdrop-close");
        closeButton.addEventListener('click', () => {
            const backdrop = document.querySelector(".test-backdrop");
            backdrop.remove();
        });
    }

    window.addEventListener("scroll", () => addMenuBackground());
    window.addEventListener("resize", () => reorderResponsiveMenu());
    onNavItemClick();
    onTestimonialChange();
    onGalleryImageClick();
    reorderResponsiveMenu();
    mobileMenuToggle();
})();