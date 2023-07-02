function saveFormOnUnload(form: HTMLFormElement, fields: string[] = []): void {
  const formData = new FormData(form);
  const data: Record<string, string> = {};
  const fieldToSave = fields || Array.from(formData.keys());
  fieldToSave.forEach(
    (field) => (data[field] = formData.get(field).toString())
  );
  localStorage.setItem('formData', JSON.stringify(data));
}

function restoreFormValues(form: HTMLFormElement): void {
  const data = JSON.parse(localStorage.getItem('formData') || '{}') as Record<
    string,
    string
  >;

  for (const [key, value] of Object.entries(data)) {
    const input = form.querySelector(`[name="${key}"]`) as HTMLInputElement;
    if (input) {
      input.value = value;
    }
  }
}

export const initForm = (
  form: HTMLFormElement,
  fieldToSave: string[] = []
): void => {
  window.addEventListener('beforeunload', () => {
    saveFormOnUnload(form, fieldToSave);
  });

  if (document.readyState === 'complete') {
    restoreFormValues(form);
  } else {
    window.addEventListener(
      'load',
      () => {
        restoreFormValues(form);
      },
      { once: true }
    );
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
};
