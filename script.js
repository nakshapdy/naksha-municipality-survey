// --------------------------------------------------
// DIGITAL BLOCK NUMBERS
// --------------------------------------------------

const blockDropdown = document.getElementById("digitalBlock");

for (let i = 1; i <= 74; i++) {

    const option = document.createElement("option");

    option.value = i;
    option.textContent = i;

    blockDropdown.appendChild(option);
}


// --------------------------------------------------
// FLOOR COUNTER
// --------------------------------------------------

let floorCount = 0;


// --------------------------------------------------
// ADD FLOOR
// --------------------------------------------------

function addFloor() {

    floorCount++;

    let floorName;

    if (floorCount === 1) {

        floorName = "Ground Floor";

    } else {

        floorName = getFloorName(floorCount);

    }


    const floorHTML = `

        <div class="floor-card mb-3" id="floor-${floorCount}">

            <div class="floor-title">

                <strong>${floorName}</strong>

            </div>


            <label class="form-label">
                Roof Type
            </label>

            <select class="form-select mb-3">

                <option value="">
                    Select Roof Type
                </option>

                <option>RCC</option>
                <option>ACC</option>
                <option>Madras Terrace</option>
                <option>Steel Structure</option>

            </select>


            <label class="form-label">
                Usage
            </label>

            <select class="form-select mb-3">

                <option value="">
                    Select Usage
                </option>

                <option>Residential (O)</option>
                <option>Residential (T)</option>
                <option>Commercial (O)</option>
                <option>Commercial (T)</option>
                <option>Others</option>

            </select>


            <label class="form-label">
                Extent (Sqft)
            </label>

            <input
                type="number"
                class="form-control">

        </div>

    `;


    document
        .getElementById("floorContainer")
        .insertAdjacentHTML("beforeend", floorHTML);

}


// --------------------------------------------------
// FLOOR NAME
// --------------------------------------------------

function getFloorName(number) {

    const names = [

        "",
        "Ground Floor",
        "First Floor",
        "Second Floor",
        "Third Floor",
        "Fourth Floor",
        "Fifth Floor",
        "Sixth Floor",
        "Seventh Floor",
        "Eighth Floor",
        "Ninth Floor",
        "Tenth Floor"

    ];

    return names[number] || "Floor " + number;
}


// --------------------------------------------------
// HEAD ROOM
// --------------------------------------------------

function showHeadRoom(show) {

    const section =
        document.getElementById("headRoomDetails");

    section.style.display =
        show ? "block" : "none";
}


// --------------------------------------------------
// BASEMENT
// --------------------------------------------------

function showBasement(show) {

    const section =
        document.getElementById("basementDetails");

    section.style.display =
        show ? "block" : "none";
}


// --------------------------------------------------
// SUBMIT
// --------------------------------------------------

function submitSurvey() {

    alert("Survey submission will be connected to Google Sheets later.");

}
