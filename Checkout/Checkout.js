document.addEventListener('DOMContentLoaded', () => {
    let items = localStorage.getItem('orderId');
    for (let i = 0; i < items.length; i++) {
        let id = items[i];
        let httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    console.log('call successful');
                    let contentTitle = JSON.parse(this.responseText);
                    console.log(contentTitle);
                    let containerProduct = document.getElementById('containerProduct');
                    containerProduct.appendChild(
                        dynamicContentDetails(contentTitle)
                    );
                } else {
                    console.log("call failed!");
                }
            }
        };
        httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + id, true);
        httpRequest.send();
    }


}