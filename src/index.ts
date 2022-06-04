import { v4 as uuidV4 } from 'uuid';

const list = document.querySelector<HTMLUListElement>(
  '[data-attribute="list"]'
);
const form = document.querySelector<HTMLFormElement>('[data-attribute="form"]');
const input = document.querySelector<HTMLInputElement>(
  '[data-attribute="input"]'
);

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value === '' || input?.value == null) return;

  const task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
});
