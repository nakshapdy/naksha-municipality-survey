// ============================================================
// NAKSHA MUNICIPALITY SURVEY
// DATA COLLECTION SCRIPT
// ============================================================


// ============================================================
// 1. DIGITAL BLOCK NUMBERS 1–74
// ============================================================

const blockDropdown = document.getElementById("digitalBlock");

for (let i = 1; i <= 74; i++) {

    const option = document.createElement("option");

    option.value = i;
    option.textContent = i;

    blockDropdown.appendChild(option);
}


// ============================================================
// 2. FLOOR MANAGEMENT
// ============================================================

let floorCount = 0;


// Add Ground Floor automatically when page loads
addFloor();


// ============================================================
// ADD FLOOR
// ============================================================

function addFloor() {

    floorCount++;

    let floorName = getFloorName(floorCount);

    const floorHTML = `

        <div class="floor-card mb-3" id="floor-${floorCount}">

            <div class="floor-title">

                <strong>${floorName}</strong>

            </div>


            <!-- ROOF TYPE -->

            <label class="form-label">
                Roof Type
            </label>

            <select
                class="form-select mb-3 floor-roof">

                <option value="">
                    Select Roof Type
                </option>

                <option value="RCC">
                    RCC
                </option>

                <option value="ACC">
                    ACC
                </option>

                <option value="Madras Terrace">
                    Madras Terrace
                </option>

                <option value="Steel Structure">
                    Steel Structure
                </option>

            </select>


            <!-- USAGE -->

            <label class="form-label">
                Usage
            </label>

            <select
                class="form-select mb-3 floor-usage">

                <option value="">
                    Select Usage
                </option>

                <option value="Residential (O)">
                    Residential (O)
                </option>

                <option value="Residential (T)">
                    Residential (T)
                </option>

                <option value="Commercial (O)">
                    Commercial (O)
                </option>

                <option value="Commercial (T)">
                    Commercial (T)
                </option>

                <option value="Others">
                    Others
                </option>

            </select>


            <!-- EXTENT -->

            <label class="form-label">
                Extent (Sqft)
            </label>

            <input
                type="number"
                class="form-control floor-extent"
                placeholder="Enter extent">

        </div>

    `;


    document
        .getElementById("floorContainer")
        .insertAdjacentHTML(
            "beforeend",
            floorHTML
        );

}


// ============================================================
// FLOOR NAMES
// ============================================================

function getFloorName(number) {

    const names = {

        1: "Ground Floor",
        2: "First Floor",
        3: "Second Floor",
        4: "Third Floor",
        5: "Fourth Floor",
        6: "Fifth Floor",
        7: "Sixth Floor",
        8: "Seventh Floor",
        9: "Eighth Floor",
        10: "Ninth Floor",
        11: "Tenth Floor",
        12: "Eleventh Floor",
        13: "Twelfth Floor",
        14: "Thirteenth Floor",
        15: "Fourteenth Floor",
        16: "Fifteenth Floor",
        17: "Sixteenth Floor",
        18: "Seventeenth Floor",
        19: "Eighteenth Floor",
        20: "Nineteenth Floor"

    };

    return names[number] || `Floor ${number}`;

}


// ============================================================
// 3. HEAD ROOM
// ============================================================

function showHeadRoom(show) {

    const section =
        document.getElementById("headRoomDetails");

    section.style.display =
        show ? "block" : "none";

}


// ============================================================
// 4. BASEMENT
// ============================================================

function showBasement(show) {

    const section =
        document.getElementById("basementDetails");

    section.style.display =
        show ? "block" : "none";

}


// ============================================================
// 5. COLLECT FLOOR DATA
// ============================================================

function collectFloorData() {

    const floors = [];

    const floorCards =
        document.querySelectorAll(".floor-card");


    floorCards.forEach(function(card, index) {

        const roof =
            card.querySelector(".floor-roof").value;

        const usage =
            card.querySelector(".floor-usage").value;

        const extent =
            card.querySelector(".floor-extent").value;


        floors.push({

            floorNumber: index + 1,

            floorName:
                getFloorName(index + 1),

            roofType:
                roof,

            usage:
                usage,

            extent:
                extent

        });

    });


    return floors;

}


// ============================================================
// 6. COLLECT HEAD ROOM DATA
// ============================================================

function collectHeadRoomData() {

    const selected =
        document.querySelector(
            'input[name="headRoom"]:checked'
        );


    if (!selected) {

        return {
            available: ""
        };

    }


    if (selected.value === "No") {

        return {
            available: "No"
        };

    }


    const section =
        document.getElementById(
            "headRoomDetails"
        );


    const selects =
        section.querySelectorAll("select");

    const inputs =
        section.querySelectorAll("input");


    return {

        available: "Yes",

        roofType:
            selects[0]?.value || "",

        usage:
            selects[1]?.value || "",

        extent:
            inputs[0]?.value || ""

    };

}


// ============================================================
// 7. COLLECT BASEMENT DATA
// ============================================================

