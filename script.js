document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get("https://crudcrud.com/api/caf60b7a08e74eb8b35c615a8f34a53f/data");
        console.log(response);

        for (let i = 0; i < response.data.length; i++) {
            await showuseronscreen(response.data[i]);
        }

        updateTotalCost(); // Update total cost on page load
    } catch (err) {
        console.log(err);
    }
});

async function savetocloud(event) {
    event.preventDefault();
    const sellno = event.target.sellno.value;
    const product = event.target.product.value;

    const obj = {
        sellno,
        product
    };

    try {
        const response = await axios.post("https://crudcrud.com/api/caf60b7a08e74eb8b35c615a8f34a53f/data", obj);
        await showuseronscreen(response.data);
    } catch (err) {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something is wrong</h4>";
        console.log(err);
    }
}

async function showuseronscreen(obj) {
    const parentElem = document.getElementById('Listofusers');
    const childelem = document.createElement('li');
    childelem.textContent = obj.sellno + ' - ' + obj.product;

    const deletebutton = document.createElement('input');
    deletebutton.type = "button";
    deletebutton.value = 'DeleteProduct';
    deletebutton.onclick = async () => {
        try {
            await axios.delete(`https://crudcrud.com/api/caf60b7a08e74eb8b35c615a8f34a53f/data/${obj._id}`);
            parentElem.removeChild(childelem);
            updateTotalCost(); // Update the total cost after deletion
        } catch (err) {
            console.log(err);
        }
    };

    childelem.appendChild(deletebutton);

    const editbutton = document.createElement('input');
    editbutton.type = "button";
    editbutton.value = 'EditProduct';
    editbutton.onclick = async () => {
        try {
            await axios.delete(`https://crudcrud.com/api/caf60b7a08e74eb8b35c615a8f34a53f/data/${obj._id}`);
            document.getElementById('sellpricetag').value = obj.sellno;
            document.getElementById('productnametag').value = obj.product;

            parentElem.removeChild(childelem);
            updateTotalCost(); // Update the total cost after deletion
        } catch (err) {
            console.log(err);
        }
    };

    childelem.appendChild(editbutton);
    parentElem.appendChild(childelem);

    updateTotalCost(); // Update the total cost after adding a new item
}

function updateTotalCost() {
    const parentElem = document.getElementById('Listofusers');
    const items = parentElem.getElementsByTagName('li');
    let totalCost = 0;

    for (let i = 0; i < items.length; i++) {
        const itemText = items[i].textContent;
        const sellPrice = parseInt(itemText.split('-')[0]);
        totalCost += sellPrice;
    }

    document.getElementById('TotalCost').textContent = `Total Cost: $${totalCost}`;
}