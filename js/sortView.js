let cardData = []; // Define a global variable to store card data

const handleCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();

    const tabCategories = document.getElementById('tab-categories');
    const dataName = data.data;

    // Function to handle category click
    const handleCategoryClick = (categoryId) => {
        // Remove "active-category" class from all category links
        const categoryLinks = document.querySelectorAll('.btn');
        categoryLinks.forEach(link => link.classList.remove('active-category'));

        // Add "active-category" class to the clicked category link
        const activeCategoryLink = document.querySelector(`[data-category-id="${categoryId}"]`);
        activeCategoryLink.classList.add('active-category');

        // Call your handleCategoriesId function here if needed
        handleCategoriesId(categoryId);
    };

    dataName.forEach((category, index) => {
        const div = document.createElement('div');
        div.innerHTML = `<a data-category-id="${category.category_id}" class="btn mx-2 my-2">${category.category}</a>`;

        // Add click event listener to the category link
        div.addEventListener('click', () => {
            handleCategoryClick(category.category_id);
        });

        tabCategories.appendChild(div);

        // Set the first category as active
        if (index === 0) {
            handleCategoryClick(category.category_id);
        }
    });
}



const handleCategoriesId = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();

    cardData = data.data; // Update the global cardData variable

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    if (cardData.length === 0) {
        // Display an image when no cards are available
        const noCardImage = document.createElement('div');
        noCardImage.innerHTML = `
        <div>
        <div class="flex flex-col justify-center items-center">
            <img src="./images/Icon.png" alt="" class="rounded-xl w-80 h-80 mx-auto " />
            <p class="text-5xl font-bold mt-6 mx-auto ">Oops!! Sorry, There is no content here</p>
        </div>
        </div>
        `;
        cardContainer.appendChild(noCardImage);

        // cardContainer.classList.remove('grid', 'grid-cols-1');
        // cardContainer.classList.add('flex', 'flex-col', 'items-center');

        document.getElementById('sorting-btn').disabled = true;
    } else {
        cardData.forEach((card) => {
            document.getElementById('sorting-btn').disabled = false;
            // Rest of your card rendering code

            // console.log(card);

            const totalSeconds = card.others?.posted_date;

            // Calculate hours, minutes, and remaining seconds
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            // const seconds = totalSeconds % 60;

            // Display the result in a formatted string
            const formattedTime = `${hours.toString().padStart(2, '0')} hours ${minutes.toString().padStart(2, '0')} minutes ago`;

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="">
                <div class="card w-82 bg-base-100 shadow-xl">
                    <figure class="relative">
                        <img src="${card?.thumbnail}" alt="" class="rounded-xl h-60" />;
                        <p class="text-right absolute bottom-0 right-0 bg-emerald-400 px-2">${totalSeconds ? formattedTime : ''}</p>
                    </figure>

                    <div class="card-body text-left flex flex-row">
                        <div class="avatar">
                            <div class="w-14 h-14 rounded-full">
                                <img src="${card.authors[0]?.profile_picture}" alt="" class="rounded-xl" />
                            </div>
                        </div>
                
                        <div>
                            <h2 class="card-title">${card?.title}</h2>
                            <div class="flex flex-row">
                                <p>${card.authors[0].profile_name} <span></span>
                                </p>
                                <p>${card.authors[0]?.verified ? '<img class="w-5 h-5" src="./images/verified.png" alt="Verified Icon">' : ''}</p>
                            </div>
                            <p>${card.others?.views} views</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
            cardContainer.appendChild(div);
        });
    }
}

const sortCardsByViews = () => {
    // Make sure cardData is defined
    if (!cardData || cardData.length === 0) {
        return;
    }

    // Clone the card data to avoid modifying the original array
    const sortedData = [...cardData];

    sortedData.sort((a, b) => {
        const viewsA = parseFloat(a.others.views.replace('K', '')) * 1000;
        const viewsB = parseFloat(b.others.views.replace('K', '')) * 1000;
        return viewsB - viewsA; // Sort in descending order
    });

    return sortedData;
}

const displaySortedCards = () => {
    // Sort the card data by views
    const sortedCardData = sortCardsByViews();
    // console.log(sortedCardData);

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    if (sortedCardData.length === 0) {
        // Display a message when no cards are available
        const noCardMessage = document.createElement('div');
        noCardMessage.innerHTML = `
            <div class=" items-center">
                <img src="./images/Icon.png" alt="" class="rounded-xl w-80 h-80" />
                <p class="text-5xl font-bold">Oops!! Sorry, There is no content here</p>
            </div>`;
        cardContainer.appendChild(noCardMessage);

        // cardContainer.classList.remove('grid', 'grid-cols-1');
        // cardContainer.classList.add('flex', 'flex-col', 'items-center');
    } else {
        sortedCardData.forEach((card) => {
            // Rest of your card rendering code

            // console.log(card);

            const totalSeconds = card.others?.posted_date;

            // Calculate hours, minutes, and remaining seconds
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            // const seconds = totalSeconds % 60;

            // Display the result in a formatted string
            const formattedTime = `${hours.toString().padStart(2, '0')} hours ${minutes.toString().padStart(2, '0')} minutes ago`;

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="">
                <div class="card w-82 bg-base-100 shadow-xl">
                    <figure class="relative">
                        <img src="${card?.thumbnail}" alt="" class="rounded-xl h-60" />;
                        <p class="text-right absolute bottom-0 right-0 bg-emerald-400"px-2>${totalSeconds ? formattedTime : ''}</p>
                    </figure>

                    <div class="card-body text-left flex flex-row">
                        <div class="avatar">
                            <div class="w-14 h-14 rounded-full">
                                <img src="${card.authors[0]?.profile_picture}" alt="" class="rounded-xl" />
                            </div>
                        </div>
                
                        <div>
                            <h2 class="card-title">${card?.title}</h2>
                            <div class="flex flex-row">
                                <p>${card.authors[0].profile_name} <span></span>
                                </p>
                                <p>${card.authors[0]?.verified ? '<img class="w-5 h-5" src="./images/verified.png" alt="Verified Icon">' : ''}</p>
                            </div>
                            <p>${card.others?.views} views</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
            cardContainer.appendChild(div);
        });
    }
}

const sortingBtn = document.getElementById('sorting-btn');

sortingBtn.addEventListener('click', () => {
    // Display the sorted card data
    displaySortedCards();
});

handleCategories();
handleCategoriesId("1000");

const showBlog = document.getElementById('show-blog');
showBlog.addEventListener('click', () => {
    // Replace 'your-blog-page.html' with the actual URL of the HTML page you want to open
    window.location.href = './blog.html';
});
