function formatGBP(value) {
    return '£' + Number(value).toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function calculateROI() {
    // Inputs
    const users = parseInt(document.getElementById('numUsers').value, 10) || 0;
    const notesHours = parseFloat(document.getElementById('notesHours').value) || 0;
    const adminHours = parseFloat(document.getElementById('adminHours').value) || 0;
    const hourlyCost = parseFloat(document.getElementById('hourlyCost').value) || 0;

    // Use 47 weeks to account for leave
    const weeksPerYear = 47;

    // Step 1: Total Magic Notes Hours per Year (users × notesHours × 47)
    let totalHoursYear = users * notesHours * weeksPerYear;

    // Enforce minimum of 600 hours for both display and all downstream calculations
    totalHoursYear = Math.max(totalHoursYear, 600);

    // Step 2: Sliding scale for annual cost
    let rate = 5;
    if (totalHoursYear > 150000) {
        rate = 1.5;
    } else if (totalHoursYear > 100000) {
        rate = 1.5;
    } else if (totalHoursYear > 50000) {
        rate = 1.75;
    } else if (totalHoursYear > 25000) {
        rate = 2.25;
    } else if (totalHoursYear > 12000) {
        rate = 3;
    } else if (totalHoursYear > 6000) {
        rate = 4;
    } else {
        rate = 5;
    }
    const annualCost = totalHoursYear * rate;

    // Step 3: Time saved per user per week
    const timeSavedPerUser = adminHours - notesHours;

    // Step 4: Total time saved per year (timeSavedPerUser × users × 47)
    const totalTimeSaved = timeSavedPerUser * users * weeksPerYear;

    // Step 5: Financial value of time saved
    const financialValue = totalTimeSaved * hourlyCost;

    // Step 6: ROI
    let roi = annualCost > 0 ? ((financialValue - annualCost) / annualCost) * 100 : 0;

    // Output
    document.getElementById('totalHoursYear').textContent = totalHoursYear.toLocaleString('en-GB');
    document.getElementById('annualCost').textContent = formatGBP(annualCost);
    document.getElementById('timeSavedPerUser').textContent = timeSavedPerUser.toLocaleString('en-GB', {maximumFractionDigits: 2});
    document.getElementById('totalTimeSaved').textContent = totalTimeSaved.toLocaleString('en-GB', {maximumFractionDigits: 2});
    document.getElementById('financialValue').textContent = formatGBP(financialValue);

    const roiElem = document.getElementById('roi');
    roiElem.textContent = roi.toLocaleString('en-GB', {maximumFractionDigits: 2}) + "%";
    roiElem.classList.remove('positive-roi', 'negative-roi');
    if (roi >= 0) {
        roiElem.classList.add('positive-roi');
    } else {
        roiElem.classList.add('negative-roi');
    }
}

document.getElementById('calculateBtn').addEventListener('click', calculateROI);

// Optionally, perform calculation on Enter key in any input
const inputFields = document.querySelectorAll('.inputs input');
inputFields.forEach(input => {
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            calculateROI();
        }
    });
});
