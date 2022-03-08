const catalogList = document.querySelector('.catalog-list');
const loadMore = document.querySelector('.catalog__more');
const prodModal = document.querySelector('[data-graph-target="prod-modal"]')
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
                      <button class="btn-reset product__btn" data-graph-path="prod-modal" data.id="${item.id}" aria-label="Показать информация о товаре">
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


      const modal = new GraphModal({
        isOpen: (modal) => {
          const openBtnId = modal.previousActiveElement.dataset.id;
          loadModalData(openBtnId);
        },
      });

    })
  };

  loadProducts(prodQuantity);

  const loadModalData = (id) => {
    fetch('../data/data.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        prodModal.innerHTML = "";

        for (let dataItem of data) {
          if (dataItem.id === id) {
            console.log(dataItem)
          }
        }
      });
  };

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

