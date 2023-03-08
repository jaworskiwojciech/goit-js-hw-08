import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('input'),
};
// const formData = {};

function fillTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (
    refs.form &&
    refs.textarea &&
    refs.input &&
    typeof savedMessage === 'object'
  ) {
    refs.textarea.value = savedMessage['message'] || '';
    refs.input.value = savedMessage['email'] || '';
  }
}

function saveData() {
  const stringifiedData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringifiedData);
}

function onTextareaInput(event) {
  formData[event.target.name] = event.target.value;
  throttle(saveData, 500)();
}

function submit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

if (refs.form && refs.textarea) {
  refs.form.addEventListener('input', onTextareaInput);
}

if (refs.form) {
  refs.form.addEventListener('submit', submit);
}

fillTextarea();

const formData = {
  message: refs.textarea.value,
  email: refs.input.value,
};
