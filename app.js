$(document).ready(function() {
    let inventory = [
        { name: 'Surgical Masks', quantity: 100, price: 50 },
        { name: 'Gloves', quantity: 200, price: 20 },
        { name: 'Sanitizers', quantity: 150, price: 30 }
    ];

    function printInventory() {
        $('#inventory').empty();
        inventory.forEach((item, index) => {
            $('#inventory').append(`
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Quantity: ${item.quantity}</p>
                        <p class="card-text">Price: $${item.price}</p>
                    </div>
                </div>
            `);
        });
    }

    $('#addProduct').click(function() {
        let newProduct = { name: 'Face Shields', quantity: 50, price: 40 };
        inventory.push(newProduct);
        printInventory();
    });

    printInventory();
});
