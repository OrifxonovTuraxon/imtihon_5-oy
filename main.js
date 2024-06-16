
fetch('https://fakestoreapi.com/products')
.then(response => response.json())
.then(data => {
    const categories = {};

    
    data.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = [];
        }
        categories[product.category].push(product);
    });

    categories['All'] = data;

    const tabsContainer = document.getElementById('best_tabs');
    const tabContentsContainer = document.getElementById('best_tab-contents');

    let firstTab = true;


    Object.keys(categories).forEach(category => {
        const tab = document.createElement('div');
        tab.classList.add('tab', 'best_item');
        if (firstTab) tab.classList.add('active');
        tab.textContent = category.toUpperCase();
        tab.dataset.category = category;
        tabsContainer.appendChild(tab);

        const tabContent = document.createElement('div');
        tabContent.classList.add('tab-content');
        if (firstTab) tabContent.classList.add('active');
        tabContent.id = `content-${category}`;

        const productList = document.createElement('ul');
        productList.classList.add('best_list_bottom');

        categories[category].forEach(product => {
            const listItemBottom = document.createElement('li');
            listItemBottom.classList.add('best_item_bottom');
            let a =Math.floor(Math.random() * 100);
            listItemBottom.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="best_img">
                <h3 class="best_item_title">${product.title}</h3>
                <div class="best_money">$${(product.price * (1-a / 100)).toFixed(2)}</div>
                <div class="best_big_money">$${product.price}</div>
                <div class="best_protsent">${a}% OFF</div>
            `;
            productList.appendChild(listItemBottom);
        });

        tabContent.appendChild(productList);
        tabContentsContainer.appendChild(tabContent);

        firstTab = false;
    });

    tabsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('tab')) {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            event.target.classList.add('active');
            document.getElementById(`content-${event.target.dataset.category}`).classList.add('active');
        }
    });

    
    document.querySelectorAll('.best_item_bottom').forEach(item => {
        item.addEventListener('click', (event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const modal = document.getElementById('myModal');
            const modalContent = modal.querySelector('.modal-content');

            modalContent.style.width = `${rect.width}px`;
            modalContent.style.height = `${rect.height}px`;
            modalContent.style.top = `${rect.top + window.scrollY}px`;
            modalContent.style.left = `${rect.left + window.scrollX}px`;

            modal.style.display = 'flex';
        });
    });

  
    document.querySelectorAll('.fas.fa-shopping-cart').forEach(icon => {
        icon.addEventListener('click', () => {
            document.getElementById('cartModal').style.display = 'flex';
        });
    });

   
    window.onclick = function(event) {
        if (event.target == document.getElementById('myModal')) {
            document.getElementById('myModal').style.display = 'none';
        }
        if (event.target == document.getElementById('cartModal')) {
            document.getElementById('cartModal').style.display = 'none';
        }
    };
})
.catch(error => console.error('Error:', error));