document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  if (!slider) {
      console.error('Slider element not found');
      return;
  }

  const bookData = [
      {
          title: 'Bhupender jogi',
          author: 'Bhupender jogi',
          image: 'd:/images/images/images (3).jpg',
      },
      {
          title: 'Bhupender jogi',
          author: 'Bhupender jogi',
          image: 'd:/images/images/images (4).jpg',
      },
      {
          title: 'Bhupender jogi',
          author: 'Bhupender jogi',
          image: 'd:/images/images/images (4).jpg',
      },
      // Add more books as needed
  ];

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
  });

  function createBookCard(book) {
      const card = document.createElement('div');
      card.classList.add('book__card');
      const image = document.createElement('img');
      image.src = book.image;
      image.alt = book.title;
      const title = document.createElement('h2');
      title.textContent = book.title;
      const author = document.createElement('p');
      author.textContent = `Author: ${book.author}`;
      const price = document.createElement('p');
      price.textContent = 'Price: $10.99'; // You can modify the price dynamically based on book data
      const quantity = document.createElement('p');
      quantity.textContent = 'In Cart: 0';
      quantity.id = `quantity-${book.title.replace(/\s+/g, '-').toLowerCase()}`;
      const addToCartBtn = document.createElement('a');
      addToCartBtn.classList.add('book__btn');
      addToCartBtn.href = '#';
      addToCartBtn.textContent = 'Add to Cart';
      addToCartBtn.onclick = function (event) {
          event.preventDefault();
          addToCart(book.title);
      };

      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(author);
      card.appendChild(price);
      card.appendChild(quantity);
      card.appendChild(addToCartBtn);
      return card;
  }

  function populateBooks() {
      const bookContainer = document.querySelector('.books__grid');
      if (!bookContainer) {
          console.error('Book container element not found');
          return;
      }

      bookData.forEach((book) => {
          const card = createBookCard(book);
          bookContainer.appendChild(card);
      });
  }

  function addToCart(bookTitle) {
      const quantityElement = document.getElementById(`quantity-${bookTitle.replace(/\s+/g, '-').toLowerCase()}`);
      if (quantityElement) {
          const currentQuantity = parseInt(quantityElement.textContent, 10);
          quantityElement.textContent = `In Cart: ${currentQuantity + 1}`;
      }
  }

  populateBooks();
});
