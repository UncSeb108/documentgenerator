document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('docForm');
    const preview = document.getElementById('preview');
    const downloadDocxBtn = document.getElementById('downloadDocxBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const resetBtn = document.getElementById('resetBtn');
    const templateOptions = document.querySelectorAll('.template-option');
    const docTypeInput = document.getElementById('docType');

    let generatedContent = "";
    let generatedDoc;

    // Template selection
    templateOptions.forEach(option => {
        option.addEventListener('click', function() {
            templateOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            docTypeInput.value = this.dataset.type;

            // Auto-update preview if already filled
            if (form.name.value.trim() !== "") {
                form.dispatchEvent(new Event("submit"));
            }
        });
    });

    // Generate document
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const school = document.getElementById('school').value.trim();
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const docType = docTypeInput.value;

        if (!name || !school || !startDate || !endDate) {
            alert("Please fill in all fields.");
            return;
        }

        if (docType === "recommendation") {
            generatedContent = `
                <h3>Letter of Recommendation</h3>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p>To Whom It May Concern,</p>
                <p>I am pleased to recommend <strong>${name}</strong> from <strong>${school}</strong> 
                who successfully completed an internship with us from ${startDate} to ${endDate}.</p>
                <p>They demonstrated exceptional performance, professionalism, and dedication.</p>
                <p>Sincerely,<br>Dukatech</p>
            `;
        } else {
            generatedContent = `
                <h3>Internship Acceptance Letter</h3>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p>Dear <strong>${name}</strong>,</p>
                <p>We are pleased to accept you for an internship at Dukatech from ${startDate} to ${endDate}.</p>
                <p>We look forward to your contributions during your time with us.</p>
                <p>Sincerely,<br>Dukatech</p>
            `;
        }

        // Update preview
        preview.innerHTML = generatedContent;

        // Enable download buttons
        downloadDocxBtn.disabled = false;
        downloadPdfBtn.disabled = false;

        // Build DOCX document (text only, stripping HTML)
        const doc = new docx.Document({
            sections: [{
                properties: {},
                children: [
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: generatedContent.replace(/<[^>]+>/g, ''), // strip HTML tags
                                font: "Times New Roman",
                                size: 24
                            })
                        ]
                    })
                ]
            }]
        });

        generatedDoc = doc;
    });

   
    // Download PDF
    downloadPdfBtn.addEventListener('click', function() {
        if (!generatedContent) return;
        const opt = {
            margin:       10,
            filename:     'document.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(preview).save();
    });

    // Reset form
    resetBtn.addEventListener('click', function() {
        form.reset();
        preview.innerHTML = `<p>Fill out the form and click "Generate Document" to see a preview here.</p>`;
        downloadDocxBtn.disabled = true;
        downloadPdfBtn.disabled = true;
        generatedContent = "";
        generatedDoc = null;
    });

    // Keep end date >= start date
    form.startDate.addEventListener('change', function() {
        form.endDate.min = this.value;
        if (form.endDate.value && form.endDate.value < this.value) {
            form.endDate.value = "";
        }
    });
});
