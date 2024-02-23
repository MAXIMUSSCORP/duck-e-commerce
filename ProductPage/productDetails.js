let id;
function getQueryParam() {
    id = new URL(window.location.href).search.substring(1);
    console.log(id);
}

function dynamicContentDetails(ob)
{
    let mainContainer = document.createElement('div')
    mainContainer.id = 'containerD'
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div')
    imageSectionDiv.id = 'imageSection'

    let imgTag = document.createElement('img')
    imgTag.id = 'imgDetails'
    imgTag.src = ob.preview

    imageSectionDiv.appendChild(imgTag)

    let productDetailsDiv = document.createElement('div')
    productDetailsDiv.id = 'productDetails'


    let h1 = document.createElement('h1')
    let h1Text = document.createTextNode(ob.productName)
    h1.appendChild(h1Text)


    let detailsDiv = document.createElement('div')
    detailsDiv.id = 'details'

    let h3DetailsDiv = document.createElement('h3')
    let h3DetailsText = document.createTextNode('USD ' + ob.price)
    h3DetailsDiv.appendChild(h3DetailsText)

    let h3 = document.createElement('h3')
    let h3Text = document.createTextNode('Description')
    h3.appendChild(h3Text)

    let para = document.createElement('p')
    let paraText = document.createTextNode(ob.description)
    para.appendChild(paraText)

    let productPreviewDiv = document.createElement('div')
    productPreviewDiv.id = 'productPreview'

    let h3ProductPreviewDiv = document.createElement('h3')
    let h3ProductPreviewText = document.createTextNode('Product Preview')
    h3ProductPreviewDiv.appendChild(h3ProductPreviewText)
    productPreviewDiv.appendChild(h3ProductPreviewDiv)

    let i;
    for(i=0; i<ob.productImages.length; i++)
    {
        let imgTagProductPreviewDiv = document.createElement('img')
        imgTagProductPreviewDiv.id = 'previewImg'
        imgTagProductPreviewDiv.src = ob.productImages[i]
        imgTagProductPreviewDiv.onclick = function(event)
        {
            console.log("clicked" + this.src)
            imgTag.src = ob.productImages[i]
            document.getElementById("imgDetails").src = this.src

        }
        productPreviewDiv.appendChild(imgTagProductPreviewDiv)
    }

    let buttonDiv = document.createElement('div')
    buttonDiv.id = 'button'

    let buttonTag = document.createElement('button')
    buttonDiv.appendChild(buttonTag)

    buttonText = document.createTextNode('Add to Cart')
    buttonTag.onclick  =   function()
    {
        let order = id+" "
        let counter = 1
        if(document.cookie.indexOf(',counter=')>=0)
        {
            order = id + " " + document.cookie.split(',')[0].split('=')[1]
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1
        }
        document.cookie = "orderId=" + order + ",counter=" + counter
        console.log(document.cookie)
    }
    buttonTag.appendChild(buttonText)


    console.log(mainContainer.appendChild(imageSectionDiv));
    mainContainer.appendChild(imageSectionDiv)
    mainContainer.appendChild(productDetailsDiv)
    productDetailsDiv.appendChild(h1)
    productDetailsDiv.appendChild(detailsDiv)
    detailsDiv.appendChild(h3DetailsDiv)
    detailsDiv.appendChild(h3)
    detailsDiv.appendChild(para)
    productDetailsDiv.appendChild(productPreviewDiv)


    productDetailsDiv.appendChild(buttonDiv)


    return mainContainer
}

let containerProduct = document.getElementById('containerProduct')

// BACKEND CALLING
let httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function() {
    let contentTitle;
    if (this.readyState === 4) {
        if (this.status === 200) {
            console.log('call successful');
            contentTitle = JSON.parse(this.responseText);

            console.log(contentTitle);
            containerProduct.appendChild(
                dynamicContentDetails(contentTitle)
            );
        } else {
            console.log("call failed!");
        }
    }
};

//wait for DOM to load


document.addEventListener('DOMContentLoaded', getQueryParam);
document.addEventListener('DOMContentLoaded', function() {
    httpRequest.open('GET', 'https://65d7915c27d9a3bc1d7b5403.mockapi.io/products/'+id, true);
    httpRequest.send();
});