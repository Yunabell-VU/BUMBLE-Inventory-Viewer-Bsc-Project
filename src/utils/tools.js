import { put } from "../utils/request";

export const getNewId = (instances) => {
    let ids = [];

    for (var i = 0; i < instances.length; i++) {
      ids.push(instances[i].id);
    }

    ids.sort();
    
    for (var i = 0; i < ids.length; i++) {
      if (ids[i] != i + 1) {
        return i + 1;
      }
    }
    return ids.length + 1;
  }

export function getLanguage(inventory, model)  {
  const confirmsTo = model.confirmsTo;
  const languageID = confirmsTo.$ref;

  const language = inventory.language.filter(
    (item) => item.$id === languageID
  );

  if (language.length > 0) {
    return language[0];
  }

  return language.push({});
}

export function deleteInstance(inventory, attributeName, reference, instanceID) {
  const newInstances = inventory[attributeName].filter(
    (instance) => instance[reference] !== instanceID
  );

  inventory[attributeName] = newInstances;

  const data = { data: inventory };

  put(`/models/?modeluri=ModelInventory.xmi`, JSON.stringify(data));
}

export function saveInstance(inventory, attributeName, newInstance, isIdRequired) {
  if(isIdRequired) {
    newInstance.id = getNewId(inventory[attributeName])
  }

  inventory[attributeName].push(newInstance)

  const data = { data: inventory };

  put(`/models/?modeluri=ModelInventory.xmi`, JSON.stringify(data));
}