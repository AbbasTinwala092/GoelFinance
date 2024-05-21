// calculator.js

// Function to calculate SIP amount
function calculateSIP() {
    const sipAmount = parseFloat(document.getElementById('sipAmount').value);
    const sipDuration = parseFloat(document.getElementById('sipDuration').value);
    const expectedReturn = parseFloat(document.getElementById('expectedReturn').value) / 100; // Convert percentage to decimal
    const monthlyInvestment = sipAmount;
    const monthlyInterestRate = expectedReturn / 12;
    const months = sipDuration * 12;

    // Calculate SIP amount using formula
    const sipAmountTotal = monthlyInvestment * ((Math.pow(1 + monthlyInterestRate, months) - 1) / monthlyInterestRate) * (1 + monthlyInterestRate);

    document.getElementById('sipResult').innerText = `SIP Investment Result: ₹ ${sipAmountTotal.toFixed(2)}`;
}

// Function to calculate lump sum amount
function calculateLumpSum() {
    const lumpSumAmount = parseFloat(document.getElementById('lumpSumAmount').value);
    const investmentPeriod = parseFloat(document.getElementById('investmentPeriod').value);
    const expectedReturnLumpsum = parseFloat(document.getElementById('expectedReturnLumpsum').value) / 100; // Convert percentage to decimal

    // Calculate lump sum amount using formula
    const lumpSumTotal = lumpSumAmount * Math.pow(1 + expectedReturnLumpsum, investmentPeriod);

    document.getElementById('lumpSumResult').innerText = `Lump Sum Investment Result: ₹ ${lumpSumTotal.toFixed(2)}`;
}
