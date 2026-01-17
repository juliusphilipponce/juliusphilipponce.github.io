// Calculate years of experience dynamically from start date
(function () {
    // Start date: September 2015
    const startDate = new Date(2015, 8, 1); // Month is 0-indexed, so 8 = September
    const currentDate = new Date();

    // Calculate the difference in years
    let years = currentDate.getFullYear() - startDate.getFullYear();
    const monthDiff = currentDate.getMonth() - startDate.getMonth();

    // Adjust if we haven't reached the anniversary month yet this year
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < startDate.getDate())) {
        years--;
    }

    // Update the years experience element
    const yearsElement = document.getElementById('years-experience');
    if (yearsElement) {
        yearsElement.textContent = years + '+';
    }
})();
