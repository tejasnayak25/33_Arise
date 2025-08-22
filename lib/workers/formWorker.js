import {browserInstance} from "../browserInstance";
import inputWorker from "./inputWorker";

async function getElementList(form, elementType) {
  const inputList = await form.$$eval(elementType, (inputs) =>
    inputs
      .map((input) => ({
        name: input.getAttribute("name"),
        id: input.getAttribute("id"),
        type: input.getAttribute("type"),
      }))
      .filter((input) => input.type !== "submit" && input.type !== "hidden")
  );
  return inputList;
}

function generateSelectorList(elementType, elementList) {
  return elementList
    .map((element) => {
      if (element.id && element.id !== null) {
        return `${elementType}[id=${element.id}]`;
      }
      if (element.name && element.name !== null) {
        return `${elementType}[name=${element.name}]`;
      }
      return "";
    })
    .filter((selector) => selector !== "");
}

async function analyse(url, formElementCount, options) {
  for (let formIndex = 0; formIndex < formElementCount; formIndex += 1) {
    const { page, browser } = await browserInstance.getPage(url, options);

    try {
      const formElements = await page.$$("form");
      const currentForm = formElements[formIndex];

      const inputList = await getElementList(currentForm, "input");
      const inputSelectors = generateSelectorList("input", inputList);

      const textAreaList = await getElementList(currentForm, "textarea");
      const textAreaSelectors = generateSelectorList("textarea", textAreaList);

      const writableSelectors = []
        .concat(inputSelectors)
        .concat(textAreaSelectors);

      if (writableSelectors.length > 0) {
        await inputWorker.test(url, writableSelectors, formIndex, options);
      }
    } finally {
      await browser.close();
    }
  }
}

export const formWorker = {
  analyse,
};