function collectBasementData() {

    const selected =
        document.querySelector(
            'input[name="basement"]:checked'
        );


    if (!selected) {

        return {
            available: ""
        };

    }


    if (selected.value === "No") {

        return {
            available: "No"
        };

    }


    const section =
        document.getElementById(
            "basementDetails"
        );


    const selects =
        section.querySelectorAll("select");

    const inputs =
        section.querySelectorAll("input");


    return {

        available: "Yes",

        roofType:
            selects[0]?.value || "",

        usage:
            selects[1]?.value || "",

        extent:
            inputs[0]?.value || ""

    };

}


// ============================================================
// 8. GET ALL NORMAL FORM DATA
// ============================================================

function getBasicFormData() {

    const cards =
        document.querySelectorAll(".card");


    // Property Identification

    const propertyCard = cards[0];

    const propertySelects =
        propertyCard.querySelectorAll("select");

    const propertyInputs =
        propertyCard.querySelectorAll("input");


    const locality =
        propertySelects[0]?.value || "";

    const digitalBlock =
        propertySelects[1]?.value || "";

    const digitalSurveyNumber =
        propertyInputs[0]?.value || "";


    const propertyType =
        propertySelects[2]?.value || "";

    const occupancy =
        propertySelects[3]?.value || "";

    const buildingName =
        propertyInputs[1]?.value || "";


    // Floor section

    const floorSection =
        cards[1];

    const numberOfFloors =
        floorSection.querySelector(
            "#numberOfFloors"
        )?.value || "";


    // Area details

    const areaCard =
        document.querySelectorAll(".card")[4];

    const areaInputs =
        areaCard.querySelectorAll("input");


    const overallBuiltup =
        areaInputs[0]?.value || "";

    const plinthArea =
        areaInputs[1]?.value || "";

    const parkingArea =
        areaInputs[2]?.value || "";

    const garageArea =
        areaInputs[3]?.value || "";


    // Assessment

    const assessmentCard =
        document.querySelectorAll(".card")[5];

    const assessmentSelects =
        assessmentCard.querySelectorAll("select");

    const assessmentInputs =
        assessmentCard.querySelectorAll("input");


    const assessed =
        assessmentSelects[0]?.value || "";

    const assessmentNumber =
        assessmentInputs[0]?.value || "";

    const vlt =
        assessmentSelects[1]?.value || "";

    const vltPaid =
        assessmentSelects[2]?.value || "";


    // Address

    const addressCard =
        document.querySelectorAll(".card")[6];

    const addressInputs =
        addressCard.querySelectorAll("input");

    const addressTextareas =
        addressCard.querySelectorAll("textarea");

    const address =
        addressTextareas[0]?.value || "";

    const mobile =
        addressInputs[0]?.value || "";

    const commencementYear =
        addressInputs[1]?.value || "";

    const sameCommunicationAddress =
        addressCard.querySelector(
            "select"
        )?.value || "";

    const communicationAddress =
        addressTextareas[1]?.value || "";


    // Photo + remarks

    const photoCard =
        document.querySelectorAll(".card")[7];

    const photo =
        photoCard.querySelector(
            'input[type="file"]'
        )?.files[0] || null;

    const remarks =
        photoCard.querySelector(
            "textarea"
        )?.value || "";


    return {

        locality,

        digitalBlock,

        digitalSurveyNumber,

        propertyType,

        occupancy,

        buildingName,

        numberOfFloors,

        floors:
            collectFloorData(),

        headRoom:
            collectHeadRoomData(),

        basement:
            collectBasementData(),

        overallBuiltup,

        plinthArea,

        parkingArea,

        garageArea,

        assessed,

        assessmentNumber,

        vlt,

        vltPaid,

        address,

        mobile,

        commencementYear,

        sameCommunicationAddress,

        communicationAddress,

        photoName:
            photo ? photo.name : "",

        remarks

    };

}


// ============================================================
// 9. CREATE UNIQUE KEY
// ============================================================

function createUniqueKey(data) {

    if (
        !data.digitalBlock ||
        !data.digitalSurveyNumber
    ) {

        return "";

    }


    const block =
        String(data.digitalBlock)
            .padStart(2, "0");


    const survey =
        String(data.digitalSurveyNumber)
            .padStart(5, "0");


    return `DB${block}-DS${survey}`;

}


// ============================================================
// 10. SUBMIT SURVEY
// ============================================================

function submitSurvey() {

    const data =
        getBasicFormData();


    // Create unique key

    const uniqueKey =
        createUniqueKey(data);


    if (!uniqueKey) {

        alert(
            "Please enter Digital Block Number and Digital Survey Number."
        );

        return;

    }


    // Add unique key

    data.uniqueKey =
        uniqueKey;


    // Show collected data

    console.log(
        "NAKSHA SURVEY DATA:"
    );

    console.log(
        data
    );


    // For now show confirmation

    alert(

        "Survey data collected successfully!\n\n" +

        "Unique Key: " +
        uniqueKey +

        "\n\n" +

        "Data is currently stored only in this browser."

    );


    // Display the data on screen

    console.log(
        JSON.stringify(
            data,
            null,
            2
        )
    );

}
