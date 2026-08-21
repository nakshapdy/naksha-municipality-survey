// ============================================================
// NAKSHA MUNICIPALITY SURVEY
// GOOGLE SHEETS CONNECTION
// ============================================================


// ============================================================
// GOOGLE APPS SCRIPT WEB APP URL
// ============================================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzAWmBUBS464b43uB4zQuPwy3-KpfiX5k3GHAg_GfF4cE1FvFdBp7qvS4I1BuypaJviBA/exec";


// ============================================================
// DIGITAL BLOCK NUMBERS 1–74
// ============================================================

const blockDropdown =
    document.getElementById("digitalBlock");


for (let i = 1; i <= 74; i++) {

    const option =
        document.createElement("option");

    option.value = i;

    option.textContent = i;

    blockDropdown.appendChild(option);

}


// ============================================================
// FLOOR MANAGEMENT
// ============================================================

let floorCount = 0;


// Ground Floor automatically appears

addFloor();


// ============================================================
// ADD FLOOR
// ============================================================

function addFloor() {

    floorCount++;

    const floorName =
        getFloorName(floorCount);


    const floorHTML = `

        <div
            class="floor-card mb-3"
            id="floor-${floorCount}">

            <div class="floor-title mb-3">

                <strong>
                    ${floorName}
                </strong>

            </div>


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


    return names[number]
        || `Floor ${number}`;

}


// ============================================================
// HEAD ROOM
// ============================================================

function showHeadRoom(show) {

    const section =
        document.getElementById(
            "headRoomDetails"
        );


    section.style.display =
        show ? "block" : "none";

}


// ============================================================
// BASEMENT
// ============================================================

function showBasement(show) {

    const section =
        document.getElementById(
            "basementDetails"
        );


    section.style.display =
        show ? "block" : "none";

}


// ============================================================
// COLLECT FLOOR DATA
// ============================================================

function collectFloorData() {

    const floors = [];


    const floorCards =
        document.querySelectorAll(
            ".floor-card"
        );


    floorCards.forEach(
        function(card, index) {

            const roof =
                card.querySelector(
                    ".floor-roof"
                ).value;


            const usage =
                card.querySelector(
                    ".floor-usage"
                ).value;


            const extent =
                card.querySelector(
                    ".floor-extent"
                ).value;


            floors.push({

                floorNumber:
                    index + 1,

                floorName:
                    getFloorName(
                        index + 1
                    ),

                roofType:
                    roof,

                usage:
                    usage,

                extent:
                    extent

            });

        }
    );


    return floors;

}


// ============================================================
// HEAD ROOM DATA
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
        section.querySelectorAll(
            "select"
        );


    const inputs =
        section.querySelectorAll(
            "input"
        );


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
// BASEMENT DATA
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
        section.querySelectorAll(
            "select"
        );


    const inputs =
        section.querySelectorAll(
            "input"
        );


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
// COLLECT ALL BASIC FORM DATA
// ============================================================

function getBasicFormData() {

    const cards =
        document.querySelectorAll(
            ".card"
        );


    // --------------------------------------------------------
    // PROPERTY IDENTIFICATION
    // --------------------------------------------------------

    const propertyCard =
        cards[0];


    const propertySelects =
        propertyCard.querySelectorAll(
            "select"
        );


    const propertyInputs =
        propertyCard.querySelectorAll(
            "input"
        );


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


    // --------------------------------------------------------
    // FLOOR COUNT
    // --------------------------------------------------------

    const numberOfFloors =
        document.getElementById(
            "numberOfFloors"
        ).value;


    // --------------------------------------------------------
    // AREA
    // --------------------------------------------------------

    const areaCard =
        cards[4];


    const areaInputs =
        areaCard.querySelectorAll(
            "input"
        );


    const overallBuiltup =
        areaInputs[0]?.value || "";


    const plinthArea =
        areaInputs[1]?.value || "";


    const parkingArea =
        areaInputs[2]?.value || "";


    const garageArea =
        areaInputs[3]?.value || "";


    // --------------------------------------------------------
    // ASSESSMENT
    // --------------------------------------------------------

    const assessmentCard =
        cards[5];


    const assessmentSelects =
        assessmentCard.querySelectorAll(
            "select"
        );


    const assessmentInputs =
        assessmentCard.querySelectorAll(
            "input"
        );


    const assessed =
        assessmentSelects[0]?.value || "";


    const assessmentNumber =
        assessmentInputs[0]?.value || "";


    const vlt =
        assessmentSelects[1]?.value || "";


    const vltPaid =
        assessmentSelects[2]?.value || "";


    // --------------------------------------------------------
    // ADDRESS
    // --------------------------------------------------------

    const addressCard =
        cards[6];


    const addressInputs =
        addressCard.querySelectorAll(
            "input"
        );


    const addressTextareas =
        addressCard.querySelectorAll(
            "textarea"
        );


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


    // --------------------------------------------------------
    // PHOTO
    // --------------------------------------------------------

    const photoCard =
        cards[7];


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
            photo
                ? photo.name
                : "",

        remarks

    };

}


// ============================================================
// UNIQUE KEY
// ============================================================

function createUniqueKey(data) {

    if (
        !data.digitalBlock ||
        !data.digitalSurveyNumber
    ) {

        return "";

    }


    const block =
        String(
            data.digitalBlock
        ).padStart(
            2,
            "0"
        );


    const survey =
        String(
            data.digitalSurveyNumber
        ).padStart(
            5,
            "0"
        );


    return (
        "DB" +
        block +
        "-DS" +
        survey
    );

}


// ============================================================
// SUBMIT TO GOOGLE APPS SCRIPT
// ============================================================

async function submitSurvey() {

    const data = getBasicFormData();

    // --------------------------------------------------------
    // CREATE UNIQUE KEY
    // --------------------------------------------------------

    const uniqueKey =
        createUniqueKey(data);

    if (!uniqueKey) {

        alert(
            "Please enter Digital Block Number and Digital Survey Number."
        );

        return;
    }

    data.uniqueKey = uniqueKey;


    // --------------------------------------------------------
    // FIND PHOTO
    // --------------------------------------------------------

    const photoInput =
        document.querySelector(
            'input[type="file"]'
        );

    const photo =
        photoInput &&
        photoInput.files &&
        photoInput.files.length > 0
            ? photoInput.files[0]
            : null;


    // --------------------------------------------------------
    // COMPRESS PHOTO
    // --------------------------------------------------------

    if (photo) {

        try {

            data.photoBase64 =
                await compressImage(photo);

            data.photoName =
                photo.name;

            data.photoMimeType =
                "image/jpeg";

        }

        catch (error) {

            console.error(error);

            alert(
                "Unable to process the property photo."
            );

            return;
        }

    }


    // --------------------------------------------------------
    // SUBMIT BUTTON
    // --------------------------------------------------------

    const submitButton =
        document.querySelector(
            'button[onclick="submitSurvey()"]'
        );


    if (submitButton) {

        submitButton.disabled = true;

        submitButton.innerText =
            "Submitting...";

    }


    // --------------------------------------------------------
    // SEND TO GOOGLE APPS SCRIPT
    // --------------------------------------------------------

    try {

        const response =
            await fetch(
                GOOGLE_SCRIPT_URL,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "text/plain;charset=utf-8"

                    },

                    body:
                        JSON.stringify(data)

                }
            );


        const result =
            await response.json();


        // ----------------------------------------------------
        // SUCCESS
        // ----------------------------------------------------

        if (result.success) {

            alert(

                "Survey submitted successfully!\n\n" +

                "Unique Key:\n" +

                uniqueKey

            );

            console.log(
                "Server response:",
                result
            );


            // Reset form

            const form =
                document.querySelector("form");

            if (form) {

                form.reset();

            }

        }


        // ----------------------------------------------------
        // ERROR
        // ----------------------------------------------------

        else {

            alert(

                "Submission failed.\n\n" +

                result.message

            );

        }


    }

    catch (error) {

        console.error(error);

        alert(

            "Unable to submit the survey.\n\n" +

            "Please check your internet connection and try again."

        );

    }


    finally {

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.innerText =
                "Submit Survey";

        }

    }

}
