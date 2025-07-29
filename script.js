// Constants
const WEEKS_PER_YEAR = 47;

// Utility Functions
const formatGBP = value =>
    '£' + Number(value).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function calculateROI() {
    // Inputs
    const users = parseInt(document.getElementById('numUsers').value, 10) || 0;
    const notesHours = parseFloat(document.getElementById('notesHours').value) || 0;
    const adminHours = parseFloat(document.getElementById('adminHours').value) || 0;
    const hourlyCost = parseFloat(document.getElementById('hourlyCost').value) || 0;

    // Step 1: Total Magic Notes Hours per Year (users × notesHours × 47)
    let totalHoursYear = users * notesHours * WEEKS_PER_YEAR;
    // Enforce minimum of 600 hours for both display and all downstream calculations
    totalHoursYear = Math.max(totalHoursYear, 600);

    // Step 1A: Total Recording Hours Needed (users × (meeting hours + admin hours) × 47)
    const totalRecordingHours = users * (notesHours + adminHours) * WEEKS_PER_YEAR;

    // Step 2: Sliding scale for annual cost
    let rate = 5;
    if (totalHoursYear >= 150000) {
        rate = 1.5;
    } else if (totalHoursYear >= 100000) {
        rate = 1.75;
    } else if (totalHoursYear >= 50000) {
        rate = 2.25;
    } else if (totalHoursYear >= 25000) {
        rate = 3.0;
    } else if (totalHoursYear >= 12000) {
        rate = 4.0;
    } else {
        rate = 5.0;
    }
    const annualCost = totalHoursYear * rate;

    // Step 3: Time saved per user per week (39% of adminHours)
    const timeSavedPerUser = adminHours > 0 ? adminHours * 0.39 : 0;

    // Step 4: Total time saved per year (timeSavedPerUser × users × 47)
    const totalTimeSaved = timeSavedPerUser * users * WEEKS_PER_YEAR;

    // Step 5: Financial value of time saved
    const financialValue = totalTimeSaved * hourlyCost;

    // Step 6: ROI Ratio
    const ratio = annualCost > 0 ? (financialValue / annualCost) : 0;

    // Output to new/updated element IDs
    document.getElementById('totalRecordingHours').textContent = totalRecordingHours.toLocaleString('en-GB');
    document.getElementById('annualCost').textContent = formatGBP(annualCost);
    document.getElementById('timeSavedPerUser').textContent = timeSavedPerUser.toLocaleString('en-GB', { maximumFractionDigits: 2 });
    document.getElementById('totalTimeSaved').textContent = totalTimeSaved.toLocaleString('en-GB', { maximumFractionDigits: 2 });
    document.getElementById('financialValue').textContent = formatGBP(financialValue);

    // ROI Ratio line output
    const roiLineElem = document.getElementById('roiLine');
    roiLineElem.textContent = `For ${users} users, Magic Notes returns £${ratio.toFixed(2)} for every £1 spent.`;

    // Remove all references to deprecated or replaced outputs
    // (No update to #totalHoursYear, no update to #roi, and no classList logic)
}

document.getElementById('calculateBtn').addEventListener('click', calculateROI);

// Optionally, perform calculation on Enter key in any input
const inputFields = document.querySelectorAll('.inputs input');
inputFields.forEach(input => {
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            calculateROI();
        }
    });
});

document.getElementById('calculateBtn').addEventListener('click', calculateROI);

// Optionally, perform calculation on Enter key in any input
const inputFields = document.querySelectorAll('.inputs input');
inputFields.forEach(input => {
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            calculateROI();
        }
    });
});
