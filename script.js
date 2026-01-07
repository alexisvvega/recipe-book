// Wait until the HTML content is fully loaded before running this script
document.addEventListener("DOMContentLoaded", () => {

  // Grab the "Edit Recipe" button using its id
  const editButton = document.getElementById("edit-btn");

  // Boolean flag - keeps track of whether we are in "edit mode"
  let isEditing = false;

  // Add a click event listener to the button
  editButton.addEventListener("click", () => {

    // Select all the elements whose text we want to make editable
    // This includes paragraphs, list items, and headers
    const editableElements = document.querySelectorAll("p, li, h1, h3");

    // If we're NOT in edit mode...
    if (!isEditing) {

      // Loop over each editable element
      editableElements.forEach((el) => {

        // Create a <textarea> element to replace the original HTML tag
        const input = document.createElement("textarea");

        // Fill the textarea with the current text content
        input.value = el.innerText;

        // Save the original tag name (p, h1, li, etc.) in a custom attribute (dataset)
        // So we can recreate it later when saving
        input.dataset.tag = el.tagName.toLowerCase();

        // Optional styling - make the textarea stretch across the page
        input.style.width = "100%";
        input.style.marginBottom = "10px";

        // Replace the original element with the newly created textarea
        el.replaceWith(input);
      });

      // Update the button text to "Save Changes" while editing
      editButton.innerText = "Save Changes";

    } else {
      // If we're in edit mode, this section handles saving the changes

      // Find all the textareas that were created earlier
      const inputs = document.querySelectorAll("textarea");

      // Loop over all the textareas
      inputs.forEach((el) => {

        // Retrieve the original tag name saved in the dataset
        const tagName = el.dataset.tag;

        // Create a new element with that tag (e.g. <p> or <h1>)
        const newEl = document.createElement(tagName);

        // Copy over the text from the textarea
        newEl.innerText = el.value;

        // Replace the textarea back with a proper HTML element, keeping structure and styling
        el.replaceWith(newEl);
      });

      // Update the button text back to "Edit Recipe" after saving
      editButton.innerText = "Edit Recipe";
    }

    // Flip the value of isEditing (true becomes false, false becomes true)
    isEditing = !isEditing;
  });

});
