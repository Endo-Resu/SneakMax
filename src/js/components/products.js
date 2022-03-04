const catalogList = document.querySelector('.catalog-list');
const loadMore = document.querySelector('.catalog__more');
let prodQuantity = 6;
let dataLength = '';

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

if (catalogList) {
  const loadProducts = (quantity = 6) => {
    fetch('../data/data.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dataLength = data.length;
        catalogList.innerHTML = '';

        for (let i = 0; i < dataLength; i++) {
          if (i < quantity) {
            let item = data[i];
            console.log(item)

            catalogList.innerHTML += `
              <li class="catalog-list__item">
                <article class="product">
                  <div class="product__image">
                    <img src="${item.mainImage}" alt="${item.title}">
                    <div class="product__btns">
                      <button class="btn-reset product__btn" data.id="${item.id}" aria-label="Показать информация о товаре">
                        <svg>
                          <use xlink:href="img/sprite.svg#eye"></use>
                        </svg>
                      </button>
                      <button class="btn-reset product__btn" aria-label="Добавить товар в корзину">
                        <svg>
                          <use xlink:href="img/sprite.svg#cart"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p class="product__title">${item.title}</p>
                  <span class="product__price">${normalPrice(item.price)} р</span>
                </article>
              </li>
            `;
          }
        }
      })
    .then(() => {
      const productTitle = document.querySelectorAll('.product__title');
      productTitle.forEach(el => {
        $clamp(el, {clamp: '22px'});
      });
    })
  };

  loadProducts(prodQuantity);

  loadMore.addEventListener('click', (e) => {
    prodQuantity = prodQuantity + 3;

    loadProducts(prodQuantity);

    if (prodQuantity >= dataLength) {
      loadMore.style.display = 'none';
    } else {
      loadMore.style.display = 'block';
    }
  })
}

