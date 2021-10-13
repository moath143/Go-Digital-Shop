const axios = require("axios");
const { isArray } = require("lodash");

const flexDir = document.querySelector(".flex-direction");
const produ = document.querySelector(".products");

class Cart {
  #fetchUrl = "https://fakestoreapi.com/products";

  allData() {
    let arrData = [];
    axios.get(this.#fetchUrl).then((res) => {
      arrData = res.data;
      arrData.forEach((e) => {
        flexDir.innerHTML += `
                <div class="products">
            <div class="photo">
                <img
                  src= ${e.image}
                  alt=""
                />
              </div>
              <div class="info">
                <h2 class="name-product">${e.title}</h2>
                <p class="desc">
                  ${e.description}
                </p>
                <div class="shop">
                  <div class="price">${e.price}$</div>
                  <button id=${e.id} name='${e.title}' data-price=${e.price} class='add-to-cart'>add to cart</button>
                </div>
              </div>
            </div>
            </div>
                `;
      });

      let btns = document.querySelectorAll('.add-to-cart')
      let tbody = document.querySelector('.tbody')
      let priceTotal = document.querySelector('.priceTotal')
      let totalArr = []
      let total
      
      btns.forEach((e) => {
        e.addEventListener('click', (element) => {
          
          let priceNumber = element.target.dataset.price
          let id = element.target.id
          element.preventDefault()
          tbody.innerHTML += `
                            <tr data-id=${id}>
                    <td>${element.target.name}</td>
                    <td>${priceNumber}</td>
                    <td class="remove"><button class='anchor'  id=${id} href="#">remove</button></td>
                  </tr>
          `;
          totalArr.push(eval(Math.round(priceNumber)));
          totalArr.reduce((a, b) => {
            return total = a + b
          }, 0)
          
          priceTotal.innerHTML = total
          let removeBtns = document.querySelectorAll(".anchor");
          
          removeBtns.forEach((e) => {
            e.addEventListener('click', (el) => {
              el.preventDefault()
              let rmEle = e.parentElement.parentElement;
              rmEle.remove();
              priceTotal.innerHTML = total;
              
              
            })
          })
        })
      })




    });
  }
}

let obj = new Cart();
obj.allData();

