import domReady from 'domready'
import $ from 'jquery'
import request from 'superagent'
import Promise from 'promise'

class Template {
    static productEmpty() {
        return `
            <p class="product__empty">No Product Available</p>
        `
    }
    static loader() {
        return `
            <div class="loader">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i>
                <span class="sr-only">Loading...</span>
            </div>
        `
    }
    static productList(name, products) {
        return `
             <p class="product__category">${name}</div>
             <div class="product__lists">
                ${products}
             </div>
            <div class="cleafix"></div>
        `
    }
    static productItem(item) {
        return `
            <div class="product__item">
                <div class="product__item__name">${item.product}</div>
                <div class="product__item__description">Manufactured by ${item.manufacturer}, to be released in ${item.releaseDate}</div>
                <div class="product__item__footer">
                    <a href="#" class="btn btn--primary">
                        <span class="product__item__price">$${item.price}</span>
                    </a>
                </div>
            </div>
        `
    }
}

class Product {
    items() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                request
                    .get('/api/items.json')
                    .end((err, res) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(res.body)
                        }
                    })
            }, 2000)
        })
    }
}

domReady(() => {
    const content = $('[role~="product"]')
    let model = new Product()

    content.html(Template.loader())
    model.items().then(res => {
        let productList = [];
        for (let item of res.items) {
            let categories = Object.keys(item)
            for (var i = 0; i < categories.length; i++) {
                let productItem = [];
                for(let categoryItem of item[categories[i]]) {
                    productItem.push(Template.productItem(categoryItem))
                }
                productList.push(Template.productList(categories[i], productItem.join("")))
            }
        }

        if (productList.length !== 0) {
            content.html(productList.join(""))
        }
        else {
            content.html(Template.productEmpty())
        }

    })
})