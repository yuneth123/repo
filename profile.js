document.addEventListener('DOMContentLoaded', () => {
    const steps = [
        ['Step 1: Personal Information', 'What is your name? (e.g., Yuneth Samarasinghe)', 'What is your username? (e.g., yunethxa)', 'What is your email address? (e.g., yuneth@example.com)', 'What is your date of birth? (e.g.2003-01-01)'],
        ['Step 2: Professional Information', 'What is your primary occupation? (e.g., Marine Biologist)', 'Have you participated in conservation events before? (Yes/No)', 'What skills do you possess? (e.g., Diving, Research)', 'What type of role would best suit you in a conservation effort? (e.g., Organizer, Volunteer)'],
        ['Step 3: Interests', 'How did you find out about our website? (e.g., Social Media, Friend)', 'What aspect of marine life interests you the most? (e.g., Coral Reefs)', 'What type of conservation events would you like to join? (e.g., Beach Clean-up, Research)', 'Do you have any additional information you\'d like to share? (e.g., Previous Experience)'],
        ['Step 4: Contact Information', 'What is your phone number? (e.g., +123456789)', 'What is your address? (e.g., 123  Maharagama)', 'What city do you live in? (e.g., Maharagama)', 'What is your country? (e.g., Sri Lanka)']
    ];

    let currentStepIndex = 0;
    let currentPromptIndex = 0;
    let userProfile = {};
    let skippedQuestions = [];

    const totalQuestions = steps.reduce((total, step) => total + step.length - 1, 0);
    let answeredQuestions = 0;

    const promptContainer = document.getElementById('prompt-container');
    const profileOutput = document.getElementById('profile-output');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressBarText = document.getElementById('progress-bar-text');
    const nextButton = document.getElementById('next-button');
    const skipButton = document.getElementById('skip-button');
    const prevButton = document.getElementById('prev-button');
    const resetButton = document.getElementById('reset-button');
    const stepInfo = document.getElementById('step-info');

    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const phonePattern = /^\+?[1-9]\d{1,14}$/;

    const updatePrompt = () => {
        if (currentStepIndex < steps.length) {
            stepInfo.textContent = steps[currentStepIndex][0];
            stepInfo.className = ''; // Clear any existing class
            if (steps[currentStepIndex][0] === 'Step 1: Personal Information') {
                stepInfo.classList.add('personal-info');
            }
            if (currentPromptIndex < steps[currentStepIndex].length - 1) {
                const [question, placeholder] = steps[currentStepIndex][currentPromptIndex + 1].split(' (e.g., ');
                const formattedPlaceholder = placeholder ? ` (e.g., ${placeholder}` : '';
                promptContainer.innerHTML = `
                    <div class="prompt">
                        <label>${question}</label>
                        <input type="text" id="user-input" placeholder="${formattedPlaceholder}" style="width: 100%; padding: 8px; margin-top: 8px; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box;" />
                        <div id="error-message" class="error"></div>
                    </div>
                `;
            }
        }

        // Hide "Skip" button on last step
        if (currentStepIndex === steps.length - 1 && currentPromptIndex === steps[currentStepIndex].length - 2) {
            skipButton.style.display = 'none';
        } else {
            skipButton.style.display = 'inline-block';
        }

        // Show/hide "Next" button appropriately
        if (currentStepIndex === steps.length - 1 && currentPromptIndex === steps[currentStepIndex].length - 1) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = 'inline-block';
        }
    };

    const updateProfileOutput = () => {
        let profileContent = "";
        let currentStepTitle = "";

        Object.entries(userProfile).forEach(([key, value]) => {
            const stepIndex = steps.findIndex(step => step.includes(key));
            if (steps[stepIndex][0] !== currentStepTitle) {
                if (currentStepTitle) profileContent += '<hr>';
                currentStepTitle = steps[stepIndex][0];
                profileContent += `<h3>${currentStepTitle}</h3>`;
            }
            profileContent += `<p><strong>${key}:</strong> ${value}</p>`;
        });

        profileOutput.innerHTML = profileContent;
    };

    const updateProgressBar = () => {
        const progressPercentage = (answeredQuestions / totalQuestions) * 100;
        progressBarFill.style.width = `${progressPercentage}%`;
        progressBarText.textContent = `${Math.round(progressPercentage)}%`;
    };

    const displayProfileOutput = () => {
        profileOutput.style.display = 'block';
        updateProfileOutput();
    };

    const validateInput = (promptText, userInput) => {
        if (promptText.includes('name') && !namePattern.test(userInput)) {
            return 'Name can only contain letters and spaces.';
        }
        if (promptText.includes('email') && !emailPattern.test(userInput)) {
            return 'Invalid email address.';
        }
        if (promptText.includes('date of birth') && !datePattern.test(userInput)) {
            return 'Date of birth must be in the format YYYY-MM-DD.';
        }
        if (promptText.includes('phone number') && !phonePattern.test(userInput)) {
            return 'Invalid phone number.';
        }
        return '';
    };

    nextButton.addEventListener('click', () => {
        const userInputElement = document.getElementById('user-input');
        const userInput = userInputElement.value.trim();
        const errorMessage = document.getElementById('error-message');

        const validationError = validateInput(steps[currentStepIndex][currentPromptIndex + 1], userInput);
        if (validationError) {
            errorMessage.textContent = validationError;
            return;
        }

        if (!userInput) {
            errorMessage.textContent = 'Please enter an answer before proceeding.';
            return;
        }

        errorMessage.textContent = '';

        const currentPrompt = steps[currentStepIndex][currentPromptIndex + 1];
        userProfile[currentPrompt] = userInput;

        answeredQuestions++;
        updateProgressBar();

        currentPromptIndex++;
        if (currentPromptIndex === steps[currentStepIndex].length - 1) {
            currentStepIndex++;
            currentPromptIndex = 0;
        }

        if (currentStepIndex === steps.length) {
            if (answeredQuestions < totalQuestions) {
                alert('Please answer all questions before proceeding.');
                currentStepIndex--;
                currentPromptIndex = steps[currentStepIndex].length - 2;
            } else {
                displayProfileOutput();
            }
        } else {
            updatePrompt();
        }
    });

    skipButton.addEventListener('click', () => {
        const currentPrompt = steps[currentStepIndex][currentPromptIndex + 1];
        skippedQuestions.push(currentPrompt);

        currentPromptIndex++;
        if (currentPromptIndex === steps[currentStepIndex].length - 1) {
            currentStepIndex++;
            currentPromptIndex = 0;
        }

        if (currentStepIndex === steps.length) {
            if (answeredQuestions < totalQuestions) {
                alert('Please answer all questions before proceeding.');
                currentStepIndex--;
                currentPromptIndex = steps[currentStepIndex].length - 2;
            } else {
                displayProfileOutput();
            }
        } else {
            updatePrompt();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentPromptIndex > 0) {
            currentPromptIndex--;
        } else if (currentStepIndex > 0) {
            currentStepIndex--;
            currentPromptIndex = steps[currentStepIndex].length - 2;
        }

        if (userProfile[steps[currentStepIndex][currentPromptIndex + 1]]) {
            answeredQuestions--;
        }
        
        updateProgressBar();
        updatePrompt();
    });

    resetButton.addEventListener('click', () => {
        userProfile = {};
        skippedQuestions = [];
        currentStepIndex = 0;
        currentPromptIndex = 0;
        answeredQuestions = 0;
        updateProgressBar();
        updatePrompt();
        profileOutput.style.display = 'none';
    });

    updatePrompt();
});