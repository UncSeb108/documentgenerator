document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('docForm');
    const preview = document.getElementById('preview');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');
    const templateOptions = document.querySelectorAll('.template-option');
    const docTypeInput = document.getElementById('docType');
    
    // Template map to file paths
    const templateMap = {
        recommendation: 'templates/recommendation_template.docx',
        acceptance: 'templates/acceptance_template.docx'
    };
    
    // Template selector functionality
    templateOptions.forEach(option => {
        option.addEventListener('click', function() {
            templateOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            docTypeInput.value = this.dataset.type;
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generatePreview();
    });
    
    // Reset form
    resetBtn.addEventListener('click', function() {
        form.reset();
        preview.innerHTML = '<p>Fill out the form and click "Generate Document" to see a preview here.</p>';
        downloadBtn.disabled = true;
    });
    
    // Download functionality
    downloadBtn.addEventListener('click', function() {
        if (!downloadBtn.disabled) {
            generateDocx();
        }
    });
    
    // Generate preview function
    function generatePreview() {
        const name = form.name.value.trim();
        const school = form.school.value.trim();
        const startDate = formatDate(form.startDate.value);
        const endDate = formatDate(form.endDate.value);
        const docType = docTypeInput.value;
        const currentDate = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Validate form
        if (!name || !school || !form.startDate.value || !form.endDate.value) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // For preview, we'll just show a simple text representation
        // Since we don't have the actual .docx content, we can show a plain text version
        let previewText = `
            ${docType === 'recommendation' ? 'LETTER OF RECOMMENDATION' : 'INTERNSHIP ACCEPTANCE LETTER'}
            
            Date: ${currentDate}
            
            ${docType === 'recommendation' ? 
                `To Whom It May Concern,
                
                This letter serves as a formal recommendation for ${name}, who completed an internship at Dukatech from ${startDate} to ${endDate}.
                
                During ${name}'s internship, they demonstrated exceptional skills in problem-solving, teamwork, and technical proficiency. As a student from ${school}, they brought fresh perspectives and academic knowledge that greatly benefited our projects.
                
                ${name} showed remarkable dedication and consistently exceeded our expectations. They successfully completed all assigned tasks with attention to detail and professionalism.
                
                Based on their performance, I am confident that ${name} will be a valuable asset to any organization. We highly recommend ${name} for any position in their field of study.
                
                Sincerely,
                
                Jane Smith
                Head of Human Resources
                Dukatech Solutions
                contact@dukatech.com
                (555) 123-4567` 
                : 
                `Dear ${name},
                
                We are pleased to inform you that you have been selected for an internship position at Dukatech Solutions. On behalf of our team, I would like to extend our congratulations and formally offer you this opportunity.
                
                Your internship will begin on ${startDate} and conclude on ${endDate}. During this period, you will be working under the supervision of our project managers and will have the opportunity to contribute to real-world projects.
                
                As a student from ${school}, we believe you will bring valuable insights and enthusiasm to our team. This internship will provide you with practical experience in your field of study and help you develop professional skills.
                
                Please confirm your acceptance of this offer by replying to this email within five business days. If you have any questions, feel free to contact our HR department.
                
                We look forward to welcoming you to our team!
                
                John Davis
                Internship Coordinator
                Dukatech Solutions
                internships@dukatech.com
                (555) 987-6543`}
        `;
        
        // Update preview
        preview.innerHTML = `<pre>${previewText}</pre>`;
        
        // Enable download button
        downloadBtn.disabled = false;
    }
    
    // Generate DOCX function using docxtemplater
    function generateDocx() {
        const name = form.name.value.trim();
        const school = form.school.value.trim();
        const startDate = formatDate(form.startDate.value);
        const endDate = formatDate(form.endDate.value);
        const docType = docTypeInput.value;
        const currentDate = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Data to replace in the template
        const data = {
            name: name,
            school: school,
            start_date: startDate,
            end_date: endDate,
            current_date: currentDate
        };
        
        // Get the template path
        const templatePath = templateMap[docType];
        
        // Load the template file
        fetch(templatePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.arrayBuffer();
            })
            .then(arrayBuffer => {
                // Initialize PizZip and load the template
                const zip = new PizZip(arrayBuffer);
                const doc = new docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });
                
                // Set the data and render the document
                doc.setData(data);
                doc.render();
                
                // Generate the document as a blob
                const out = doc.getZip().generate({
                    type: 'blob',
                    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                });
                
                // Save the document
                saveAs(out, `${docType}_letter_${name.replace(/\s+/g, '_')}.docx`);
            })
            .catch(error => {
                console.error('Error generating document:', error);
                alert('Error generating document. Please try again.');
            });
    }
    
    // Format date function
    function formatDate(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    // Set minimum end date based on start date
    form.startDate.addEventListener('change', function() {
        form.endDate.min = this.value;
        
        // If end date is before start date, reset it
        if (form.endDate.value && form.endDate.value < this.value) {
            form.endDate.value = '';
        }
    });
});