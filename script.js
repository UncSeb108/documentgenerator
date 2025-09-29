document.addEventListener('DOMContentLoaded', function() {
    const preview = document.getElementById('preview');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    let generatedContent = "";

    // Tab switching logic
    const tabBtns = document.querySelectorAll(".tab-btn");
    const forms = document.querySelectorAll(".form-section");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            forms.forEach(f => f.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(btn.dataset.target).classList.add("active");
            
            // Clear preview when switching tabs
            preview.innerHTML = '<p>Fill out a form and click "Generate" to see a preview here.</p>';
            downloadPdfBtn.disabled = true;
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

    // Recommendation Form
    document.getElementById('formRecommendation').addEventListener('submit', function(e) {
        e.preventDefault();

        const fname = document.getElementById('recFirstName').value.trim();
        const sname = document.getElementById('recSecondName').value.trim();
        const lname = document.getElementById('recLastName').value.trim();
        const name = `${fname} ${sname} ${lname}`.trim();
        const fullName = name.toUpperCase();
        const department = document.getElementById('recDepartment').value;
        const strengths = document.getElementById('recStrengths').value.trim();
        const startDate = document.getElementById('recStart').value;
        const endDate = document.getElementById('recEnd').value;

        if (!fname || !sname || !lname || !department || !startDate || !endDate) {
            alert("Please fill in all required fields.");
            return;
        }

        const formattedStartDate = formatDateWithOrdinal(startDate);
        const formattedEndDate = formatDateWithOrdinal(endDate);
        const duration = calculateDuration(startDate, endDate);
        const currentDate = formatDateWithOrdinal(new Date().toISOString().split('T')[0]);

        generatedContent = `
            <div style="font-family: 'Times New Roman', serif; line-height: 1.8;">
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
                    <strong>SUBJECT: LETTER OF RECOMMENDATION</strong>
                </div>
                
                <div style="margin-bottom: 15px;">
                    To Whom It May Concern,
                </div>
                
                <div style="text-align: justify; margin-bottom: 15px;">
                    I am pleased to recommend <strong>${fullName}</strong>, who successfully
                    completed an internship with Dukatech Solutions Limited from
                    <strong>${formattedStartDate}</strong> to <strong>${formattedEndDate}</strong>.
                    During this ${duration}-month period, ${fname} demonstrated exceptional commitment,
                    adaptability, and eagerness to learn.
                </div>
                
                <div style="text-align: justify; margin-bottom: 15px;">
                    ${fname} was actively involved in our <strong>${department}</strong> department,
                    where ${fname} consistently displayed strong problem-solving skills,
                    attention to detail, and teamwork. ${fname} approached every assignment
                    with professionalism and a positive attitude, contributing meaningfully
                    to our goals.
                </div>
                
                ${strengths ? `
                <div style="text-align: justify; margin-bottom: 15px;">
                    One of ${fname}'s notable strengths is ${fname}'s ability in
                    <strong>${strengths}</strong>, which made ${fname} a valuable
                    asset to our team.
                </div>
                ` : ''}
                
                <div style="text-align: justify; margin-bottom: 15px;">
                    I am confident that ${fullName} will excel in future academic
                    and professional endeavors. I wholeheartedly recommend ${fname}
                    for any role or opportunity that aligns with ${fname}'s skills
                    and interests.
                </div>
                
                <div style="text-align: justify; margin-bottom: 15px;">
                    Please feel free to contact us at
                    <a href="mailto:dukatechsolutions@gmail.com">dukatechsolutions@gmail.com</a>
                    for any further information.
                </div>
                
                <div style="margin-top: 40px;">
                    Yours sincerely,<br><br>
                    
                    <strong>Kelvin Mulama</strong><br>
                    <strong>Founder and CEO</strong><br>
                    <strong>Dukatech Solutions Limited</strong>
                </div>
            </div>
        `;

        // Update preview
        preview.innerHTML = generatedContent;
        downloadPdfBtn.disabled = false;
    });

    // Acceptance Form
    document.getElementById('formAcceptance').addEventListener('submit', function(e) {
        e.preventDefault();

        const fname = document.getElementById('accFirstName').value.trim();
        const sname = document.getElementById('accSecondName').value.trim();
        const lname = document.getElementById('accLastName').value.trim();
        const name = `${fname} ${sname} ${lname}`.trim();
        const startDate = document.getElementById('accStart').value;
        const duration = document.getElementById('accDuration').value.trim();

        if (!fname || !sname || !lname || !startDate || !duration) {
            alert("Please fill in all required fields.");
            return;
        }

        const formattedStartDate = formatDateWithOrdinal(startDate);
        const currentDate = formatDateWithOrdinal(new Date().toISOString().split('T')[0]);

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
                    We are pleased to confirm your acceptance as an intern at Dukatech Solutions, effective ${formattedStartDate.toLowerCase()} for a period of ${duration}.
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
                    
                    <strong>Kelvin Mulama,</strong><br>
                    <strong>Founder and CEO,</strong><br>
                    <strong>Dukatech Solutions Limited.</strong>
                </div>
            </div>
        `;

        preview.innerHTML = generatedContent;
        downloadPdfBtn.disabled = false;
    });

    // Contract Form
    document.getElementById('formContract').addEventListener('submit', function(e) {
        e.preventDefault();

        const fname = document.getElementById('conFirstName').value.trim();
        const sname = document.getElementById('conSecondName').value.trim();
        const lname = document.getElementById('conLastName').value.trim();
        const name = `${fname} ${sname} ${lname}`.trim();
        const idNumber = document.getElementById('conID').value.trim();
        const school = document.getElementById('conSchool').value.trim();
        const department = document.getElementById('conDepartment').value;
        const reportingDate = document.getElementById('conReporting').value;
        const duration = document.getElementById('conDuration').value.trim();

        if (!fname || !sname || !lname || !idNumber || !department || !reportingDate || !duration) {
            alert("Please fill in all required fields.");
            return;
        }

        const formattedReportingDate = formatDateWithDay(reportingDate);
        const currentDate = formatDateWithOrdinal(new Date().toISOString().split('T')[0]);

        generatedContent = `
            <div style="font-family: 'Times New Roman', serif; line-height: 1.5;">
                <div style="text-align: center; font-weight: bold; margin-bottom: 20px;">
                    DUKATECH SOLUTIONS LIMITED<br>
                    INTERNSHIP/ATTACHMENT WORKING CONTRACT
                </div>
                
                <div style="margin-bottom: 15px;">
                    <strong>Department:</strong> ${department} (Talent Development Program)<br>
                    <strong>Focus Areas:</strong> Fintech | Beauty | Wellness | Personal Care<br>
                    <strong>Reporting Date:</strong> ${formattedReportingDate}
                </div>
                
                <div style="text-align: justify; margin-bottom: 15px;">
                    <strong>THIS AGREEMENT</strong> is entered into between Dukatech Solutions Limited, a duly registered company, and the undersigned individual (hereinafter referred to as "the Intern/Attachee").
                </div>
                
                <div style="text-align: justify; margin-bottom: 15px;">
                    The Intern/Attachee agrees to the following terms and conditions:
                </div>
                
                <div style="margin-bottom: 15px;">
                    <strong>1. Nature of Engagement</strong><br>
                    The Intern/Attachee is hereby admitted into the Talent Development Program under the ${department} Department. The role is designed to provide practical exposure to tech innovation across Dukatech's focus sectors.
                </div>
                
                <div style="margin-bottom: 15px;">
                    <strong>2. Duration</strong><br>
                    The internship/attachment shall run for a period of ${duration}, commencing ${formattedReportingDate}. The period may be extended upon formal request and approval for up to six (6) months in total.
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
                        <strong>ID Number:</strong> ${idNumber}<br>
                        ${school ? `<strong>Institution (if applicable):</strong> ${school}<br>` : ''}
                        <strong>Signature:</strong> ________________<br>
                        <strong>Date:</strong> ${currentDate}
                    </div>
                </div>
            </div>
        `;

        preview.innerHTML = generatedContent;
        downloadPdfBtn.disabled = false;
    });

    // Download PDF
    downloadPdfBtn.addEventListener('click', function() {
        if (!generatedContent) return;
        
        const tempElement = document.createElement('div');
        tempElement.innerHTML = generatedContent;
        
        const opt = {
            margin: 10,
            filename: `dukatech_document_${new Date().getTime()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        // Use html2pdf to generate and download the PDF
        html2pdf().set(opt).from(tempElement).save();
    });

    // Date validation for recommendation form
    document.getElementById('recStart').addEventListener('change', function() {
        const endDate = document.getElementById('recEnd');
        endDate.min = this.value;
        if (endDate.value && endDate.value < this.value) {
            endDate.value = "";
        }
    });
});
