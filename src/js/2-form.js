const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';
const storageItems = JSON.parse(localStorage.getItem(localStorageKey));

if (storageItems) {
  formData.email = storageItems.email ?? '';
  formData.message = storageItems.message ?? '';
}

Object.entries(formData).forEach(([key, val]) => {
  if (form.elements[key]) form.elements[key].value = val;
});

form.addEventListener('input', feedbackInputHandler);
form.addEventListener('submit', feedbackSubmitHandler);

function feedbackInputHandler(e) {
  const { name, value } = e.target;
  if (formData[name] !== value.trim()) {
    formData[name] = value.trim();
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  }
}

function feedbackSubmitHandler(e) {
  e.preventDefault();
  const { email, message } = e.target.elements;
  if (!email.value.trim() || !message.value.trim()) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);
  localStorage.removeItem(localStorageKey);
  form.reset();
  formData.email = '';
  formData.message = '';
}
