const handleCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();

    const tabCategories = document.getElementById('tab-categories');
    const dataName = data.data;
    dataName.forEach((category) => {
        // console.log(category);
        const div = document.createElement('div');
        div.innerHTML = `<a onclick="handleCategoriesId('${category.category_id}')" class="btn btn-ghost gap-4">${category.category}</a>`;
        tabCategories.appendChild(div);
    });
}

const handleCategoriesId = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();

    const cardContainer = document.getElementById('card-container');
    const cardData = data.data;

    cardContainer.innerHTML = '';

    if (cardData.length === 0) {
        // Display an image when no cards are available
        const noCardImage = document.createElement('div');
        noCardImage.innerHTML = `
        <div class="flex flex-col items-center">
            <img src="./images/Icon.png" alt="" class="rounded-xl w-24 h-24" />
            <p>Oops!! Sorry, There is no content here</p>
        <div/>
        `; // Replace with the path to your image

        cardContainer.appendChild(noCardImage);
    } else {
        cardData.forEach((card) => {
            // console.log(card);

            const totalSeconds = card.others?.posted_date;

            // Calculate hours, minutes, and remaining seconds
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            // Display the result in a formatted string
            const formattedTime = `${hours.toString().padStart(2, '0')} hours ${minutes.toString().padStart(2, '0')} minutes ${seconds.toString().padStart(2, '0')} seconds ago`;

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="">
                <div class="card w-82 bg-base-100 shadow-xl">
                    <figure class="relative">
                        <img src="${card?.thumbnail}" alt="" class="rounded-xl h-32" />;
                        <p class="text-right absolute bottom-0 right-0 bg-red-100 pr-4">${totalSeconds ? formattedTime : ''}</p>
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
                            <p>${card.others?.views}</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
            cardContainer.appendChild(div);
        });
    }
    // console.log(cardData);

}


handleCategories();

handleCategoriesId("1000");


const sortCardsByViews = (cardData) => {
    return cardData.sort((a, b) => {
        const viewsA = parseFloat(a.others.views.replace('K', '')) * 1000;
        const viewsB = parseFloat(b.others.views.replace('K', '')) * 1000;
        return viewsB - viewsA; // Sort in descending order
    });
}

const displaySortedCards = (sortedData) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    if (sortedData.length === 0) {
        // Display a message when no cards are available
        const noCardMessage = document.createElement('div');
        noCardMessage.innerHTML = `
            <div class="flex flex-col items-center">
                <img src="./images/Icon.png" alt="" class="rounded-xl w-24 h-24" />
                <p>Oops!! Sorry, There is no content here</p>
            </div>`;
        cardContainer.appendChild(noCardMessage);
    } else {
        sortedData.forEach((card) => {
            // Rest of your card rendering code
            // ...

            // console.log(card);

            const totalSeconds = card.others?.posted_date;

            // Calculate hours, minutes, and remaining seconds
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            // Display the result in a formatted string
            const formattedTime = `${hours.toString().padStart(2, '0')} hours ${minutes.toString().padStart(2, '0')} minutes ${seconds.toString().padStart(2, '0')} seconds ago`;

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="">
                <div class="card w-82 bg-base-100 shadow-xl">
                    <figure class="relative">
                        <img src="${card?.thumbnail}" alt="" class="rounded-xl h-32" />;
                        <p class="text-right absolute bottom-0 right-0 bg-red-100 pr-4">${totalSeconds ? formattedTime : ''}</p>
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
                            <p>${card.others?.views}</p>
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
    // Sort the card data by views
    const sortedCardData = sortCardsByViews(cardData);

    // Display the sorted card data
    displaySortedCards(sortedCardData);
});
