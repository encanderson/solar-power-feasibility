export const validadeProvider = (data) => {
  const provider = data.provider;
  const address = provider.address;
  const contacts = provider.contacts;
  const company = provider.company;
  const responsable = provider.responsable;
  const categories = provider.categories;

  for (var key in address) {
    if (key !== "complemento") {
      if (address[key] === "") {
        return false;
      }
    }
  }
  for (key in contacts) {
    if (contacts[key] === "") {
      return false;
    }
  }
  for (key in company) {
    if (key !== "description") {
      if (company[key] === "") {
        return false;
      }
    }
  }
  for (key in responsable) {
    if (responsable[key] === "") {
      return false;
    }
  }
  if (categories.length < 1) {
    return false;
  }
  return true;
};
