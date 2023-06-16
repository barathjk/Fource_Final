function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    if (email == "" || !validEmail) {
        document.getElementById("emailerror").innerText = "Enter a valid E-mail";
    } else if (password == "") {
        document.getElementById("passworderror").innerHTML = "Enter a valid password";
    } else {
        document.getElementById("container").style.display = "none";
        document.body.style.background = "#FFFFFF";
        document.getElementById("loader").style.display = "block";
        setTimeout(function () {
            window.open("cityInfo.html", "_self");
        }, 3000);
    }
}

function validateCityInfo() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const date = document.getElementById("date").value;
    const sharing = document.getElementById("sharing").checked;
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

    jQuery(".error").text("");
    if (name == "") {
        document.getElementById("nameerror").innerText = "Provide a name"
    } else if (email == "" || !validEmail) {
        document.getElementById("emailerror").innerText = "Enter a valid E-mail";
    } else if (phone == "" || phone.length != 10) {
        document.getElementById("phoneerror").innerText = "Enter a valid Phone number";
    } else {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);
        localStorage.setItem("origin", origin);
        localStorage.setItem("destination", destination);
        localStorage.setItem("date", date);
        localStorage.setItem("sharing", sharing);
        window.open("addressInfo.html", "_self");
    }
}

function validateSecondaryInfo() {
    const originAddress = document.getElementById("originaddress").value;
    const destinationAddress = document.getElementById("destaddress").value;
    const originfloor = document.getElementById("originfloor").value;
    const destfloor = document.getElementById("destfloor").value;
    const originlift = document.getElementById("originlift").checked;
    const destlift = document.getElementById("destlift").checked;
    const loadingandunloading = document.getElementById("loadingandunloading").value;
    const configuration = document.getElementById("configuration").value;

    jQuery(".error").text("");
    if (originAddress == "") {
        document.getElementById("originaddresserror").innerText = "Enter address";
    } else if (destinationAddress == "") {
        document.getElementById("destaddresserror").innerText = "Enter address";
    } else if (!originlift && originfloor == "") {
        document.getElementById("originfloorerror").innerText = "Enter floor no";
    } else if (!destlift && destfloor == "") {
        document.getElementById("destfloorerror").innerText = "Enter floor no";
    } else {
        localStorage.setItem("originAddress", originAddress);
        localStorage.setItem("destinationAddress", destinationAddress);
        localStorage.setItem("originfloor", originfloor);
        localStorage.setItem("destfloor", destfloor);
        localStorage.setItem("originlift", originlift);
        localStorage.setItem("destlift", destlift);
        localStorage.setItem("loadingandunloading", loadingandunloading);
        localStorage.setItem("configuration", configuration);
        window.open("furnitureInfo.html", "_self");
    }
}

function validateFinalInfo() {
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

    const sofa = ((document.getElementById("sofa").value) * 100) || 0;
    const tv = ((document.getElementById("tv").value) * 300) || 0;
    const washing = ((document.getElementById("washing").value) * 350) || 0;
    const Chairs = ((document.getElementById("Chairs").value) * 50) || 0;
    const cTable = ((document.getElementById("cTable").value) * 450) || 0;
    const dTable = ((document.getElementById("dTable").value) * 300) || 0;
    const drTable = ((document.getElementById("drTable").value) * 300) || 0;
    const Geysers = ((document.getElementById("Geysers").value) * 200) || 0;
    const frige = ((document.getElementById("frige").value) * 500) || 0;
    const wardrobe = ((document.getElementById("wardrobe").value) * 700) || 0;
    const fish = ((document.getElementById("fish").value) * 200) || 0;
    const Cot = ((document.getElementById("Cot").value) * 250) || 0;
    const Air_Conditioner = ((document.getElementById("Air_Conditioner").value) * 200) || 0;
    const bed = ((document.getElementById("bed").value) * 500) || 0;
    const plant = ((document.getElementById("plant").value) * 50) || 0;
    const Heavy_items = ((document.getElementById("Heavy_items").value) * 500) || 0;
    const total_item_value = sofa + tv + washing + Chairs + cTable + dTable + drTable + Geysers + frige + wardrobe + fish + Cot + Air_Conditioner + bed + plant + Heavy_items
    const dp = distancePrice[localStorage.getItem("origin")][localStorage.getItem("destination")];
    
    let vehicle;
    let transportation_charges;
    if (total_item_value <= 2500) {
        vehicle = "TATA 407"
        transportation_charges = 2000
    }
    else if (total_item_value > 2500 && total_item_value <= 5000) {
        vehicle = "EICHER 17ft"
        transportation_charges = 3000
    } else if (total_item_value > 5000 && total_item_value <= 10000) {
        vehicle = "EICHER 19ft"
        transportation_charges = 5000
    }
    else if (total_item_value > 10000 && total_item_value <= 20000) {
        vehicle = "TATA truck"
        transportation_charges = 7000
    }
    else if (total_item_value > 20000 && total_item_value <= 50000) {
        vehicle = "32ft Container"
        transportation_charges = 8500
    }
    console.log(localStorage.getItem("loadingandunloading"))
    const labour_charges = localStorage.getItem("loadingandunloading") == "yes" ? 0 : 2000
    const save = localStorage.getItem("sharing") == "yes" ? 0 : ((labour_charges + total_item_value + dp + transportation_charges) * 0.2) 
    var source = jQuery("#finalInvoice").html();
    var template = Handlebars.compile(source);
    config = {
        name: localStorage.getItem("name"),
        date: currentDate,
        originAddress: localStorage.getItem("originAddress"),
        vehicle: vehicle,
        transportation_charges: transportation_charges,
        destinationAddress: localStorage.getItem("destinationAddress"),
        total_amount: total_item_value,
        distancePrice: dp,
        labour_charges: labour_charges,
        shifting_date: localStorage.getItem("date"),
        savings : save,
        subtotal: labour_charges + total_item_value + dp + transportation_charges,
        grandtotal: labour_charges + total_item_value + dp + transportation_charges - save
    }
    localStorage.setItem("template", template(config));
    window.open("final.html", "_target");
}

function footervalidation() {
    window.open("about.html");
}

