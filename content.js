(function () {
  function getFormData() {
    const form = document.querySelector("form");
    const data = {};
    for (const element of form.elements) {
      if (
        element.tagName !== "BUTTON"
        &&
        !element.name.startsWith("menu") &&
        !element.name.startsWith("rh_") &&
        !element.name.startsWith("simple_") &&
        !element.name.startsWith("field_meta_tags") &&
        !element.name.startsWith("path") &&
        !element.name.startsWith("op") &&
        !element.name.startsWith("changed") &&
        !element.name.startsWith("langcode") &&
        !element.name.startsWith("form_") &&
        !element.name.startsWith("exclude_") &&
        !element.name.startsWith("body[0][format]") &&
        !element.name.startsWith("group_tabs") &&
        !element.name.startsWith("layout_") &&
        !element.name.startsWith("revision") &&
        !element.name.startsWith("moderation_state") &&
        !element.name.startsWith("uid") &&
        !element.name.startsWith("sticky")
      ) {
        let value = "";
        if (element.value) {
          value = element.value.replace(/\(.*\)/, "");
        }
        data[element.name] = value;
      }
    }
    return data;
  }

  function fillForm() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (!file) {
        console.error("Error: No file selected.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          const form = document.querySelector("form");
          for (const key in data) {
            const element = form.querySelector(`[name="${key}"]`);
            if (element) {
              element.value = data[key];
            } else {
              console.warn(
                `Warning: Could not find element with name "${key}"`
              );
            }
            // }
          }
        } catch (error) {
          console.error("Error parsing JSON data:", error);
        }
      };
      reader.readAsText(file);
    });

    fileInput.click();
  }

  function fetchData() {
    const formData = getFormData();
    if (!formData) {
      console.error("Error: Form data is empty.");
      return;
    }

    const formDataJson = JSON.stringify(formData);
    const filename = `formData.json`;

    const blob = new Blob([formDataJson], { type: "text/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    console.log("Data stored in JSON file:", formDataJson);

    link.addEventListener("click", () => {
      setTimeout(() => URL.revokeObjectURL(link.href), 100);
    });
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchData") {
      fetchData();
    } else if (message.action === "fillForm") {
      fillForm();
    }
  });
})();
