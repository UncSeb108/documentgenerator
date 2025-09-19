document.getElementById('docForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const school = form.school.value.trim();
    const startDate = form.startDate.value;
    const endDate = form.endDate.value;
    const docType = form.docType.value;

    // Map docType to template file
    const templateMap = {
        recommendation: 'templates/recommendation_template.txt',
        acceptance: 'templates/acceptance_template.txt'
    };

    const templatePath = templateMap[docType];
    if (!templatePath) {
        alert('Invalid document type selected.');
        return;
    }

    // Fetch template
    let templateText;
    try {
        const response = await fetch(templatePath);
        templateText = await response.text();
    } catch (err) {
        alert('Could not load template.');
        return;
    }

    // Replace placeholders
    const filled = templateText
        .replace(/{{\s*name\s*}}/gi, name)
        .replace(/{{\s*school\s*}}/gi, school)
        .replace(/{{\s*start_date\s*}}/gi, startDate)
        .replace(/{{\s*end_date\s*}}/gi, endDate);

    // Save file
    const blob = new Blob([filled], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${docType}_letter.txt`);
});