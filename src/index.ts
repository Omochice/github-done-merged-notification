function getNotificationItems(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>(".notifications-list-item"),
  ).filter((e) => e.querySelector("svg.octicon-git-merge") != null);
}

function fillCheckBox(e: Element): void {
  const checkBox = e.querySelector<HTMLInputElement>(
    "input[type=checkbox].js-notification-bulk-action-check-item",
  );
  if (checkBox == null) {
    return;
  }
  if (checkBox.type !== "checkbox") {
    return;
  }
  checkBox.checked = true;
}

function main(): void {
  const selectedActions = document.querySelector<HTMLElement>(
    ".js-notifications-mark-selected-actions",
  );
  const parent = selectedActions?.parentElement;
  if (selectedActions == null || parent == null) {
    return;
  }
  const button = document.createElement("button");
  // NOTE: Why github use bootstrap partially?
  // It seems like better to use gap...
  button.classList.add("btn", "btn-sm", "m-md-2");
  button.textContent = "Select all merged";
  parent.insertBefore(button, selectedActions);
  button.addEventListener("click", () => {
    getNotificationItems().forEach(fillCheckBox);
    selectedActions.hidden = false;
  });
}

main();
