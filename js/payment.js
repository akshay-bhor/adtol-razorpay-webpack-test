import "jquery";

var options = {
    "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);

        // Verify payment
        verifyPay(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
    },
    "theme": {
        "color": "#f00"
    }
};

function verifyPay(pid, oid, sig) {
    $.ajax({
        url: 'http://localhost:3000/api/dashboard/payment/verify-payment',
        method: 'post',
        data: JSON.stringify({
            razorpay_payment_id: pid,
            razorpay_order_id: oid,
            razorpay_signature: sig
        }),
        processData: false,
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlciI6ImFkbWluIiwibWFpbCI6ImFkbWluQGFkdG9sLmNvbSIsInN0YXR1cyI6MSwicmFuayI6Mywicm9sZSI6ImFjY2VzcyIsInRpZCI6MTUsImlhdCI6MTYxNzAyNTY5MiwiZXhwIjoxNjI0ODAxNjkyfQ.Pz3EVLK2eyN8XL1qvgk4yQBSiG5ZevagjEVgyP3WJ8o');
        },
        success: function(data) {
            console.log(data);
           
        },
        error: function(err) {
            console.log(err);
        }
    });
}

$(document).ready(function() { console.log('here');
    $.ajax({
        url: 'http://localhost:3000/api/dashboard/payment/create-order',
        method: 'post',
        data: JSON.stringify({
            amt: 10
        }),
        processData: false,
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlciI6ImFkbWluIiwibWFpbCI6ImFkbWluQGFkdG9sLmNvbSIsInN0YXR1cyI6MSwicmFuayI6Mywicm9sZSI6ImFjY2VzcyIsInRpZCI6MTUsImlhdCI6MTYxNzAyNTY5MiwiZXhwIjoxNjI0ODAxNjkyfQ.Pz3EVLK2eyN8XL1qvgk4yQBSiG5ZevagjEVgyP3WJ8o');
        },
        success: function(data) {
            options.key = data.api_key_id;
            options.amount = data.amount;
            options.name = data.name;
            options.order_id = data.order_id;
            options.currency = data.currency;
    
            var rzp1 = new Razorpay(options);

            rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            document.getElementById('rzp-button1').onclick = function(e){
                rzp1.open();
                e.preventDefault();
            }

        },
        error: function(err) {
            console.log(err);
        }
    });
});


