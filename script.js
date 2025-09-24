document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('docForm');
    const preview = document.getElementById('preview');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const templateOptions = document.querySelectorAll('.template-option');
    const docTypeInput = document.getElementById('docType');

    let generatedContent = "";

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

    // Format date with ordinal indicator (1st, 2nd, 3rd, 4th, etc.)
    function formatDateWithOrdinal(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const year = date.getFullYear();
        
        // Add ordinal indicator
        let ordinal = 'th';
        if (day % 10 === 1 && day !== 11) ordinal = 'st';
        else if (day % 10 === 2 && day !== 12) ordinal = 'nd';
        else if (day % 10 === 3 && day !== 13) ordinal = 'rd';
        
        return `${day}${ordinal} ${month}, ${year}`;
    }

    // Format date with day name (Monday, 26th May 2025)
    function formatDateWithDay(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const year = date.getFullYear();
        
        // Add ordinal indicator
        let ordinal = 'th';
        if (day % 10 === 1 && day !== 11) ordinal = 'st';
        else if (day % 10 === 2 && day !== 12) ordinal = 'nd';
        else if (day % 10 === 3 && day !== 13) ordinal = 'rd';
        
        return `${dayName}, ${day}${ordinal} ${month} ${year}`;
    }

    // Calculate duration in months between two dates
    function calculateDuration(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        return months;
    }

    // Generate document
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const fname = document.getElementById('firstName').value.trim();
        const sname = document.getElementById('secondName').value.trim();
        const lname = document.getElementById('lastName').value.trim();
        const name = `${fname} ${sname} ${lname}`.trim();
        const fullName = name.toUpperCase();
        const department = document.getElementById('department').value;
        const strengths = document.getElementById('strengths').value.trim();
        
        const school = document.getElementById('school').value.trim();
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const docType = docTypeInput.value;

        if (!name || !school || !startDate || !endDate) {
            alert("Please fill in all fields.");
            return;
        }

        const formattedStartDate = formatDateWithOrdinal(startDate);
        const formattedStartDateWithDay = formatDateWithDay(startDate);
        const formattedEndDate = formatDateWithOrdinal(endDate);
        const duration = calculateDuration(startDate, endDate);
        const currentDate = formatDateWithOrdinal(new Date().toISOString().split('T')[0]);

        if (docType === "recommendation") {
            generatedContent = `
                <p><strong>Date:</strong> ${currentDate}</p>
        <p>To Whom It May Concern,</p>

        <p>
            I am pleased to recommend <strong>${fullName}</strong>, who successfully
            completed an internship with Dukatech Solution Limited from
            <strong>${startDate}</strong> to <strong>${endDate}</strong>.
            During this period, he/she demonstrated exceptional commitment,
            adaptability, and eagerness to learn.
        </p>

        <p>
            ${fname} was actively involved in <strong>${department}</strong>,
            where he/she consistently displayed strong problem-solving skills,
            attention to detail, and teamwork. He/She approached every assignment
            with professionalism and a positive attitude, contributing meaningfully
            to our goals.
        </p>

        <p>
            One of ${fname}'s notable strengths is his/her ability to
            <strong>${strengths}</strong>, which made him/her a valuable
            asset to our team.
        </p>

        <p>
            I am confident that ${fullName} will excel in future academic
            and professional endeavors. I wholeheartedly recommend them
            for any role or opportunity that aligns with their skills
            and interests.
        </p>

        <p>
            Please feel free to contact me at
            <a href="mailto:dukatechsolutions@gmail.com">dukatechsolutions@gmail.com</a>
            for any further information.
        </p>

        <div class="signature">
            <p>Sincerely,</p>
            <p><strong>Kelvin Mulama</strong><br>
            Founder and CEO<br>
            Dukatech Solution Limited</p>
        </div>
            `;
        } else if (docType === "acceptance") {
            generatedContent = `
                <div style="font-family: 'Times New Roman', serif; line-height: 1.5;">
                    <div style="text-align: center; font-weight: bold; margin-bottom: 30px;">
                        DUKATECH SOLUTIONS LIMITED,<br>
                        CHANDARIA BUSINESS AND INCUBATION CENTRE,<br>
                        P.O BOX 43844 – 00100,<br>
                        NAIROBI-KENYA<br>
                        dukatechsolutions@gmail.com
                    </div>
                    
                    <div style="text-align: right; margin-bottom: 20px;">
                        ${currentDate}
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <strong>SUBJECT: INTERNSHIP ACCEPTANCE</strong>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        Dear <strong>${name.toUpperCase()}</strong>,
                    </div>
                    
                    <div style="text-align: justify; margin-bottom: 15px;">
                        We are pleased to confirm your acceptance as an intern at Dukatech Solutions, effective ${formattedStartDate.toLowerCase()} for a period of ${duration} months.
                    </div>
                    
                    <div style="text-align: justify; margin-bottom: 15px;">
                        You will be attached to the Revolutionize Engineering Department and the focus areas will
                        be Fintech, Web and Mobile App Development, API integration, Database management, UI/UX
                        implementation, Cybersecurity basics, Beauty, Wellness, Personal Care and will have the
                        opportunity to gain practical experience in line with your academic program.
                    </div>
                    
                    <div style="text-align: justify; margin-bottom: 15px;">
                        You will be expected to strictly adhere to the company's rules, regulations, and code of conduct
                        throughout your internship.
                    </div>
                    
                    <div style="text-align: justify; margin-bottom: 15px;">
                        We look forward to working with you and supporting your professional growth.
                    </div>
                    
                    <div style="margin-top: 40px;">
                        Yours sincerely,<br><br>
                        
                        <strong>Sebastian Avonde,</strong><br>
                        <strong>CTO,</strong><br>
                        <strong>Dukatech Solutions Limited.</strong>
                    </div>
                </div>
            `;
        } else if (docType === "contract") {
            generatedContent = `
                <div style="font-family: 'Times New Roman', serif; line-height: 1.5;">
                    <div style="text-align: center; font-weight: bold; margin-bottom: 20px;">
                        DUKATECH SOLUTIONS LIMITED<br>
                        INTERNSHIP/ATTACHMENT WORKING CONTRACT
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong>Department:</strong> Revolutionize Engineering Department ${department}<br>
                        <strong>Focus Areas:</strong> Fintech | Beauty | Wellness | Personal Care<br>
                        <strong>Reporting Date:</strong> ${formattedStartDateWithDay}
                    </div>
                    
                    <div style="text-align: justify; margin-bottom: 15px;">
                        <strong>THIS AGREEMENT</strong> is entered into between Dukatech Solutions Limited, a duly registered company, and the undersigned individual (hereinafter referred to as "the Intern/Attachee").
                    </div>
                    
                    <div style="text-align: justify; margin-bottom: 15px;">
                        The Intern/Attachee agrees to the following terms and conditions:
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong>1. Nature of Engagement</strong><br>
                        The Intern/Attachee is hereby admitted into the Talent Development Program under the Revolutionize Engineering Department. The role is designed to provide practical exposure to tech innovation across Dukatech's focus sectors.
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong>2. Duration</strong><br>
                        The internship/attachment shall run for a period of ${duration} months, commencing ${formattedStartDateWithDay}. The period may be extended upon formal request and approval for up to six (6) months in total.
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong>3. Remuneration</strong><br>
                        This position is strictly non-remunerated. The Intern/Attachee shall not be entitled to any salary, allowance, stipend, or financial compensation during the entire duration of the program.
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong>4. Professional Conduct & Dress Code</strong><br>
                        The Intern/Attachee is expected to maintain the highest standards of professionalism, discipline, and confidentiality. The required dress code is official/business attire at all times while on duty or on company premises. Failure to comply with conduct or dress expectations may result in immediate termination of this agreement.
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong>5. No Employment Obligation</strong><br>
                        Completion of this internship/attachment does not constitute a promise or guarantee of employment at Dukatech Solutions Limited.
                    </div>
                    
                    <div style="page-break-before: always; margin-top: 40px;">
                        <div style="margin-bottom: 15px;">
                            <strong>6. Acknowledgement</strong>
                        </div>
                        
                        <div style="text-align: justify; margin-bottom: 30px;">
                            By signing below, the Intern/Attachee acknowledges and accepts the terms outlined in this agreement and agrees to adhere to all applicable policies and expectations set by Dukatech Solutions Limited.
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <strong>Full Name:</strong> ${name}<br>
                            <strong>ID Number:</strong> ${this.id}<br>
                            <strong>Institution (if applicable):</strong> ${school}<br>
                            <strong>Signature:</strong> ________________<br>
                            <strong>Date:</strong> ${currentDate}
                        </div>
                    </div>
                </div>
            `;
        }

        // Update preview
        preview.innerHTML = generatedContent;

        // Enable download PDF button
        downloadPdfBtn.disabled = false;
    });

    // Download PDF
    downloadPdfBtn.addEventListener('click', function() {
        if (!generatedContent) return;
        
        // Create a temporary element with the content for PDF generation
        const tempElement = document.createElement('div');
        tempElement.innerHTML = generatedContent;
        
        const opt = {
            margin: 10,
            filename: `dukatech_${docTypeInput.value}_${document.getElementById('name').value.trim().replace(/\s+/g, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        // Use html2pdf to generate and download the PDF
        html2pdf().set(opt).from(tempElement).save();
    });

    // Reset form
/*    resetBtn.addEventListener('click', function() {
        form.reset();
        preview.innerHTML = `<p>Fill out the form and click "Generate Document" to see a preview here.</p>`;
        downloadPdfBtn.disabled = true;
        generatedContent = "";
    });
*/
    // Keep end date >= start date
    form.startDate.addEventListener('change', function() {
        form.endDate.min = this.value;
        if (form.endDate.value && form.endDate.value < this.value) {
            form.endDate.value = "";
        }
    });
});