document.getElementById('submit-btn').addEventListener('click', function() {
    // Validate form data
    const form = document.getElementById('registration-form');
    const formData = new FormData(form);

    if (!formData.get('city') || !formData.get('full-name') || !formData.get('father-name') || !formData.get('email') || 
        !formData.get('cnic') || !formData.get('phone') || !formData.get('dob') || !formData.get('gender') || 
        !formData.get('last-qualification') || !formData.get('address') || !formData.get('image-upload').name) {
        alert('Please fill out all fields.');
        return;
    }

    alert('Form submitted successfully!');
});

document.getElementById('download-id-card-btn').addEventListener('click', function() {
    const form = document.getElementById('registration-form');
    const formData = new FormData(form);

    const {
        city,
        'full-name': fullName,
        'father-name': fatherName,
        email,
        cnic,
        phone,
        dob,
        gender,
        'last-qualification': lastQualification,
        address,
        'image-upload': imageFile
    } = Object.fromEntries(formData.entries());

    if (!city || !fullName || !fatherName || !email || !cnic || !phone || !dob || !gender || !lastQualification || !address || !imageFile.name) {
        alert('Please fill out all fields.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgData = e.target.result;

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFillColor(46, 63, 94);
        doc.rect(10, 10, 190, 120, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.text('Student ID Card', 105, 20, null, null, 'center');

        doc.setFontSize(12);
        doc.text(`Name: ${fullName}`, 20, 40);
        doc.text(`Father's Name: ${fatherName}`, 20, 50);
        doc.text(`Email: ${email}`, 20, 60);
        doc.text(`CNIC: ${cnic}`, 20, 70);
        doc.text(`Phone: ${phone}`, 20, 80);
        doc.text(`Date of Birth: ${dob}`, 20, 90);
        doc.text(`Gender: ${gender}`, 20, 100);
        doc.text(`Qualification: ${lastQualification}`, 20, 110);
        doc.text(`Address: ${address}`, 20, 120);

        doc.addImage(imgData, 'JPEG', 140, 40, 50, 50);

        doc.save('student_id_card.pdf');
    };
    reader.readAsDataURL(imageFile);
});
