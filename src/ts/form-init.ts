function saveFormOnUnload(form: HTMLFormElement): void {
  const formData = new FormData(form);
  const data: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value as string;
  }

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

export const initForm = (id: string): void => {
  const form = document.getElementById(id) as HTMLFormElement;
  if (!form) return;

  window.addEventListener('beforeunload', () => {
    saveFormOnUnload(form);
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
