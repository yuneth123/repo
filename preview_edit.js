function previewForm() {
    // Validate form
    const form = document.getElementById('form');
    if (!form.checkValidity()) {
        alert('Please fill out all required fields.');
        return;
    }

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const firstTime = document.querySelector('input[name="first_time"]:checked')?.value;
    const informative = document.querySelector('input[name="informative"]:checked')?.value;
    const improvements = document.getElementById('improvements').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
    const recommend = document.querySelector('input[name="recommend"]:checked')?.value;
    const updates = document.getElementById('updates').value;
    const additionalRequests = document.getElementById('additional-requests').value;

    // Set preview values
    document.getElementById('preview-name').textContent = name;
    document.getElementById('preview-email').textContent = email;
    document.getElementById('preview-first-time').textContent = firstTime;
    document.getElementById('preview-informative').textContent = informative;
    document.getElementById('preview-improvements').textContent = improvements;
    document.getElementById('preview-rating').textContent = rating;
    document.getElementById('preview-recommend').textContent = recommend;
    document.getElementById('preview-updates').textContent = updates;
    document.getElementById('preview-additional-requests').textContent = additionalRequests;

    // Show preview and hide form
    document.getElementById('feedback-form').classList.remove('active');
    document.getElementById('preview-section').classList.add('active');
}

function editForm() {
    // Show form and hide preview
    document.getElementById('feedback-form').classList.add('active');
    document.getElementById('preview-section').classList.remove('active');
}


function submitForm() {
    // Add your form submission logic here
    document.getElementById('preview-section').classList.remove('active');
    document.getElementById('success-section').classList.add('active');
}
